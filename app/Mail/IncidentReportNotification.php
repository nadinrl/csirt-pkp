<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Headers; // Baris ini harus ditambahkan
use Illuminate\Queue\SerializesModels;

class IncidentReportNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $report;

    public function __construct($report)
    {
        $this->report = $report;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Laporan Insiden #' . $this->report->ticket_number . ' Diterima',
        );
    }

    // Tambahkan method headers() ini
    public function headers(): Headers
    {
        return new Headers(
            text: [
                'X-Logo' => asset('images/logo-csirt-pkp.png'),
            ]
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.incidents.notification',
            with: ['report' => $this->report],
        );
    }
}