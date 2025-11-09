<?php

use App\Http\Controllers\UserDashboard\QuestController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('/quest', QuestController::class)->names('user-dashboard.quest');
});