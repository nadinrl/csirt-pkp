<?php

namespace App\Http\Controllers;

use App\Models\Incident;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;

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

    public function index(Request $request)
    {
        $incidents = Incident::with('responses.responder')
            ->when($request->search, fn($q) =>
                $q->where('title', 'like', "%{$request->search}%")
                  ->orWhere('ticket_number', 'like', "%{$request->search}%")
            )
            ->latest()
            ->paginate(10);

        return inertia('Incidents/Index', [
            'incidents' => $incidents,
            'filters' => $request->only('search'),
        ]);
    }

    public function show(Incident $incident)
    {
        $incident->load('responses.responder');

        return inertia('Incidents/Show', [
            'incident' => $incident,
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

		return inertia('Public/Incidents/Create', [
			'captcha' => ['a' => $a, 'b' => $b],
		]);
    }

    /**
     * 🌐 Public: Submit new incident with captcha validation.
     */
    public function store(Request $request)
    {
        $request->validate([
            'reporter_name' => 'nullable|string|max:255',
            'reporter_email' => 'nullable|email|max:255',
            'reporter_phone' => 'nullable|string|max:20',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'attachment' => 'nullable|file|max:4096|mimes:pdf,jpg,jpeg,png,doc,docx',
            'captcha_answer' => 'required|numeric',
        ]);

        // Validate captcha from session
        if ((int) $request->captcha_answer !== session('captcha_result')) {
			return back()->withErrors(['captcha_answer' => 'Jawaban captcha salah.'])->withInput();
		}

        // Hapus captcha dari session agar tidak bisa reuse
        session()->forget(['captcha_a', 'captcha_b', 'captcha_result']);

        // Simpan file jika ada
        $attachmentPath = null;
        if ($request->hasFile('attachment')) {
            $attachmentPath = $request->file('attachment')->store('incident_attachments', 'public');
        }

        $incident = Incident::create([
            'ticket_number' => strtoupper(Str::random(10)),
            'reporter_name' => $request->reporter_name,
            'reporter_email' => $request->reporter_email,
            'reporter_phone' => $request->reporter_phone,
            'title' => $request->title,
            'description' => $request->description,
            'attachment' => $attachmentPath,
            'status' => 'open',
        ]);

        return to_route('incidents.track', ['ticket' => $incident->ticket_number])
            ->with('success', 'Laporan berhasil dikirim. Simpan nomor tiket Anda.');
    }

    public function track($ticket)
    {
        $incident = Incident::where('ticket_number', $ticket)
            ->with('responses.responder')
            ->firstOrFail();

        return inertia('Public/Incidents/TrackResult', [
            'incident' => [
                'id' => $incident->id,
                'title' => $incident->title,
                'description' => $incident->description,
                'ticket_number' => $incident->ticket_number,
                'reporter_name' => $incident->reporter_name,
                'reporter_email' => $incident->reporter_email,
                'reporter_phone' => $incident->reporter_phone,
                'status' => $incident->status,
                'created_at' => $incident->created_at,
                'attachment' => $incident->attachment,
                'responses' => $incident->responses->map(fn ($r) => [
                    'id' => $r->id,
                    'response' => $r->response,
                    'responder_name' => $r->responder->name ?? 'Admin',
                    'created_at' => $r->created_at,
                ]),
            ]
        ]);
    }

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
