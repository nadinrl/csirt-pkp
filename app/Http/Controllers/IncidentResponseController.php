<?php

namespace App\Http\Controllers;

use App\Models\Incident;
use App\Models\IncidentResponse; // Sudah ada
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // Import Auth facade
use Illuminate\Support\Facades\Mail; // Tambahkan ini
use App\Mail\TicketStatusUpdatedNotification; // Tambahkan ini (sesuai nama mailable Anda)

class IncidentResponseController extends Controller
{
    /**
     * Store a new response for an incident, and optionally update the incident's status.
     */
    public function store(Request $request, Incident $incident)
    {
        $request->validate([
            'response' => 'required|string',
          feat/halaman-tracking
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
            'new_status' => 'nullable|in:open,in_progress,resolved,closed', // Pastikan 'closed' ada jika Anda menggunakannya
        ]);

        // Simpan respons (jika ini memang fungsi utamanya)
        $incident->responses()->create([
            'responder_id' => auth()->id(),
            'response' => $request->response,
            // 'new_status' => $request->new_status, // Kolom ini mungkin tidak perlu di IncidentResponse, tergantung desain DB Anda
        ]);

        $oldStatus = $incident->status; // Simpan status lama sebelum diperbarui

        // Jika ada pembaruan status
        if ($request->filled('new_status') && $incident->status != $request->new_status) {
            $incident->status = $request->new_status;
            $incident->save(); // Simpan perubahan status ke database

            // --- Bagian ini yang perlu Anda tambahkan ---
            // Cek apakah email pelapor tidak kosong sebelum mengirim
            if (!empty($incident->reporter_email)) {
                // Buat link tracking yang sesuai dengan rute Anda
                $trackingLink = url('/track/' . $incident->ticket_number); // Asumsi 'ticket_number' adalah field yang unik dan bisa di-track

                // Kirim notifikasi email
                Mail::to($incident->reporter_email)
                    ->queue(new TicketStatusUpdatedNotification($incident, $oldStatus));
                // INGAT: Gunakan ->queue() untuk performa lebih baik (membutuhkan setup antrean Laravel)
                // Jika belum setup antrean, bisa pakai ->send() dulu:
                // Mail::to($incident->reporter_email)->send(new TicketStatusUpdatedNotification($incident, $oldStatus));
            }
            // --- Akhir bagian yang perlu ditambahkan ---
        }

        return back()->with('success', 'Respon berhasil ditambahkan.');
    }
}
