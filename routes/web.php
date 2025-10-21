<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Middleware\RoleMiddleware;

// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');

Route::get('auth-error', function () {
    return view('error');
})->name('auth.error');

Route::middleware(['auth', 'verified', 'role:user'])->group(function () {

    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

});

Route::middleware(['auth', 'verified', 'role:admin' ])->group(function () {

   Route::get('admin/dashboard', [AdminController::class, 'admin'])->name('admin.dashboard');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
