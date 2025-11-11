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
        Schema::create('prizes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('quest_id');
            $table->foreign('quest_id')->references('id')->on('quests')->onDelete('cascade');
            $table->string('title');
            $table->integer('min');
            $table->integer('max');
            $table->integer('coin')->nullable();
            $table->timestamps();
            $table->string('coinType');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prizes');
    }
};
