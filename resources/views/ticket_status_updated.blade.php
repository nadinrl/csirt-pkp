<!DOCTYPE html>
<html>
<head>
    <title>Pembaruan Status Tiket</title>
    <style>
        /* CSS inline untuk kompatibilitas email */
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
        .header { background-color: #dc3545; color: white; padding: 10px 0; text-align: center; border-radius: 5px 5px 0 0; }
        .content { padding: 20px; }
        .footer { text-align: center; font-size: 0.8em; color: #777; margin-top: 20px; }
        .button {
            display: inline-block;
            background-color: #007bff;
            color: white !important;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 15px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Pembaruan Status Tiket CSIRT Kementerian PKP</h2>
        </div>
        <div class="content">
            <p>Yth. Pelapor,</p>
            <p>Kami ingin memberitahukan bahwa status tiket pengaduan Anda dengan nomor: <strong>{{ $incident->ticket_number }}</strong> telah diperbarui.</p>
            <p><strong>Judul Tiket:</strong> {{ $incident->title }}</p>
            <p>Status sebelumnya: <strong>{{ $oldStatus }}</strong></p>
            <p>Status terbaru tiket Anda adalah: <strong>{{ $incident->status }}</strong></p>
            <p>Anda dapat melacak detail tiket Anda kapan saja melalui tautan berikut:</p>
            <p style="text-align: center;">
                {{-- Sesuaikan URL tracking dengan rute Anda --}}
                <a href="{{ url('/track/' . $incident->ticket_number) }}" class="button">Lacak Tiket Anda</a>
            </p>
            <p>Terima kasih atas kesabaran Anda.</p>
            <p>Hormat kami,</p>
            <p>Tim CSIRT Kementerian PKP</p>
        </div>
        <div class="footer">
            <p>&copy; {{ date('Y') }} CSIRT Kementerian Perumahan dan Kawasan Permukiman</p>
        </div>
    </div>
</body>
</html>