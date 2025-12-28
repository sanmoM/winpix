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
        Schema::create('votes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('image_id')->constrained('quest_images')->nullable();
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('quest_id')->constrained('quests');
            $table->integer('score')->default(1);
            $table->integer('skip')->nullable();
            $table->timestamps();

            $table->unique(['image_id', 'user_id', 'quest_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('votes');
    }
};
