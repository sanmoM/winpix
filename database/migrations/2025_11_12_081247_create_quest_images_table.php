<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('quest_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('quest_id')->constrained('quests');
            $table->string('image');
            $table->integer('vote_count')->default(0);
            $table->foreignId('user_id')->constrained('users');
            $table->string('camera_brand')->nullable();
            $table->string('camera_model')->nullable();
            $table->string('lens')->nullable();
            $table->decimal('focal_length', 4, 2)->nullable();
            $table->decimal('aperture', 4, 2)->nullable();
            $table->decimal('shutter_speed', 8, 4)->nullable();
            $table->integer('iso')->nullable();
            $table->dateTime('date_captured')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quest_images');
    }
};
