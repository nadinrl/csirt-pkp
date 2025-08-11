<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->boolean('is_active')
                  ->default(1)
                  ->after('content') // sesuaikan dengan kolom terakhir sebelum status
                  ->comment('1 = aktif, 0 = non aktif');
        });
    }

    public function down(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropColumn('is_active');
        });
    }
};
