<?php

namespace App\Http\Controllers;

use App\Models\Incident;
use App\Models\IncidentResponse; // Import IncidentResponse model
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;
use Inertia\Inertia;

class IncidentController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('permission:incidents index', only: ['index']),
            new Middleware('permission:incidents show', only: ['show']),
            new Middleware('permission:incidents delete', only: ['destroy']),
        ];
    }

    /**
     * Admin: Daftar insiden
     */
    public function index(Request $request)
    {
        $incidents = Incident::with('responses.responder')
            ->when($request->search, fn($q) =>
                $q->where('title', 'like', "%{$request->search}%")
                  ->orWhere('ticket_number', 'like', "%{$request->search}%")
            )
            ->latest()
            ->paginate(10);

        return Inertia::render('Incidents/Index', [
            'incidents' => $incidents,
            'filters' => $request->only('search'),
        ]);
    }

    /**
     * Admin: Detail insiden
     */
    public function show(Incident $incident)
    {
        $incident->load('responses.responder');

        // Define all possible statuses in the desired order
        $statuses = ['received', 'in_progress', 'completed', 'closed'];

        return Inertia::render('Incidents/Show', [
            'incident' => $incident,
            'statuses' => $statuses, // Pass statuses to the frontend for dropdown
        ]);
    }

    /**
     * 🌐 Public: Show incident report form, generate captcha.
     */
    public function create()
    {
        $a = rand(1, 10);
        $b = rand(1, 10);
        session(['captcha_result' => $a + $b]);

        return Inertia::render('Public/Incidents/Create', [
            'captcha' => ['a' => $a, 'b' => $b],
        ]);
    }

    /**
     * 🌐 Public: Submit new incident with captcha validation.
     *
     * This method now automatically creates the initial "Aduan diterima" response.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'reporter_name'   => 'nullable|string|max:255',
            'reporter_email'  => 'nullable|email|max:255',
            'reporter_phone'  => 'nullable|string|max:20',
            'title'           => 'required|string|max:255',
            'description'     => 'required|string',
            'attachment'      => 'nullable|file|mimes:pdf,jpg,jpeg,png,doc,docx|max:4096',
            'captcha_answer'  => 'required|numeric',
        ]);

        // Validate captcha from session
        if ((int) $validated['captcha_answer'] !== session('captcha_result')) {
            return back()->withErrors(['captcha_answer' => 'Jawaban captcha salah.'])->withInput();
        }

        // Hapus captcha dari session agar tidak bisa reuse
        session()->forget(['captcha_a', 'captcha_b', 'captcha_result']);

        // Simpan file jika ada
        $attachmentPath = null;
        if ($request->hasFile('attachment')) {
            $attachmentPath = $request->file('attachment')->store('incident_attachments', 'public');
        }

        // Create the incident with 'received' status as the initial state
        $incident = Incident::create([
            'ticket_number'   => strtoupper(Str::random(10)),
            'reporter_name'   => $validated['reporter_name'] ?? null,
            'reporter_email'  => $validated['reporter_email'] ?? null,
            'reporter_phone'  => $validated['reporter_phone'] ?? null,
            'title'           => $validated['title'],
            'description'     => $validated['description'],
            'attachment'      => $attachmentPath,
            'status'          => 'received',
        ]);

        // Automatically create the initial incident response
        IncidentResponse::create([
            'incident_id'        => $incident->id,
            'responder_id'       => null,
            'response'           => 'Aduan diterima dan akan diproses oleh petugas.',
            'status_at_response' => 'received',
        ]);

        return to_route('incidents.track', ['ticket' => $incident->ticket_number])
            ->with('success', 'Laporan berhasil dikirim. Simpan nomor tiket Anda.');
    }

    /**
     * Public: Lacak status insiden berdasarkan nomor tiket
     */
    public function track($ticket)
    {
        $incident = Incident::where('ticket_number', $ticket)
            ->with('responses.responder')
            ->firstOrFail();

        return Inertia::render('Public/Incidents/TrackResult', [
            'incident' => [
                'id'             => $incident->id,
                'title'          => $incident->title,
                'description'    => $incident->description,
                'ticket_number'  => $incident->ticket_number,
                'reporter_name'  => $incident->reporter_name,
                'reporter_email' => $incident->reporter_email,
                'reporter_phone' => $incident->reporter_phone,
                'status'         => $incident->status,
                'created_at'     => $incident->created_at,
                'attachment'     => $incident->attachment,
                'responses'      => $incident->responses
                    ->map(fn($r) => [
                        'id'                 => $r->id,
                        'response'           => $r->response,
                        'responder_name'     => $r->responder->name ?? 'Sistem',
                        'created_at'         => $r->created_at,
                        'status_at_response' => $r->status_at_response,
                    ])
                    ->sortBy('created_at')
                    ->values(),
            ]
        ]);
    }

    /**
     * Admin: Hapus insiden
     */
    public function destroy(Incident $incident)
    {
        if ($incident->attachment && Storage::disk('public')->exists($incident->attachment)) {
            Storage::disk('public')->delete($incident->attachment);
        }

        $incident->responses()->delete();
        $incident->delete();

        return back()->with('success', 'Insiden berhasil dihapus.');
    }
}
