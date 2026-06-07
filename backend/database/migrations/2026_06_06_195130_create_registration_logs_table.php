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
        Schema::create('registration_logs', function (Blueprint $blueprint) {
            $blueprint->id();
            $blueprint->foreignId('registration_id')->constrained()->cascadeOnDelete();
            $blueprint->string('status');
            $blueprint->string('message')->nullable();
            $blueprint->timestamp('created_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registration_logs');
    }
};
