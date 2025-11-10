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
        Schema::create('quests', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('brief');
            $table->string('image');
            $table->enum('status', ['active', 'ended'])->default('active');
            $table->integer('entry_coin');

            // ✅ Foreign key to quest_categories
            $table->foreignId('category_id')
                ->constrained('quest_categories')
                ->onDelete('cascade');

            // ✅ Foreign key to users table (User model)
            $table->foreignId('user_id')
                ->constrained('users')
                ->onDelete('cascade');
            $table->date('start_date');
            $table->date('end_date');
            $table->text('level_requirement')->nullable();
            $table->text('categories_requirement')->nullable();
            $table->text('copyright_requirement')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quests');
    }
};
