<?php

use App\Http\Controllers\Admin\AboutController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\BannerController;
use App\Http\Controllers\Admin\BrandMarketingController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\ContestWinnerController;
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
use App\Models\ContestWinner;
use App\Models\QuestImage;
use App\Models\QuestJoin;
use App\Models\Report;
use App\Models\Transaction;
use App\Models\User;
use App\Models\Vote;
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

    Route::get('coin-history', function () {
        $userId = auth()->user()->id;
        $transactions = Transaction::with('user:id,name')
            ->where('user_id', $userId)
            ->latest()
            ->paginate(12)
            ->withQueryString();
        return Inertia::render('user-dashboard/coin-history', [
            'transactions' => $transactions,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    })->name('coin-history');

    Route::get('win-and-rewards', function () {
        $userId = auth()->user()->id;
        $transactions = Transaction::with('user:id,name')
            ->where('transaction_type', '!=', 'join_contest')
            ->where('user_id', $userId)
            ->latest()
            ->paginate(12)
            ->withQueryString();
        return Inertia::render('user-dashboard/win-and-rewards', [
            'transactions' => $transactions,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    })->name('win-and-rewards');

    Route::get('wallet-transactions', function () {
        $userId = auth()->user()->id;
        $transactions = Transaction::with('user:id,name')
            ->where('user_id', $userId)
            ->latest()
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('user-dashboard/wallet-transaction', [
            'transactions' => $transactions,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    })->name('wallet-transactions');

    Route::get('billing-invoice', function () {
        $userId = auth()->user()->id;
        $transactions = Transaction::with('user:id,name')
            ->where('payment_method', '!=', null)
            ->where('user_id', $userId)
            ->latest()
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('user-dashboard/billing-invoice', [
            'transactions' => $transactions,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    })->name('billing-invoices');

    Route::get('my-photos', function () {
        return Inertia::render('user-dashboard/my-photos', [
            'stats' => [
                'questImages' => QuestImage::with(['quest.prizes.prize_pool', 'user'])
                    ->withCount([
                        'vote as total_votes' => function ($query) {
                            $query->whereNull('skip');
                        }
                    ])
                    ->where('user_id', auth()->id())
                    ->orderByDesc('total_votes')
                    ->get(),
                'likedImages' => QuestImage::with(['quest.prizes.prize_pool', 'user'])
                    ->withCount([
                        'vote as total_votes' => function ($query) {
                            $query->whereNull('skip');
                        }
                    ])
                    ->whereHas('vote', function ($query) {
                        $query->where('user_id', auth()->id())
                            ->whereNull('skip');
                    })
                    ->get(),
            ],
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    })->name('my-photos');

    Route::get('my-contests', function () {
        $joinedQuests = QuestJoin::with(['quest', 'quest.user', 'quest.category'])->where('user_id', auth()->user()->id)->get();

        return Inertia::render('user-dashboard/my-contests', [
            'quests' => $joinedQuests,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    })->name('my-contests');

    Route::get('/engagement-and-community', function () {
        $likedImages = Vote::with([
            'image.quest',
            'user' // voter info
        ])
            ->whereHas('image', function ($query) {
                $query->where('user_id', auth()->id());
            })
            ->orderByDesc('created_at')
            ->paginate(12)
            ->withQueryString();


        $reportedImages = Report::with([
            'image.quest',
            'image.user' // voter info
        ])
            ->whereHas('image', function ($query) {
                $query->where('user_id', auth()->id());
            })
            ->orderByDesc('created_at')
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('user-dashboard/engagement-and-community', [
            'likedImages' => $likedImages,
            'reportedImages' => $reportedImages,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    })->name('engagement-and-community');

    // Route::get('/create-notification', function ($request) {
    //     $request->validate([
    //         'title' => 'required|string|max:255',
    //         'subtitle' => 'required|string',
    //         'user_id' => 'required|integer|exists:users,id',
    //     ]);
    //     return Inertia::render('user-dashboard/create-notification', [
    //         'redirectTo' => $request->input('redirectTo', null),
    //     ]);

    // })->name('create-notification');
    
    Route::get('/notifications', function () {
        $user = auth()->user();
        $notifications = $user->notifications()->orderBy('created_at', 'desc')->get();

        return response()->json([
            'notifications' => $notifications,
        ]);
    })->name('notifications');

    Route::post('/mark-as-read', function ($request) {
        $request->validate([
            'notification_ids' => 'required|array',
            'notification_ids.*' => 'required|string',
        ]);

        $notificationId = $request->input('notification_id');
        $user = auth()->user();

        $notification = $user->notifications()->where('id', $notificationId)->first();

        if ($notification) {
            $notification->markAsRead();
            return response()->json(['message' => 'Notification marked as read.'], 200);
        } else {
            return response()->json(['message' => 'Notification not found.'], 404);
        }
    })->name('mark-as-read');
    
});

Route::middleware(['auth', 'verified', 'role:admin,jury'])->group(function () {
    Route::get('/view-winners/{questId}', function ($questId) {
        $winners = ContestWinner::with('image.user')->where('quest_id', $questId)->paginate(10)->withQueryString();

        return Inertia::render('contest-winner', [
            'winners' => $winners,
        ]);
    })->name('view-winners');
});

Route::middleware(['auth', 'verified', 'role:jury'])->group(function () {
    Route::get('/judge/contest', [JudgeContestController::class, 'index'])->name('judge.contest');
    Route::get('/judge/contest/{id}', [JudgeContestController::class, 'scoreContest'])->name('judge.contest.score');
    Route::get('/judge/contest/score/{id}', [JudgeContestController::class, 'showContestScore'])->name('judge.show.contest.score');
    Route::get('/lead-judge/contest', [JudgeContestController::class, 'leadJudge'])->name('lead_judge.contest');
    Route::get('/lead-judge/contest/score/show/{id}', [JudgeContestController::class, 'declearWinner'])->name('lead_judge.declearWinner');
    Route::post('/judge/vote', [JudgeContestController::class, 'vote'])->name('judge.vote');

    Route::get('/lead-judge/contest/score/{id}', [JudgeContestController::class, 'allJudgeContestScore'])->name('lead_judge.allContestScore');

    Route::post('/contest/judge-winner-status', [JudgeContestController::class, 'judgeWinnerStatus'])->name('lead_judge.judgeWinnerStatus');

    Route::get('/lead-judge/contest/lead-judge-score/{imageId}', [JudgeContestController::class, 'leadJudgeScoreView'])->name('lead_judge.lead_judge_score_view');

    Route::post('/lead-judge/contest/lead-judge-score/{imageId}', [JudgeContestController::class, 'leadJudgeScore'])->name('lead_judge.lead_judge_score');
});

Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->group(function () {

    Route::get('/dashboard', [AdminController::class, 'admin'])->name('admin.dashboard');
    Route::get('/users', [UserController::class, 'allUsers'])->name('admin.allUsers');
    Route::get('/users/view/{id}', [UserController::class, 'show'])->name('admin.view-user');
    Route::get('/users/edit/{id}', [UserController::class, 'EditUsers'])->name('admin.editUsers');
    Route::get('/users/change-password/{id}', [UserController::class, 'ChangePasswordUsers'])->name('admin.ChangePasswordUsers');
    Route::put('/users/password/update/{id}', [UserController::class, 'PasswordUpdate'])->name('admin.PasswordUpdateUsers');
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
    Route::put('others', [OthersController::class, 'update'])->name('admin.others.update');
    Route::resource('contacts', ContactController::class)->names('admin.contacts');
    Route::get('marketing-banner', [BannerController::class, 'index'])->name('marketing.banner');
    Route::put('marketing-banner/update', [BannerController::class, 'update'])->name('banner.update');
    Route::resource('brand-marketing', BrandMarketingController::class)->names('admin.brand_marketing');
    Route::get('/report', function () {
        $reports = Report::with(['image.user'])->orderBy('id', 'desc')->paginate(10)->withQueryString();

        return Inertia::render('Admin/Report/index', [
            'reports' => $reports,
        ]);
    });
    Route::resource('/prize-pools', PrizePoolController::class)->names('admin.prize_pools');
    Route::get('/transactions', [TransactionController::class, 'adminIndex'])->name('admin.transaction');
    Route::resource('/favicon', FaviconController::class)->names('admin.favicon');
    Route::resource('/logo', LogoController::class)->names('admin.logo');

    Route::get('/contest-winner', [ContestWinnerController::class, 'adminContest'])->name('adminContest.show');
    Route::get('/judge/contest-winner', [ContestWinnerController::class, 'adminJudgeContest'])->name('adminJudgeContest.show');
    Route::get('/auto/contest-winner', [ContestWinnerController::class, 'adminAutoContest'])->name('adminAutoContest.show');
    Route::get('/contest-winner/score/show/{id}', [ContestWinnerController::class, 'adminDeclareContestWinner'])->name('admin.declareWinner.show');
    Route::get('/judge/contest-winner/score/show/{id}', [ContestWinnerController::class, 'judgeDeclareContestWinner'])->name('admin.judge.declareWinner.show');
    Route::get('/auto/contest-winner/score/show/{id}', [ContestWinnerController::class, 'autoDeclareContestWinner'])->name('admin.auto.declareWinner.show');

    Route::post('/contest/declare-winner', [ContestWinnerController::class, 'winnerStore'])->name('admin.contest.declare-winner');

    Route::get('/contest/admin-score/{imageId}', [ContestWinnerController::class, 'adminScoreView'])->name('admin.contest.admin-score-view');

    Route::post('/contest/admin-score/{imageId}', [ContestWinnerController::class, 'adminScore'])->name('admin.contest.change-score');
    Route::post('/contest/distributePrizes/{questId}', [ContestWinnerController::class, 'distributePrizes'])->name('admin.distributePrizes');

});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/frontend.php';
require __DIR__ . '/user-dashboard.php';
