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
        $galleryImages = QuestImage::with(["user", "quest.category", "quest.user"])->orderBy('vote_count', 'desc')->take(value: 20)->get();
        // dd("hellow");
        return Inertia::render('discover', [
            'quests' => $new_quest,
            'galleryImages' => $galleryImages,
        ]);
    }
}
