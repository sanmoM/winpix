<?php

namespace App\Http\Controllers;

use App\Models\Quest;
use App\Models\QuestImage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DiscoverController extends Controller
{
    public function discover()
    {
        $new_quest = Quest::with(["category", "user"])->where('status', 'active')->orderBy("created_at", 'desc')->take(8)->get();
        $galleryImages = QuestImage::with(["quest_join.user", "quest_join.quest.category", "quest_join.quest.user"])->orderBy('vote_count', 'desc')->take(value: 20)->get();
        return Inertia::render('discover', [
            'quests' => $new_quest,
            'galleryImages' => $galleryImages,
        ]);
    }
}
