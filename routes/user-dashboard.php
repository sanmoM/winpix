<?php

use App\Http\Controllers\UserDashboard\QuestController;

Route::resource('/quest', QuestController::class)->names('user-dashboard.quest');