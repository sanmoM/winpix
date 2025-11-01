<?php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AboutController;
use App\Http\Controllers\Admin\HelpController;
use App\Http\Controllers\Admin\SliderController;
use App\Http\Controllers\Admin\StoreController;
use App\Http\Controllers\Admin\RedeemController;
use App\Http\Controllers\Admin\OthersController;
use App\Http\Controllers\Admin\SeriesController;
use App\Http\Controllers\Admin\QuestTypeController;
use App\Http\Controllers\Admin\QuestCategoryController;

Route::get('auth-error', function () {
    return view('error');
})->name('auth.error');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', 'verified', 'role:jury'])->group(function () {
    Route::get('jury/dashboard', function () {
        return Inertia::render('Jury/dashboard');
    })->name('jury.dashboard');
});

Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->group(function () {

    Route::get('dashboard', [AdminController::class, 'admin'])->name('admin.dashboard');
    Route::resource('about', AboutController::class)->names('admin.about');
    Route::resource('slider', SliderController::class)->names('admin.slider');
    Route::resource('store', StoreController::class)->names('admin.store');
    Route::resource('redeem', RedeemController::class)->names('admin.redeem');
    Route::resource('help', HelpController::class)->names('admin.help');
    Route::resource('series', SeriesController::class)->names('admin.series');
    Route::resource('quest-type', QuestTypeController::class)->names('admin.questType');
    Route::resource('quest-category', QuestCategoryController::class)->names('admin.questCategory');
    Route::get('others', [OthersController::class, 'index'])->name('admin.others');

});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/frontend.php';
