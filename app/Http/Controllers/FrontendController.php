<?php

namespace App\Http\Controllers;

use App\Models\About;
use App\Models\Follower;
use App\Models\Help;
use App\Models\Quest;
use App\Models\QuestImage;
use App\Models\QuestJoin;
use App\Models\Redeem;
use App\Models\Series;
use App\Models\Slider;
use App\Models\Store;
use App\Models\Vote;
use App\Services\RankingService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class FrontendController extends Controller
{
    protected $rankingService;

    public function __construct()
    {
        $this->rankingService = new RankingService();
    }
    // this all are get controller for frontend
    public function home()
    {
        $sliders = Slider::all();
        $new_quest = Quest::with(['category', 'user'])->where('status', 'active')->orderBy('created_at', 'desc')->take(8)->get();
        $topImages = Vote::select('image_id')
            ->selectRaw('count(*) as total_votes')
            ->groupBy('image_id')
            ->orderByDesc('total_votes')
            ->take(10)
            ->with(['image.user', 'image.quest'])
            ->get();

        return Inertia::render('home', [
            'sliders' => $sliders,
            'new_quest' => $new_quest,
            'galleryImages' => $topImages,
        ]);
    }

    public function brandMarketing()
    {
        return Inertia::render('brand-marketing');
    }

    public function store()
    {
        $coinsPricing = Store::all();

        return Inertia::render('store', [
            'coinsPricing' => $coinsPricing,
        ]);
    }

    public function redeem()
    {
        $coinsPricing = Redeem::all();

        return Inertia::render('redeem', [
            'prizes' => $coinsPricing,
        ]);
    }

    public function activeQuests()
    {
        $series = Series::with('quests.user', 'quests.category', 'user')->get();
        $quests = Quest::with(['category', 'user'])->where('status', 'active')->orderBy('created_at', 'desc')->take(5)->get();
        

        return Inertia::render('quests/active-quests', [
            'series' => $series,
            'quests' => $quests,

        ]);
    }

    public function singleQuest($id)
    {
        $userId = auth()->user()->id;
        $joinedQuests = QuestJoin::with(['user'])->where('user_id', $userId)->get();
        $quest = Quest::with(['category', 'user', 'prizes', 'images'])->findOrFail($id);
        $votes = Vote::where('user_id', $userId)->get();
        $allItems = QuestImage::with(['user', 'quest.category', 'quest.user'])->get();
        $isFollowing = Follower::where('follower_id', auth()->user()->id)->where('followed_id', $quest->user->id)->exists();

        return Inertia::render('quests/single-quest', [
            'id' => $id,
            'quest' => $quest,
            'joinedQuests' => $joinedQuests,
            'votes' => $votes,
            'questImages' => $allItems,
            'isFollowing' => $isFollowing,
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
        $joinedQuests = QuestJoin::with(['quest', 'quest.user', 'quest.category'])->where('user_id', auth()->user()->id)->get();

        return Inertia::render('quests/entered-quests', [
            'enteredQuests' => $joinedQuests,
        ]);
    }

    public function endedQuests()
    {
        $user = auth()->user();
        $userId = $user->id;
        $myQuests = Quest::with(['category', 'user'])
            ->where('user_id', $userId)
            ->where('end_date', '<', Carbon::now())
            ->orderBy('created_at', 'desc')
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
        $services = About::all();

        return Inertia::render('about-us', [
            'services' => $services,
        ]);
    }

    public function endedSingleQuest($id)
    {
        return Inertia::render('quests/ended-single-quest', ['id' => $id]);
    }

    public function allHelpCategories()
    {
        $helpCategories = Help::all();
        // return dd($helpCategories);
        return Inertia::render('help/all-help-categories', [
            'helpCategories' => $helpCategories,
        ]);
    }

    public function singleCategoryHelps($section)
    {
        $helps = Help::where('section', $section)->get();
        return Inertia::render('help/single-category-helps', [
            'helps' => $helps,
        ]);
    }

    public function singleFaq($group_id, $section)
    {
        $faqs = Help::where('section', $section)->get();
        return Inertia::render('help/single-faq', [
            'faqs' => $faqs,
            'section' => $section,
            'group_id' => $group_id,
        ]);
    }

    public function searchedHelps()
    {
        $searchTerm = request()->query('searchTerm');
        $helps = Help::where('question', 'LIKE', '%' . $searchTerm . '%')
            ->orWhere('answer', 'LIKE', '%' . $searchTerm . '%')
            ->get();
        return Inertia::render('help/searched-helps', [
            'helps' => $helps,
        ]);
    }

    public function contactUs()
    {
        return Inertia::render('contact-us');
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
        QuestJoin::firstOrCreate(
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

        $isJoinedNow = QuestJoin::where('quest_id', $id)->where('user_id', $user->id)->exists();
        if ($isJoinedNow) {
            $this->rankingService->joinContest($user);
        }

        $user->decrement('pixel', $questFromDb->entry_coin);

        return redirect()->back()->with('success', 'Join Quest Successfully');
    }

    public function vote($imageId, $questId)
    {
        $user = auth()->user();

        // return response()->json(['user' => $userUnderImage->user], 200);
        Vote::firstOrCreate([
            'image_id' => $imageId,
            'user_id' => $user->id,
            'quest_id' => $questId,
        ]);

        $userUnderImage = QuestImage::where('id', $imageId)->where('user_id', $user->id)->first();
        $this->rankingService->castVote($userUnderImage->user);
        return response()->json(['success' => true]);
    }

    public function followUser(Request $request)
    {
        $user = auth()->user();
        $isAlreadyFollowing = Follower::where('follower_id', $user->id)->where('followed_id', $request->followed_id)->exists();
        if (auth()->user()->id === $request->followed_id) {
            // Prevent users from following themselves
            return;
        }
        if ($isAlreadyFollowing) {
            Follower::where('follower_id', $user->id)->where('followed_id', $request->followed_id)->delete();
        } else {
            Follower::firstOrCreate([
                'follower_id' => $user->id,
                'followed_id' => $request->followed_id,
            ]);
        }
    }
}
