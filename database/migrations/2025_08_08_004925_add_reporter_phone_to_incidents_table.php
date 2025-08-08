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
        Schema::table('incidents', function (Blueprint $table) {
            // Menambahkan kolom 'reporter_phone' sebagai string dan bisa null
            // Ditempatkan setelah kolom 'reporter_email' untuk kerapian
            $table->string('reporter_phone')->nullable()->after('reporter_email');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('incidents', function (Blueprint $table) {
            // Menghapus kolom 'reporter_phone' jika migrasi di-rollback
            $table->dropColumn('reporter_phone');
        });
    }
};

