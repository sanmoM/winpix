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

    public function declearWinner($questId)
    {
        $images = QuestImage::select('quest_images.id', 'quest_images.quest_id', 'quest_images.image', 'quest_images.user_id', 'quest_images.camera_brand', 'quest_images.camera_model', 'quest_images.lens', 'quest_images.focal_length', 'quest_images.aperture', 'quest_images.shutter_speed', 'quest_images.iso', 'quest_images.date_captured', 'quest_images.created_at', 'quest_images.updated_at')
            ->selectRaw('
        SUM(CASE WHEN users.role = "jury" THEN votes.score ELSE 0 END) AS jury_score,
        SUM(CASE WHEN users.role = "user" THEN votes.score ELSE 0 END) AS user_score,
        SUM(votes.score) AS total_score
    ')
            ->leftJoin('votes', 'votes.image_id', '=', 'quest_images.id')
            ->leftJoin('users', 'users.id', '=', 'votes.user_id')
            ->where('quest_images.quest_id', $questId)
            ->groupBy('quest_images.id', 'quest_images.quest_id', 'quest_images.image', 'quest_images.user_id', 'quest_images.camera_brand', 'quest_images.camera_model', 'quest_images.lens', 'quest_images.focal_length', 'quest_images.aperture', 'quest_images.shutter_speed', 'quest_images.iso', 'quest_images.date_captured', 'quest_images.created_at', 'quest_images.updated_at')
            ->orderByDesc('total_score')
            ->get();

        return Inertia::render('Jury/lead-contests/declear-winner', [
            'images' => $images,
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

        Vote::create([
            'user_id' => auth()->user()->id,
            'image_id' => $request->image_id,
            'quest_id' => $request->quest_id,
            'score' => $request->score,
            'skip' => null,
        ]);

        return redirect()->back();
    }

    public function showContestScore($questId)
    {
        $userId = auth()->user()->id;

        $showContestScores = Vote::with(['user:id,name', 'quest:id,title_en', 'image'])->where('user_id', $userId)->where('quest_id', $questId)->get();

        return Inertia::render('Jury/contest-pannel/view-score', [
            'showContestScores' => $showContestScores,
        ]);
    }

    public function allJudgeContestScore($questId)
    {
        $showAllContestScores = QuestImage::with(['user:id,name', 'quest:id,title_en', 'vote'])->where('quest_id', $questId)->get();

        return Inertia::render('Jury/contest-pannel/view-score', [
            'showAllContestScores' => $showAllContestScores,
        ]);
    }

    public function leadJudgeScoreView($imageId)
    {
        $image = QuestImage::findOrFail($imageId);
        $vote = Vote::where('image_id', $imageId)->where('user_id', auth()->id())->first();
        return Inertia::render('Jury/lead-contests/lead-judge-score', [
            'image' => $image,
            'vote' => $vote,
        ]);
    }

    public function leadJudgeScore(Request $request)
    {
        $request->validate([
            'image_id' => 'required|exists:quest_images,id',
            'quest_id' => 'required|exists:quests,id',
            'score' => 'required|numeric',
        ]);

        $image = QuestImage::findOrFail($request->image_id);

        // If image owner → update image score
        if ($image->user_id === auth()->id()) {
            $image->update([
                'score' => $request->score,
            ]);

            return back();
        }

        // Otherwise → update or create vote
        Vote::updateOrCreate(
            [
                'user_id' => auth()->id(),
                'image_id' => $image->id,
            ],
            [
                'quest_id' => $request->quest_id,
                'score' => $request->score,
                'skip' => false,
            ]
        );

        return back();
    }
}
