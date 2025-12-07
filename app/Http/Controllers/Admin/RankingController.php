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

    public function winContest(Request $request)
    {
        $this->rankingService->winContest($request->user());
        return Redirect::back()->with('success', 'Won contest! +5 Levels.');
    }

    public function castVote(Request $request)
    {
        $user = $request->user();

        for ($i = 0; $i < 50; $i++) {
            $this->rankingService->castVote($user);
        }

        return Redirect::back()->with('success', 'Cast 50 votes! +1 Level.');
    }
}
