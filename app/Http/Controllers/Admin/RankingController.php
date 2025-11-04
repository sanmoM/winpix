<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\RankingService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class RankingController extends Controller
{
    protected $rankingService;

    public function __construct(RankingService $rankingService)
    {
        $this->rankingService = $rankingService;
    }

    /**
     * Display the ranking page.
     */
    public function index()
    {
        return Inertia::render('DemoRanking', [
            'allRanks' => $this->rankingService->getAllRanks(),
            'userRank' => $this->rankingService->getRank(Auth::user()->level),
        ]);
    }

    /**
     * Handle the 'Join Contest' action.
     */
    public function joinContest(Request $request)
    {
        $this->rankingService->joinContest($request->user());
        return Redirect::back()->with('success', 'Joined contest! +2 Levels.');
    }

    /**
     * Handle the 'Win Contest' action.
     */
    public function winContest(Request $request)
    {
        $this->rankingService->winContest($request->user());
        return Redirect::back()->with('success', 'Won contest! +5 Levels.');
    }

    /**
     * Handle the 'Cast 50 Votes' action.
     * In a real app, you'd call castVote() once per vote.
     * This is a helper to simulate 50 votes at once.
     */
    public function castVote(Request $request)
    {
        $user = $request->user();

        for ($i = 0; $i < 50; $i++) {
            $this->rankingService->castVote($user);
        }

        return Redirect::back()->with('success', 'Cast 50 votes! +1 Level.');
    }
}
