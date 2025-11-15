<?php

namespace App\Http\Controllers;

use App\Models\Quest;
use App\Models\QuestImage;
use App\Models\Vote;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DiscoverController extends Controller
{
    public function discover()
    {
        $new_quest = Quest::with(["category", "user"])->where('status', 'active')->orderBy("created_at", 'desc')->take(8)->get();
        $topImages = Vote::select('image_id')
            ->selectRaw('count(*) as total_votes')   // count votes per image
            ->groupBy('image_id')                    // group by image
            ->orderByDesc('total_votes')             // most votes first
            ->take(10)                               // top 10
            ->with(['image.user', 'image.quest'])    // eager load image, its user, and quest
            ->get();
        return Inertia::render('discover', [
            'quests' => $new_quest,
            'galleryImages' => $topImages,
        ]);
    }
}
