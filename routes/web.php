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
use App\Http\Controllers\Admin\RankingController;
use App\Http\Controllers\Admin\FollowController;

Route::get('auth-error', function () {
    return view('error');
})->name('auth.error');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    // follow unfollow
    Route::post('/users/{user}/follow', [FollowController::class, 'follow'])->name('users.follow');
    Route::delete('/users/{user}/unfollow', [FollowController::class, 'unfollow'])->name('users.unfollow');

    // Ranking System
    Route::get('/ranking', [RankingController::class, 'index'])->name('ranking.show');
    Route::post('/ranking/join-contest', [RankingController::class, 'joinContest'])->name('ranking.join');
    Route::post('/ranking/win-contest', [RankingController::class, 'winContest'])->name('ranking.win');
    Route::post('/ranking/cast-votes', [RankingController::class, 'castVote'])->name('ranking.vote');

});

Route::middleware(['auth', 'verified', 'role:jury'])->prefix('jury')->group(function () {
    Route::get('dashboard', function () {
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
require __DIR__ . '/user-dashboard.php';
