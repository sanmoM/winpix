<?php

use App\Http\Controllers\Admin\AboutController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\BannerController;
use App\Http\Controllers\Admin\BrandMarketingController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\FollowController;
use App\Http\Controllers\Admin\HelpController;
use App\Http\Controllers\Admin\OthersController;
use App\Http\Controllers\Admin\QuestCategoryController;
use App\Http\Controllers\Admin\QuestController;
use App\Http\Controllers\Admin\QuestTypeController;
use App\Http\Controllers\Admin\RankingController;
use App\Http\Controllers\Admin\RedeemController;
use App\Http\Controllers\Admin\SeriesController;
use App\Http\Controllers\Admin\SliderController;
use App\Http\Controllers\Admin\StoreController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\FaviconController;
use App\Http\Controllers\JudgeContestController;
use App\Http\Controllers\LogoController;
use App\Http\Controllers\PrizePoolController;
use App\Http\Controllers\TransactionController;
use App\Models\Report;
use App\Models\User;
use App\Services\RankingService;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/cache-clear', function () {
    Artisan::call('cache:clear');
    Artisan::call('config:clear');
    Artisan::call('route:clear');
    Artisan::call('view:clear');
    Artisan::call('storage:link');

    return 'Cache cleared successfully!';
});

Route::get('auth-error', function () {
    return view('error');
})->name('auth.error');

Route::middleware(['auth', 'verified', 'role:user,jury'])->group(function () {
    Route::get('dashboard', function () {
        $stats = [
            'totalQuests' => auth()->user()->joinedQuests()->count(),
            'totalVotes' => auth()->user()->votes()->count(),
            'currentLevel' => auth()->user()->level,
            'followers' => auth()->user()->followers()->count(),
            'following' => auth()->user()->following()->count(),
            'questImages' => User::with('followers', 'following', 'joinedQuests', 'questImages', 'votes')->findOrFail(auth()->id())->questImages,
            'likedImages' => auth()->user()->votes()->with('image')->get(),
            'rank' => RankingService::getRank(auth()->user()->level),
        ];

        $user = User::with('followers', 'following', 'joinedQuests', 'questImages', 'votes')->findOrFail(auth()->user()->id);

        return Inertia::render('dashboard', ['stats' => $stats, 'user' => $user]);
    })->name('dashboard');
    // follow unfollow
    Route::post('/users/{user}/follow', [FollowController::class, 'follow'])->name('users.follow');
    Route::delete('/users/{user}/unfollow', [FollowController::class, 'unfollow'])->name('users.unfollow');

    // Ranking System
    Route::get('/ranking', [RankingController::class, 'index'])->name('ranking.show');
    Route::post('/ranking/join-contest', [RankingController::class, 'joinContest'])->name('ranking.join');
    Route::post('/ranking/win-contest', [RankingController::class, 'winContest'])->name('ranking.win');
    Route::post('/ranking/cast-votes', [RankingController::class, 'castVote'])->name('ranking.vote');

    Route::get('transactions', [TransactionController::class, 'index'])->name('transaction');

});

Route::middleware(['auth', 'verified', 'role:jury'])->group(function () {
    Route::get('/judge/contest', [JudgeContestController::class, 'index'])->name('judge.contest');
    Route::get('/judge/contest/{id}', [JudgeContestController::class, 'scoreContest'])->name('judge.contest.score');
    Route::get('/judge/contest/score/{id}', [JudgeContestController::class, 'showContestScore'])->name('judge.show.contest.score');
    Route::get('/lead-judge/contest', [JudgeContestController::class, 'leadJudge'])->name('lead_judge.contest');
    Route::get('/lead-judge/contest/score/show/{id}', [JudgeContestController::class, 'declearWinner'])->name('lead_judge.declearWinner');
    Route::post('/judge/vote', [JudgeContestController::class, 'vote'])->name('judge.vote');
    Route::get('/lead-judge/contest/score/{id}', [JudgeContestController::class, 'allJudgeContestScore'])->name('lead_judge.allContestScore');
});

Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->group(function () {

    Route::get('/dashboard', [AdminController::class, 'admin'])->name('admin.dashboard');
    Route::get('/users', [UserController::class, 'allUsers'])->name('admin.allUsers');
    Route::get('/users/view/{id}', [UserController::class, 'show'])->name('admin.view-user');
    Route::get('/users/edit/{id}', [UserController::class, 'EditUsers'])->name('admin.editUsers');
    Route::put('/users/update/{id}', [UserController::class, 'updateUsers'])->name('admin.updateUsers');
    Route::get('/judge', [UserController::class, 'allJudge'])->name('admin.allJudge');
    Route::get('/judge/create', [UserController::class, 'createJudge'])->name('admin.judge.create');
    Route::post('/judge/store', [UserController::class, 'storeJudge'])->name('admin.judge.store');
    Route::get('/judge/edit/{id}', [UserController::class, 'editJudge'])->name('admin.editJudge');
    Route::put('/judge/update/{id}', [UserController::class, 'updateJudge'])->name('admin.updateJudge');
    Route::get('/contest', [QuestController::class, 'index'])->name('admin.quest');
    Route::get('/contest/create', [QuestController::class, 'create'])->name('admin.quest.create');
    Route::get('/contest/edit/{id}', [QuestController::class, 'edit'])->name('admin.quest.edit');
    Route::get('/contest/view/{id}', [QuestController::class, 'show'])->name('admin.quest.view');
    Route::get('/loges', [QuestController::class, 'ContestLogs'])->name('admin.contestLogs');
    Route::resource('about', AboutController::class)->names('admin.about');
    Route::resource('slider', SliderController::class)->names('admin.slider');
    Route::resource('store', StoreController::class)->names('admin.store');
    Route::resource('redeem', RedeemController::class)->names('admin.redeem');
    Route::resource('help', HelpController::class)->names('admin.help');
    Route::resource('series', SeriesController::class)->names('admin.series');
    Route::resource('type', QuestTypeController::class)->names('admin.questType');
    Route::resource('category', QuestCategoryController::class)->names('admin.questCategory');
    Route::get('others', [OthersController::class, 'index'])->name('admin.others');
    Route::resource('contacts', ContactController::class)->names('admin.contacts');
    Route::get('marketing-banner', [BannerController::class, 'index'])->name('marketing.banner');
    Route::put('marketing-banner/update', [BannerController::class, 'update'])->name('banner.update');
    Route::resource('brand-marketing', BrandMarketingController::class)->names('admin.brand_marketing');
    Route::get('/report', function () {
        $reports = Report::with(['image.user'])->get();

        return Inertia::render('Admin/Report/index', [
            'reports' => $reports,
        ]);
    });
    Route::resource('/prize-pools', PrizePoolController::class)->names('admin.prize_pools');
    Route::get('/transactions', [TransactionController::class, 'adminIndex'])->name('admin.transaction');
    Route::resource('/favicon', FaviconController::class)->names('admin.favicon');
    Route::resource('/logo', LogoController::class)->names('admin.logo');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/frontend.php';
require __DIR__ . '/user-dashboard.php';
