<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Quest;
use App\Models\QuestImage;
use Inertia\Inertia;

class ContestWinnerController extends Controller
{
    public function adminContest()
    {

        $quests = Quest::where('winner_declaration', 'admin')->orderBy('id', 'desc')->get();

        return Inertia::render('Admin/DeclareWinner/index', [
            'quests' => $quests,
        ]);

    }

    public function adminJudgeContest()
    {

        $quests = Quest::where('winner_declaration', 'judges')->orderBy('id', 'desc')->get();

        return Inertia::render('Admin/DeclareWinner/index', [
            'quests' => $quests,
        ]);

    }

    public function adminAutoContest()
    {

        $quests = Quest::where('winner_declaration', 'auto')->orderBy('id', 'desc')->get();

        return Inertia::render('Admin/DeclareWinner/index', [
            'quests' => $quests,
        ]);

    }

    public function adminDeclareContestWinner($questId)
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

        return Inertia::render('Admin/DeclareWinner/declear-winner', [
            'images' => $images,
        ]);

    }
}
