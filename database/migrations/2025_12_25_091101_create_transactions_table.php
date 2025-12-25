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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('transaction_id')->unique();
            $table->foreignId('user_id')->nullable();
            $table->foreignId('reference_id')->nullable();
            $table->bigInteger('transaction_type')->nullable();
            $table->integer('amount')->nullable();
            $table->string('amount_type')->nullable();
            $table->string('currency')->nullable();
            $table->string('payment_method')->nullable();
            $table->string('status')->nullable();
            $table->text('details')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
