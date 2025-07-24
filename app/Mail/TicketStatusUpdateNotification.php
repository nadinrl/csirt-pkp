<?php

namespace App\Mail;

use App\Models\Incident; // Import model Incident
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class TicketStatusUpdatedNotification extends Mailable implements ShouldQueue // Tambahkan implements ShouldQueue untuk antrean (opsional tapi disarankan)
{
    use Queueable, SerializesModels;

    public $incident; // Kita akan passing object Incident ke sini
    public $oldStatus; // Untuk menyimpan status lama (opsional, tapi bagus untuk konteks)

    /**
     * Create a new message instance.
     */
    public function __construct(Incident $incident, $oldStatus)
    {
        $this->incident = $incident;
        $this->oldStatus = $oldStatus;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Pembaruan Status Tiket Pengaduan Anda: ' . $this->incident->ticket_number,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.ticket_status_updated', // Ini akan merujuk ke file Blade template
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}