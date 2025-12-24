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
        Schema::create('voting_override_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('contest_id')
                ->constrained('quests')
                ->cascadeOnDelete();
            $table->foreignId('admin_id')
                ->constrained('users')
                ->cascadeOnDelete();
            $table->string('action');
            $table->text('reason')->nullable();
            $table->index(['contest_id', 'admin_id']);
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('voting_override_logs');
    }
};
