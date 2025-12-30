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
            $table->string('title_en');
            $table->longText('brief_en');
            $table->string('title_ar');
            $table->longText('brief_ar');
            $table->string('image');
            $table->enum('status', ['Scheduled', 'Paused', 'Open', 'Closed'])->default('Scheduled');
            $table->integer('entry_coin');
            $table->foreignId('category_id')
                ->constrained('quest_categories')
                ->onDelete('cascade');
            $table->foreignId('quest_series_id')
                ->constrained('series')
                ->onDelete('cascade');
            $table->foreignId('quest_type_id')
                ->constrained('quest_types')
                ->onDelete('cascade');
            $table->foreignId('user_id')
                ->constrained('users')
                ->onDelete('cascade');
            $table->date('start_date');
            $table->date('end_date');
            $table->text('level_requirement_en')->nullable();
            $table->text('categories_requirement_en')->nullable();
            $table->text('copyright_requirement_en')->nullable();
            $table->text('level_requirement_ar')->nullable();
            $table->text('categories_requirement_ar')->nullable();
            $table->text('copyright_requirement_ar')->nullable();

            $table->enum('vote_rights', ['Public', 'Judges', 'Hybrid'])->default('Public');
            $table->enum('manual_override', ['None', 'Force_Open', 'Force_Paused', 'Force_Closed'])->default('None');
            $table->string('winner_declaration', 50)->default('auto');
            $table->foreignId('lead_judge')->nullable()->constrained('users')->onDelete('cascade');
            $table->enum('winner_status', ['pending', 'judge_submitted', 'admin_approved'])->default('pending');
            $table->string('winner_approved_at')->nullable();
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
