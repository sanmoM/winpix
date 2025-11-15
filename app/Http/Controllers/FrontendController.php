<?php

namespace App\Http\Controllers;

use App\Models\Quest;
use App\Models\QuestImage;
use App\Models\QuestJoin;
use App\Models\Redeem;
use App\Models\Series;
use App\Models\Slider;
use App\Models\Store;
use App\Models\Vote;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class FrontendController extends Controller
{

    // this all are get controller for frontend
    public function home()
    {
        $sliders = Slider::all();
        $new_quest = Quest::with(["category", "user"])->where('status', 'active')->orderBy("created_at", 'desc')->take(8)->get();
        $topImages = Vote::select('image_id')
            ->selectRaw('count(*) as total_votes')   // count votes per image
            ->groupBy('image_id')                    // group by image
            ->orderByDesc('total_votes')             // most votes first
            ->take(10)                               // top 10
            ->with(['image.user', 'image.quest'])    // eager load image, its user, and quest
            ->get();
        return Inertia::render('home', [
            'sliders' => $sliders,
            'new_quest' => $new_quest,
            'galleryImages' => $topImages,
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
        $series = Series::with('quests.user', 'quests.category', 'user')->get();
        $quests = Quest::with(['category', 'user'])->where('status', 'active')->orderBy("created_at", 'desc')->take(5)->get();
        return Inertia::render('quests/active-quests', [
            'series' => $series,
            'quests' => $quests,
        ]);
    }

    public function singleQuest($id)
    {
        $userId = auth()->user()->id;
        $joinedQuests = QuestJoin::with(['user'])->where('user_id', $userId)->get();
        $quest = Quest::with(['category', 'user', 'prizes', "images"])->findOrFail($id);
        $votes = Vote::where('user_id', $userId)->get();
        $allItems = QuestImage::with(['user', 'quest.category', 'quest.user'])->get();
        return Inertia::render('quests/single-quest', [
            'id' => $id,
            "quest" => $quest,
            "joinedQuests" => $joinedQuests,
            "votes" => $votes,
            'questImages' => $allItems,
        ]);
    }

    public function questSeries()
    {
        $series = Series::with('quests.user', 'quests.category', 'user')->get();
        return Inertia::render('quests/quest-series', [
            'series' => $series,
        ]);
    }

    public function singleQuestSeries($id)
    {
        $series = Series::with('quests.user', 'quests.category')->findOrFail($id);
        return Inertia::render('quests/single-quest-series', [
            'series' => $series,
        ]);
    }

    public function enteredQuests()
    {
        $joinedQuests = QuestJoin::with(["quest", "quest.user", "quest.category"])->where('user_id', auth()->user()->id)->get();
        return Inertia::render('quests/entered-quests', [
            'enteredQuests' => $joinedQuests,
        ]);
    }

    public function endedQuests()
    {
        $user = auth()->user();
        $userId = $user->id;
        $myQuests = Quest::with(["category", "user"])
            ->where('user_id', $userId)
            ->where('end_date', '<', Carbon::now())
            ->orderBy("created_at", 'desc')
            ->get();
        $recentlyEnded = Quest::with(['category', 'user'])
            ->where('end_date', '<', Carbon::now())
            ->orderBy('end_date', 'desc')
            ->take(10)
            ->get();
        $inactiveSeries = Series::with('quests.user', 'quests.category', 'user')->get();

        return Inertia::render('quests/ended-quests', [
            'myQuests' => $myQuests,
            'recentlyEnded' => $recentlyEnded,
            'inactiveSeries' => $inactiveSeries,
        ]);
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


    // this all are the functional controller for handle user interaction
    public function joinQuest(Request $request, $id)
    {
        $user = auth()->user();
        try {
            $request->validate([
                'quest_id' => 'required|integer|exists:quests,id',
                'image' => 'required',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        }

        // Handle uploaded image
        $image = null;
        if ($request->hasFile('image')) {
            $image = $request->file('image')->store('uploads/quests', 'public');
        } else {
            $image = $request->image;
        }

        $questFromDb = Quest::findOrFail($id);

        // Deduct user's pixels only if they haven't joined before
        $questJoin = QuestJoin::firstOrCreate(
            [
                'quest_id' => $id,
                'user_id' => $user->id,
            ]
        );

        QuestImage::create([
            'quest_id' => $id,
            'image' => $image,
            'user_id' => $user->id,
        ]);

        $user->decrement('pixel', $questFromDb->entry_coin);

        return redirect()->back()->with('success', 'Join Quest Successfully');
    }

    public function vote($imageId, $questId)
    {
        $user = auth()->user();
        Vote::firstOrCreate([
            'image_id' => $imageId,
            'user_id' => $user->id,
            'quest_id' => $questId,
        ]);

        return response()->json(['success' => true]);
    }
}
