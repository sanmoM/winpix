<?php

namespace App\Http\Controllers;

use App\Helpers\QuestFilter;
use App\Models\About;
use App\Models\BrandMarketing;
use App\Models\Contact;
use App\Models\Follower;
use App\Models\Help;
use App\Models\JudgePanel;
use App\Models\MarketingBanner;
use App\Models\Other;
use App\Models\Quest;
use App\Models\QuestCategory;
use App\Models\QuestImage;
use App\Models\QuestJoin;
use App\Models\QuestType;
use App\Models\Redeem;
use App\Models\Report;
use App\Models\Series;
use App\Models\Slider;
use App\Models\Store;
use App\Models\Transaction;
use App\Models\User;
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
        $this->rankingService = new RankingService;
    }

    // this all are get controller for frontend
    public function home()
    {
        $user = auth()->user();
        $sliders = Slider::all();
        $new_quest = Quest::with(['category', 'user', 'prizes.prize_pool'])
            ->where(function ($query) {
                $query->where('manual_override', 'Force_Open')
                    ->orWhere(function ($q) {
                        $q->whereDate('start_date', '<=', today())
                            ->whereDate('end_date', '>=', today())
                            ->where('manual_override', 'None');
                    });
            })
            ->orderBy('created_at', 'desc')
            ->take(8)
            ->get();

        $topImages = Vote::select('image_id')
            ->selectRaw('COUNT(*) as total_votes')
            ->whereHas('image', function ($query) {
                $query->whereNull('skip');
            })
            ->groupBy('image_id')
            ->orderByDesc('total_votes')
            ->take(10)
            ->with(['image.user', 'image.quest'])
            ->get();
        if ($user) {
            return redirect('/discover');
        }

        return Inertia::render('home', [
            'sliders' => $sliders,
            'new_quest' => $new_quest,
            'galleryImages' => $topImages,
        ]);
    }

    public function brandMarketing()
    {
        $banner = MarketingBanner::first();
        $features = BrandMarketing::all();

        return Inertia::render('brand-marketing', [
            'banner' => $banner,
            'features' => $features,
        ]);
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
        $queryParams = request()->query();

        $filter = $queryParams['filter'] ?? 'discover';
        $questType = $queryParams['questType'] ?? null;
        $category = $queryParams['category'] ?? null;
        $isFree = $queryParams['isFree'] ?? null;
        $rank = $queryParams['rank'] ?? null;
        $sort = $queryParams['sort'] ?? null;

        // Static data
        $series = Series::with('quests.user', 'quests.category', 'user')->get();
        $categories = QuestCategory::all();
        $questTypes = QuestType::all();

        // Initialize base query
        QuestFilter::init()
            ->filter($filter)
            ->sort($sort);

        if ($category) {
            QuestFilter::query()->where('category_id', $category);
        }

        if ($questType) {
            QuestFilter::query()->where('quest_type_id', $questType);
        }

        if ($isFree) {
            QuestFilter::query()->where(
                'entry_coin',
                $isFree === 'true' ? 0 : '>'
            );
        }

        if ($rank && $rank !== 'All') {
            QuestFilter::query()->where('rank_tier', $rank);
        }

        // Fetch finally
        $quests = QuestFilter::query()->get();
        $allQuests = Quest::where('start_date', '<=', today())->where('end_date', '>=', today())->get();

        return Inertia::render('quests/active-quests', [
            'series' => $filter === 'discover' ? $series : [],
            'quests' => $quests,
            'categories' => $categories,
            'questTypes' => $questTypes,
            'allQuests' => $allQuests,
        ]);
    }

    public function imageHistory($id)
    {
        $questImage = QuestImage::findOrFail($id);

        $imagePath = $questImage->image;

        // Active quests
        $activeQuest = Quest::with('category', 'user')
            ->where('id', $questImage->quest_id)
            ->where('start_date', '<=', today())
            ->where('end_date', '>=', today())
            ->get();

        // Ended quests (can be 1 or many)
        $endedQuests = Quest::where('id', $questImage->quest_id)
            ->where('end_date', '<=', today())
            ->get();

        // Add position for each ended quest
        $endedQuests->transform(function ($quest) use ($questImage) {

            // Get all images of THIS quest sorted by votes
            $images = QuestImage::where('quest_id', $quest->id)
                ->orderBy('vote_count', 'DESC')
                ->get();

            // Calculate position of THIS image inside THIS quest
            $position = $images->pluck('id')->search($questImage->id) + 1;

            // Dynamically add position
            $quest->position = $position;

            return $quest;
        });

        return [
            'image_path' => $imagePath,
            'active_quest' => $activeQuest,
            'ended_quest' => $endedQuests,
        ];
    }

    public function imageView($id)
    {
        $data = QuestImage::with(['user'])->findOrFail($id);

        return Inertia::render('image-view', [
            'data' => $data,
        ]);
    }

    public function singleQuest($id)
    {
        $userId = auth()->user()->id;
        $joinedQuests = QuestJoin::with(['user'])->where('user_id', $userId)->get();
        $quest = Quest::with(['category', 'user', 'prizes.prize_pool', 'images', 'quest_type'])->findOrFail($id);
        $votes = Vote::where('user_id', $userId)->where('quest_id', $id)->get();
        $questImages = QuestImage::with(['user', 'quest.category', 'quest.user'])
            ->where('quest_id', $id)  // filter only for this quest
            ->get();
        $isFollowing = Follower::where('follower_id', auth()->user()->id)->where('followed_id', $quest->user->id)->exists();

        $userUploadedImages = QuestImage::where('user_id', $userId)->get();

        $isUserInJudgePanel = JudgePanel::where('quest_id', $quest->id)->where('user_id', $userId)->exists();

        return Inertia::render('quests/single-quest', [
            'id' => $id,
            'quest' => $quest,
            'joinedQuests' => $joinedQuests,
            'votes' => $votes,
            'questImages' => $questImages,
            'isFollowing' => $isFollowing,
            'userUploadedImages' => $userUploadedImages,
            'isUserInJudgePanel' => $isUserInJudgePanel,
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
        $series = Series::with([
            'user',
            'quests.user',
            'quests.category',
            'quests.images.user',
            'quests.prizes.prize_pool',
        ])
            ->findOrFail($id);   // get only ONE series

        // Add totals
        $series = [
            ...$series->toArray(),
            'total_quests' => $series->total_quests,
            'total_images' => $series->total_images,
            'total_coins' => $series->total_coins,
        ];

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

    public function endedQuests($userId)
    {
        $runningQuests = Quest::with(['category', 'user', 'prizes.prize_pool'])
            ->where('user_id', $userId)
            ->where('status', '!=', 'Closed') // fetch quests NOT Closed
            ->orderBy('created_at', 'desc')
            ->get();
        $endedQuests = Quest::with(['category', 'user', "prizes.prize_pool"])
            ->where('user_id', $userId)
            ->where('status', 'Closed')
            ->orderBy('created_at', 'desc')
            ->get();
        // $recentlyEnded = $recentlyEnded = Quest::with(['category', 'user'])
        //     ->whereDate('end_date', Carbon::yesterday())
        //     ->orderBy('end_date', 'desc')
        //     ->get();
        $inactiveSeries = Series::with('quests.user', 'quests.category', 'user')->where('status', 'inactive')->get();

        return Inertia::render('quests/ended-quests', [
            'runningQuests' => $runningQuests,
            'endedQuests' => $endedQuests,
            'inactiveSeries' => $inactiveSeries,
        ]);
    }

    public function profile($id)
    {
        $isFollowing = Follower::where('follower_id', auth()->user()->id)->where('followed_id', $id)->exists();

        $user = User::with(['questImages', 'votes.image', 'joinedQuests', 'followers', 'following'])->findOrFail($id);

        $stats = [
            'totalQuests' => $user->joinedQuests()->count(),
            'totalVotes' => $user->votes()->count(),
            'currentLevel' => $user->level,
            'followers' => $user->followers()->count(),
            'following' => $user->following()->count(),
            'questImages' => $user->questImages,
            'likedImages' => $user->votes->pluck('image'),
            'rank' => RankingService::getRank($user->level),
        ];

        return Inertia::render('profile', [
            'user' => $user,
            'stats' => $stats,
            'isFollowing' => $isFollowing,
        ]);
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

    public function joinQuest(Request $request, $id)
    {
        $user = auth()->user();
        try {
            $request->validate([
                'quest_id' => 'required|integer|exists:quests,id',
                'image' => 'required',
                'camera_brand' => 'required',
                'camera_model' => 'required',
                'lens' => 'required',
                'focal_length' => 'required',
                'aperture' => 'required',
                'shutter_speed' => 'required',
                'iso' => 'required',
                'date_captured' => 'required',
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
            'camera_brand' => $request->camera_brand,
            'camera_model' => $request->camera_model,
            'lens' => $request->lens,
            'focal_length' => $request->focal_length,
            'aperture' => $request->aperture,
            'shutter_speed' => $request->shutter_speed,
            'iso' => $request->iso,
            'date_captured' => $request->date_captured,
        ]);

        $isJoinedNow = QuestJoin::where('quest_id', $id)->where('user_id', $user->id)->exists();
        if ($isJoinedNow) {
            $this->rankingService->joinContest($user);
        }

        $user->decrement('pixel', $questFromDb->entry_coin);

        $lastId = Transaction::max('transaction_id') ?? 1000000000;

        Transaction::create([
            'transaction_id' => $lastId + 1,
            'user_id' => $user->id,
            'transaction_type' => 'join_contest',
            'amount_type' => 'pixel',
            'amount' => $questFromDb->entry_coin,
        ]);

        return redirect()->back();
    }

    public function skipVote($imageId, $questId)
    {

        $user = auth()->user();
        $userId = $user->id;

        $quest = Quest::findOrFail($questId);

        if ($quest->vote_rights === 'Public') {
            abort_unless(($user->role === 'user'), 403);
        }

        if ($quest->vote_rights === 'Judges') {
            abort_unless(
                !($user->role === 'jury' &&
                    JudgePanel::where('quest_id', $quest->id)
                        ->where('user_id', $user->id)
                        ->exists()),
                403
            );
        }

        if ($quest->vote_rights === 'Hybrid') {
            abort_unless(
                (in_array($user->role, ['user', 'jury'])),
                403
            );
        }

        Vote::firstOrCreate([
            'user_id' => $userId,
            'quest_id' => $questId,
            'skip' => 2,
            'score' => 0,
        ]);

        return response()->json(['success' => true]);
    }

    public function vote($imageId, $questId)
    {
        $user = auth()->user();

        $quest = Quest::findOrFail($questId);
        $image = QuestImage::where('id', $imageId)
            ->where('quest_id', $questId)
            ->firstOrFail();

        if ($quest->vote_rights === 'Public') {
            abort_unless(($user->role === 'user'), 403);
        }

        if ($quest->vote_rights === 'Judges') {
            abort_unless(
                !($user->role === 'jury' &&
                    JudgePanel::where('quest_id', $quest->id)
                        ->where('user_id', $user->id)
                        ->exists()),
                403
            );
        }

        if ($quest->vote_rights === 'Hybrid') {
            abort_unless(
                (in_array($user->role, ['user', 'jury'])),
                403
            );
        }

        abort_unless($image->user_id !== $user->id, 403, 'You cannot vote your own submission');

        Vote::firstOrCreate([
            'image_id' => $imageId,
            'user_id' => $user->id,
            'quest_id' => $questId,
            'score' => 1,
        ]);

        $this->rankingService->castVote($image->user);

        return response()->json(['success' => true]);
    }

    public function followUser(Request $request)
    {
        $user = auth()->user();
        $isAlreadyFollowing = Follower::where('follower_id', $user->id)->where('followed_id', $request->followed_id)->exists();
        // return dd($request->followed_id);
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

    public function createContact(Request $request)
    {
        $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email',
            'message' => 'required',
        ]);

        $contact = new Contact([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'message' => $request->message,
        ]);

        $contact->save();

        return redirect()->back()->with('success', 'Contact form submitted successfully!');
    }

    public function handlePayment(Request $request)
    {
        $request->validate([
            'coin_id' => 'required',
        ]);

        $userId = auth()->user()->id;

        $storeItem = Store::findOrFail($request->coin_id);

        User::findOrFail($userId)->increment('pixel', $storeItem->number_of_coin);
        Transaction::create([
            'user_id' => $userId,
            'transaction_type' => 'Pixel',
            'amount' => $storeItem->number_of_coin,
            'payment_method' => 'Paypal',
            'currency' => 'USD',
            'date' => now(),
        ]);

        return redirect()->back()->with('success', 'Contact form submitted successfully!');
    }

    public function claim(Request $request)
    {

        $userId = auth()->user()->id;
        $user = User::findOrFail($userId);

        $user->increment('pixel', 15);

        $user->update([
            'isRedeemed' => 1,
        ]);

        $lastId = Transaction::max('transaction_id') ?? 1000000000;

        Transaction::create([
            'transaction_id' => $lastId + 1,
            'user_id' => $userId,
            'transaction_type' => 'claim',
            'amount_type' => 'pixel',
            'amount' => 15,
        ]);

        return redirect()->back()->with('success', 'Contact form submitted successfully!');
    }

    public function report()
    {
        $validated = request()->validate([
            'image_id' => 'required|integer|exists:quest_images,id',
            'reason' => 'required',
        ]);

        Report::create([
            'image_id' => $validated['image_id'],
            'reason' => $validated['reason'],
        ]);

        return redirect()->back()->with('success', 'Contact form submitted successfully!');
    }

    public function addPixel(Request $request)
    {
        $request->validate([
            'quantity' => 'required',
            'coinQuantity' => 'required',
        ]);

        $userId = auth()->user()->id;

        User::findOrFail($userId)->increment('pixel', $request->quantity);
        User::findOrFail($userId)->decrement('coin', $request->coinQuantity);

        return redirect()->back()->with('success', 'Contact form submitted successfully!');
    }

    public function addCash(Request $request)
    {
        $request->validate([
            'quantity' => 'required',
            'coinQuantity' => 'required',
        ]);

        $userId = auth()->user()->id;

        User::findOrFail($userId)->increment('cash', $request->quantity);
        User::findOrFail($userId)->decrement('coin', $request->coinQuantity);

        return redirect()->back()->with('success', 'Contact form submitted successfully!');
    }

    public function redeemDigitalProduct(Request $request)
    {
        $request->validate([
            'quantity' => 'required',
            'coinQuantity' => 'required',
            'prizeId' => 'required',
        ]);

        $userId = auth()->user()->id;
        Transaction::create([
            'user_id' => $userId,
            'transaction_type' => 'redeem',
            'reference_id' => $request->prizeId,
            'amount' => $request->coinQuantity,
            'amount_type' => 'V-Coin',
        ]);
        User::findOrFail($userId)->decrement('coin', $request->coinQuantity);

        return redirect()->back()->with('success', 'Contact form submitted successfully!');
    }

    public function settings()
    {
        $settings = Other::first();

        return response()->json($settings);

    }

    public function successPayment()
    {
        return Inertia::render('success-payment');
    }
}
