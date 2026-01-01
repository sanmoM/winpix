<?php

use App\Http\Controllers\UserDashboard\QuestController;
use App\Models\Transaction;
use Inertia\Inertia;

Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {
    Route::resource('/quest', QuestController::class)->names('user-dashboard.quest');
});
