<?php

namespace App\Http\Controllers;

use App\Models\Incident;
use App\Models\IncidentResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // Import Auth facade

class IncidentResponseController extends Controller
{
    /**
     * Store a new response for an incident, and optionally update the incident's status.
     */
    public function store(Request $request, Incident $incident)
    {
        $request->validate([
            'response' => 'required|string',
            // Validasi untuk status baru, harus sesuai dengan ENUM di database
            'status' => 'nullable|in:received,in_progress,completed,closed',
        ]);

        // Simpan respons
        $incident->responses()->create([
            'responder_id' => Auth::id(), // Gunakan ID user yang sedang login
            'response' => $request->response,
            'status_at_response' => $request->status, // Gunakan 'status_at_response'
        ]);

        // Jika ada pembaruan status dan status yang baru berbeda dari status insiden saat ini
        if ($request->filled('status') && $incident->status !== $request->status) {
            $incident->status = $request->status;
            $incident->save();
        }

        return back()->with('success', 'Respon berhasil ditambahkan dan status diperbarui.');
    }
}
