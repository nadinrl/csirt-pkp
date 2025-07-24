<?php

namespace App\Http\Controllers;

use App\Models\Incident;
use App\Models\IncidentResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // Import Auth facade
use Illuminate\Support\Facades\Mail; // Import Mail facade
use App\Mail\TicketStatusUpdatedNotification; // Import Mailable Anda

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

        $oldStatus = $incident->status; // Simpan status lama sebelum diperbarui

        // Simpan respons ke tabel incident_responses
        $incident->responses()->create([
            'responder_id' => Auth::id(), // Gunakan ID user yang sedang login
            'response' => $request->response,
            'status_at_response' => $request->status, // Gunakan 'status_at_response'
        ]);

        // Jika ada pembaruan status dan status yang baru berbeda dari status insiden saat ini
        if ($request->filled('status') && $incident->status !== $request->status) {
            $incident->status = $request->status;
            $incident->save(); // Simpan perubahan status ke database

            // Cek apakah email pelapor tidak kosong sebelum mengirim notifikasi
            if (!empty($incident->reporter_email)) {
                // Kirim notifikasi email
                // Pastikan Anda sudah membuat Mailable 'TicketStatusUpdatedNotification'
                // dan mengkonfigurasi driver email di Laravel.
                Mail::to($incident->reporter_email)
                    ->queue(new TicketStatusUpdatedNotification($incident, $oldStatus));
                // INGAT: Gunakan ->queue() untuk performa lebih baik (membutuhkan setup antrean Laravel)
                // Jika belum setup antrean, bisa pakai ->send() dulu:
                // Mail::to($incident->reporter_email)->send(new TicketStatusUpdatedNotification($incident, $oldStatus));
            }
        }

        return back()->with('success', 'Respon berhasil ditambahkan dan status diperbarui.');
    }
}
