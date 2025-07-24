<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('incident_responses', function (Blueprint $table) {
            // Ubah kolom 'responder_id' menjadi nullable
            // Anda perlu drop foreign key constraint terlebih dahulu jika ada,
            // lalu ubah kolom, lalu tambahkan kembali constraint jika diperlukan.
            // Namun, untuk kasus ini, Laravel cukup pintar untuk menanganinya.
            $table->foreignId('responder_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('incident_responses', function (Blueprint $table) {
            // Kembalikan kolom 'responder_id' menjadi not nullable
            // Ini mungkin akan gagal jika ada baris dengan responder_id = NULL
            // Pastikan untuk menghapus atau mengisi nilai NULL sebelum rollback.
            $table->foreignId('responder_id')->nullable(false)->change();
        });
    }
};
