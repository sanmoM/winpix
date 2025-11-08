<?php

namespace App\Http\Controllers;

use App\Models\Slider;
use Inertia\Inertia;

class FrontendController extends Controller
{
    public function home()
    {
        $sliders = Slider::all();
        $user = auth()->user();
        // if ($user) {
        //     return redirect("/discover");
        // }
        return Inertia::render('home', [
            'sliders' => $sliders
        ]);
    }

    public function store()
    {
        return Inertia::render('store');
    }

    public function redeem()
    {
        return Inertia::render('redeem');
    }

    public function activeQuests()
    {
        return Inertia::render('quests/active-quests');
    }

    public function singleQuest($id)
    {
        return Inertia::render('quests/single-quest', ['id' => $id]);
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

    public function createQuest()
    {
        return Inertia::render('create-quest');
    }
}
