<?php

use App\Http\Controllers\DiscoverController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AboutController;
use App\Http\Controllers\Admin\HelpController;
use App\Http\Controllers\Admin\SliderController;
use App\Http\Controllers\Admin\OthersController;
use App\Http\Middleware\RoleMiddleware;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');

Route::get('/store', function () {
    return Inertia::render('store');
})->name('store');

Route::get('/redeem', function () {
    return Inertia::render('redeem');
})->name('redeem');

Route::get('/quests/active', function () {
    return Inertia::render('quests/active');
})->name('active-quests');

Route::get('/discover', [DiscoverController::class, 'discover'])->name('discover');

Route::get('/profile/{id}', function ($id) {
    return Inertia::render('Profile', [
        'id' => $id
    ]);
})->name('profile');

Route::get('/single-quest/{id}', function ($id) {
    return Inertia::render('quests/single-quest', [
        'id' => $id
    ]);
})->name('single-quest');

Route::get('auth-error', function () {
    return view('error');
})->name('auth.error');

Route::middleware(['auth', 'verified', 'role:user'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

});

Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->group(function () {

    Route::get('dashboard', [AdminController::class, 'admin'])->name('admin.dashboard');
    Route::resource('about', AboutController::class)->names('admin.about');
    Route::resource('slider', SliderController::class)->names('admin.slider');
    Route::resource('help', HelpController::class)->names('admin.help');
    Route::get('others', [OthersController::class, 'index'])->name('admin.others');

});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
