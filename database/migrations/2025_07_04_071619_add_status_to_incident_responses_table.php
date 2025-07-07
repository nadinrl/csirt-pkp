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
            //
			$table->enum('new_status', ['open', 'in_progress', 'resolved'])->nullable()->after('response');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('incident_responses', function (Blueprint $table) {
            //
			$table->dropColumn('new_status');
        });
    }
};
