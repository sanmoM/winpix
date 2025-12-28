<?php

namespace App\Http\Controllers;

use App\Models\JudgePanel;
use App\Models\Quest;
use App\Models\QuestImage;
use App\Models\Vote;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JudgeContestController extends Controller
{
    public function index()
    {

        $panel = JudgePanel::where('user_id', auth()->user()->id)->with('user')->with('quest')->orderBy('id', 'desc')->get();

        return Inertia::render('Jury/contest-pannel/index', [
            'panel' => $panel,
        ]);

    }

    public function leadJudge()
    {

        $quests = Quest::where('lead_judge', auth()->user()->id)->orderBy('id', 'desc')->get();

        return Inertia::render('Jury/lead-contests/index', [
            'quests' => $quests,
        ]);

    }

    public function scoreContest($questId)
    {
        // return dd($questId);
        $userId = auth()->user()->id;
        $imagesNotVoted = QuestImage::where('quest_id', $questId)
            ->whereDoesntHave('vote', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->get();
        return Inertia::render('Jury/contest-pannel/score-contest', [
            'questImages' => $imagesNotVoted,
        ]);
    }

    public function vote(Request $request)
    {
        $request->validate([
            'image_id' => 'required',
            'quest_id' => 'required',
            'score' => 'required',
        ]);

        // return dd($request->all());

        Vote::create([
            'user_id' => auth()->user()->id,
            'image_id' => $request->image_id,
            'quest_id' => $request->quest_id,
            'score' => $request->score,
            'skip' => null,
        ]);

        return redirect()->back();
    }
}
