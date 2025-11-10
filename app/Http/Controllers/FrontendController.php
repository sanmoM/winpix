<?php

namespace App\Http\Controllers;

use App\Models\Quest;
use App\Models\Redeem;
use App\Models\Slider;
use App\Models\Store;
use Inertia\Inertia;

class FrontendController extends Controller
{
    public function home()
    {
        $sliders = Slider::all();
        $new_quest = Quest::with(["category", "user"])->where('status', 'active')->orderBy("created_at", 'desc')->take(8)->get();
        // $user = auth()->user();
        // if ($user) {
        //     return redirect("/discover");
        // }
        return Inertia::render('home', [
            'sliders' => $sliders,
            'new_quest' => $new_quest,
        ]);
    }

    public function store()
    {
        $coinsPricing = Store::all();
        return Inertia::render('store', [
            'coinsPricing' => $coinsPricing
        ]);
    }

    public function redeem()
    {
        $coinsPricing = Redeem::all();
        return Inertia::render('redeem', [
            'prizes' => $coinsPricing
        ]);
    }

    public function activeQuests()
    {
        return Inertia::render('quests/active-quests');
    }

    public function singleQuest($id)
    {
        $quest = Quest::with(['category', 'user'])->findOrFail($id);
        // return dd($quest);
        return Inertia::render('quests/single-quest', ['id' => $id, "quest" => $quest]);
    }

    public function questSeries()
    {
        return Inertia::render('quests/quest-series');
    }

    public function singleQuestSeries()
    {
        return Inertia::render('quests/single-quest-series');
    }

    public function enteredQuests()
    {
        return Inertia::render('quests/entered-quests');
    }

    public function endedQuests()
    {
        return Inertia::render('quests/ended-quests');
    }
    public function profile()
    {
        return Inertia::render('profile');
    }
    public function aboutUs()
    {
        return Inertia::render('about-us');
    }

    public function endedSingleQuest($id)
    {
        return Inertia::render('quests/ended-single-quest', ['id' => $id]);
    }

    public function allHelpCategories()
    {
        return Inertia::render('help/all-help-categories');
    }

    public function singleCategoryHelps()
    {
        return Inertia::render('help/single-category-helps');
    }

    public function singleFaq()
    {
        return Inertia::render('help/single-faq');
    }

    public function searchedHelps()
    {
        return Inertia::render('help/searched-helps');
    }
}
