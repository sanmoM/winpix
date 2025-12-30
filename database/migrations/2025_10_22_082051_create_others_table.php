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
            $table->string('fav_icon');
            $table->string('app_name');
            $table->text('app_description');
            $table->longText('terms_of_service');
            $table->longText('privacy_policy');
            $table->longText('copyright');
            $table->longText('facebook');
            $table->longText('twitter');
            $table->longText('instagram');
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
