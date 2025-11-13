<?php

namespace App\Http\Controllers;

use App\Models\Quest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DiscoverController extends Controller
{
    public function discover()
    {
        $quests = Quest::where('status', '=', 'active')->with("category", "user")->get()->take(8);
        return Inertia::render('discover', [
            'quests' => $quests
        ]);
    }
}
