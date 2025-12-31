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
        Schema::create('contest_winners', function (Blueprint $table) {
            $table->id();
            $table->foreignId('quest_id')->nullable();
            $table->foreignId('image_id')->nullable();
            $table->string('user_vote')->nullable();
            $table->string('jury_score')->nullable();
            $table->string('total_score')->nullable();
            $table->integer('rank')->nullable();
            $table->string('submitted_by')->default('auto')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contest_winners');
    }
};
