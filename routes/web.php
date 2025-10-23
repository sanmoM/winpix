<?php

use App\Http\Controllers\DiscoverController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AboutController;
use App\Http\Controllers\Admin\HelpController;
use App\Http\Controllers\Admin\OthersController;
use App\Http\Middleware\RoleMiddleware;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');

Route::get('/store', function () {
    return Inertia::render('store');
})->name('store');

Route::get('/discover', [DiscoverController::class, 'discover'])->name('discover');

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
    Route::resource('help', HelpController::class)->names('admin.help');
    Route::get('others', [OthersController::class, 'index'])->name('admin.others');

});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
