<x-mail::message>
# Laporan Anda Telah Selesai Ditangani

Halo {{ $report->reporter_name }},

Terima kasih atas kesabaran Anda. Laporan insiden dengan nomor tiket **#{{ $report->ticket_number }}** telah selesai ditangani.

---

**Detail Laporan Anda:**
- **Nomor Tiket:** {{ $report->ticket_number }}
- **Judul:** {{ $report->title }}
- **Status:** Selesai Ditangani

Jika Anda memiliki pertanyaan lebih lanjut, jangan ragu untuk menghubungi kami.

<x-mail::button :url="route('incidents.track', ['ticket' => $report->ticket_number])">
Lihat Detail Aduan
</x-mail::button>

Terima kasih,
Tim Csirt PKP
</x-mail::message>