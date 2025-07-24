<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB; // Import DB facade for raw queries

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('incidents', function (Blueprint $table) {
            // Ubah kolom 'status' di tabel 'incidents'
            // Penting: Jika Anda sudah memiliki data di tabel 'incidents',
            // pastikan semua nilai 'resolved' diubah menjadi 'completed'
            // sebelum menjalankan migrasi ini, atau tambahkan logika konversi data.
            // Contoh: DB::table('incidents')->where('status', 'resolved')->update(['status' => 'completed']);
            // Atau, jika tabel masih kosong, ini akan bekerja langsung.

            // Drop the existing enum column
            // This requires a raw SQL query for MySQL/MariaDB
            DB::statement('ALTER TABLE incidents CHANGE status status VARCHAR(255)');
            $table->dropColumn('status');

            // Add the new enum column with updated values
            $table->enum('status', ['received', 'in_progress', 'completed', 'closed'])->default('received')->after('description');
        });

        Schema::table('incident_responses', function (Blueprint $table) {
            // Ubah nama kolom 'new_status' menjadi 'status_at_response'
            // dan sesuaikan nilai ENUM-nya.
            // Pastikan untuk mengkonversi nilai 'open'/'in_progress'/'resolved'
            // yang mungkin sudah ada di 'new_status' ke nilai baru jika diperlukan.

            // Drop the existing enum column 'new_status'
            DB::statement('ALTER TABLE incident_responses CHANGE new_status new_status VARCHAR(255) NULL');
            $table->dropColumn('new_status');

            // Add the new enum column with updated values and new name
            $table->enum('status_at_response', ['received', 'in_progress', 'completed', 'closed'])->nullable()->after('response');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('incidents', function (Blueprint $table) {
            // Kembalikan kolom 'status' ke kondisi sebelumnya
            DB::statement('ALTER TABLE incidents CHANGE status status VARCHAR(255)');
            $table->dropColumn('status');
            $table->enum('status', ['open', 'in_progress', 'resolved'])->default('open')->after('description');
        });

        Schema::table('incident_responses', function (Blueprint $table) {
            // Kembalikan kolom 'status_at_response' ke 'new_status'
            DB::statement('ALTER TABLE incident_responses CHANGE status_at_response status_at_response VARCHAR(255) NULL');
            $table->dropColumn('status_at_response');
            $table->enum('new_status', ['open', 'in_progress', 'resolved'])->nullable()->after('response');
        });
    }
};
