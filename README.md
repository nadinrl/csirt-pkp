# 🇮🇩 CSIRT Website - Kementerian Perumahan dan Kawasan Permukiman

Selamat datang di repositori resmi **CSIRT (Computer Security Incident Response Team)** untuk **Kementerian Perumahan dan Kawasan Permukiman (PKP)** Republik Indonesia.  
Aplikasi ini bertujuan untuk menyediakan sistem pelaporan insiden siber, penyebaran informasi keamanan, manajemen insiden, dan kolaborasi keamanan siber internal.

## 🌐 Fitur Publik

- 🎯 **Beranda CSIRT**: Slider interaktif, artikel keamanan siber, panduan keamanan, dan dokumentasi CSIRT (RFC2350).
- 📢 **Artikel & Berita**: Manajemen berita terkait keamanan informasi.
- 📄 **Panduan Keamanan Siber**: File dapat diunduh langsung oleh publik.
- 📬 **Formulir Pelaporan Insiden Siber**: Lengkap dengan CAPTCHA dan opsi anonim.
- 🎟️ **Pelacakan Tiket**: Pelapor dapat melihat status penanganan insiden dengan nomor tiket.
- 🔐 **Public Key PGP**: Untuk komunikasi terenkripsi.

## 🛠️ Fitur Admin

- 👥 **Manajemen Pengguna**: RBAC menggunakan Spatie (admin, CSIRT, reviewer).
- 🔔 **Notifikasi Real-time**: Menggunakan Laravel Echo + Pusher.
- 🧾 **Manajemen Insiden Siber**: Melihat, mengedit, dan memberikan respons historikal.
- 📊 **Dashboard Insiden**: Statistik, prioritas, dan klasifikasi insiden.
- 📝 **Audit Trail**: Pencatatan seluruh aktivitas user.
- 📤 **Ekspor Laporan**: PDF dan Excel untuk pelaporan dan dokumentasi.
- 🔄 **Sistem Tracking Tiket dan Prioritas Insiden**
- 🔍 **Pencarian & Filter Insiden**
- 📷 **Upload Bukti Insiden** (gambar, dokumen, dll)

## 📦 Teknologi yang Digunakan

- **Frontend**: React.js + Inertia.js + Tailwind CSS
- **Backend**: Laravel 11
- **Authentication**: Laravel Sanctum, 2FA (optional)
- **Role & Permission**: [Spatie Laravel Permission](https://github.com/spatie/laravel-permission)
- **Database**: MySQL / MariaDB
- **Real-time**: Laravel Echo + Pusher
- **Deployment**: Nginx + SSL DigiCert, systemd service

## ⚙️ Instalasi Lokal

### 1. Clone Repositori
    git clone https://github.com/dhenick/csirt-pkp.git
    cd csirt-pupr
    cd backend

### 2. Setup Backend
    cp .env.example .env
    composer install
    php artisan key:generate
    php artisan migrate --seed
    php artisan storage:link

### 3. Setup Frontend
    cd frontend
    npm install
    npm run dev

Keamanan
- Semua data pelaporan dienkripsi dan dijaga kerahasiaannya.
- CSIRT hanya dapat melihat insiden yang ditugaskan.
- CAPTCHA mencegah spam pelaporan.
- Audit log menyimpan seluruh aktivitas penting.

Tim Pengembang
- Dedik Haryanto — Lead Developer
