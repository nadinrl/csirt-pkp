<?php

namespace App\Http\Controllers;

use App\Models\Incident;
use App\Models\IncidentResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // Import Auth facade
use Illuminate\Support\Facades\Mail; // Import Mail facade
use App\Mail\TicketStatusUpdatedNotification; // Import Mailable Anda
use Illuminate\Support\Facades\Log; // **Tambahkan ini untuk menggunakan Log Facade**

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

        // **Tambahkan Log di sini untuk pengecekan**
        Log::info('Pengecekan kondisi pengiriman email:');
        Log::info('Status lama: ' . $oldStatus);
        Log::info('Status baru dari request: ' . $request->status);
        Log::info('Apakah status baru berbeda dari status lama? ' . ($incident->status !== $request->status ? 'YA' : 'TIDAK'));
        Log::info('Apakah email pelapor terisi? ' . (!empty($incident->reporter_email) ? 'YA' : 'TIDAK'));
        // --- Akhir Log Pengecekan ---

        // Jika ada pembaruan status dan status yang baru berbeda dari status insiden saat ini
        if ($request->filled('status') && $incident->status !== $request->status) {
            $incident->status = $request->status;
            $incident->save(); // Simpan perubahan status ke database

            // Cek apakah email pelapor tidak kosong sebelum mengirim notifikasi
            if (!empty($incident->reporter_email)) {
                // Kirim notifikasi email
                // Pastikan Anda sudah membuat Mailable 'TicketStatusUpdatedNotification'
                // dan mengkonfigurasi driver email di Laravel.
                Log::info('Kondisi terpenuhi! Mengirim email ke antrean.');
                Mail::to($incident->reporter_email)
                    ->queue(new TicketStatusUpdatedNotification($incident, $oldStatus));
                // INGAT: Gunakan ->queue() untuk performa lebih baik (membutuhkan setup antrean Laravel)
                // Jika belum setup antrean, bisa pakai ->send() dulu:
                // Mail::to($incident->reporter_email)->send(new TicketStatusUpdatedNotification($incident, $oldStatus));
            } else {
                Log::warning('Email pelapor kosong. Email tidak dapat dikirim.');
            }
        } else {
            Log::info('Kondisi tidak terpenuhi, email tidak dikirim.');
        }

        return back()->with('success', 'Respon berhasil ditambahkan dan status diperbarui.');
    }
}