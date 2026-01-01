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
        Schema::create('others', function (Blueprint $table) {
            $table->id();
            $table->string('light_logo');
            $table->string('dark_logo');
            $table->string('fav_icon')->nullable();
            $table->string('app_name')->nullable();
            $table->text('app_description')->nullable();
            $table->longText('terms_of_service')->nullable();
            $table->longText('privacy_policy')->nullable();
            $table->longText('copyright')->nullable();
            $table->longText('facebook')->nullable();
            $table->longText('twitter')->nullable();
            $table->longText('instagram')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('others');
    }
};
