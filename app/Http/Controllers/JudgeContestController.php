<?php

namespace App\Http\Controllers;

use App\Models\JudgePanel;
use App\Models\Quest;
use App\Models\QuestImage;
use App\Models\Vote;
use Inertia\Inertia;
use Request;

class JudgeContestController extends Controller
{
    public function index()
    {

        $panel = JudgePanel::where('user_id', auth()->user()->id)->with('user')->with('quest')->orderBy('id', 'desc')->get();

        return Inertia::render('Jury/Contest/Index', [
            'panel' => $panel,
        ]);

    }

    public function leadJudge()
    {

        return $panel = Quest::where('lead_judge', auth()->user()->id)->orderBy('id', 'desc')->get();

        return Inertia::render('Jury/Contest/Index', [
            'panel' => $panel,
        ]);

    }

    public function scoreContest($questId)
    {
        // return dd($questId);
        $questImages = QuestImage::where('quest_id', $questId)->get();
        return Inertia::render('Jury/Contest/score-contest', [
            'questImages' => $questImages,
        ]);
    }

    public function vote(Request $request)
    {
        Vote::create([
            'user_id' => auth()->user()->id,
            'quest_image_id' => $request->image_id,
            'quest_id' => $request->quest_id,
            'score' => $request->score,
        ]);

        return redirect()->back();
    }
}
