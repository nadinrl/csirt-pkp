<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class IncidentCompletedNotification extends Mailable
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
            subject: 'Laporan Insiden #' . $this->report->ticket_number . ' Selesai',
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.incidents.completed',
            with: ['report' => $this->report],
        );
    }
}