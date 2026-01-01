<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContestWinner;
use App\Models\Transaction;
use App\Models\Prize;
use App\Models\Quest;
use App\Models\QuestImage;
use App\Models\User;
use App\Models\Vote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ContestWinnerController extends Controller
{
    public function adminContest()
    {

        $quests = Quest::where('winner_declaration', 'admin')->orderBy('id', 'desc')->paginate(10)->withQueryString();

        return Inertia::render('Admin/DeclareWinner/index', [
            'quests' => $quests,
        ]);

    }

    public function adminJudgeContest()
    {

        $quests = Quest::where('winner_declaration', 'judges')->orderBy('id', 'desc')->paginate(10)->withQueryString();

        return Inertia::render('Admin/DeclareWinner/judge-index', [
            'quests' => $quests,
        ]);

    }

    public function adminAutoContest()
    {

        $quests = Quest::where('winner_declaration', 'auto')->orderBy('id', 'desc')->paginate(10)->withQueryString();

        return Inertia::render('Admin/DeclareWinner/auto-index', [
            'quests' => $quests,
        ]);

    }

    public function adminDeclareContestWinner($questId)
    {
        $images = QuestImage::with('quest:id,title_en,end_date,winner_status,lead_judge')->select('quest_images.id', 'quest_images.quest_id', 'quest_images.image', 'quest_images.user_id', 'quest_images.camera_brand', 'quest_images.camera_model', 'quest_images.lens', 'quest_images.focal_length', 'quest_images.aperture', 'quest_images.shutter_speed', 'quest_images.iso', 'quest_images.date_captured', 'quest_images.created_at', 'quest_images.updated_at')
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

        $totalPrizes = Prize::where('quest_id', $questId)
            ->get()
            ->sum(function ($prize) {
                return $prize->max - $prize->min + 1;
            });

        return Inertia::render('Admin/DeclareWinner/declear-winner', [
            'images' => $images,
            'totalPrizes' => $totalPrizes,
        ]);

    }

    public function judgeDeclareContestWinner($questId)
    {
        $images = QuestImage::with('quest:id,title_en,end_date,lead_judge,winner_status')
            ->select(
                'quest_images.id',
                'quest_images.quest_id',
                'quest_images.image',
                'quest_images.user_id',
                'quest_images.camera_brand',
                'quest_images.camera_model',
                'quest_images.lens',
                'quest_images.focal_length',
                'quest_images.aperture',
                'quest_images.shutter_speed',
                'quest_images.iso',
                'quest_images.date_captured',
                'quest_images.created_at',
                'quest_images.updated_at'
            )
            ->selectRaw('
        SUM(
            CASE
                WHEN votes.user_id = quests.lead_judge
                THEN votes.score
                ELSE 0
            END
        ) AS lead_judge_score,

        SUM(
            CASE
                WHEN users.role = "jury"
                 AND votes.user_id != quests.lead_judge
                THEN votes.score
                ELSE 0
            END
        ) AS jury_score,

        SUM(
            CASE
                WHEN users.role = "user"
                THEN votes.score
                ELSE 0
            END
        ) AS user_score,

        SUM(
            CASE
                WHEN users.role = "admin"
                THEN votes.score
                ELSE 0
            END
        ) AS admin_score,

        SUM(votes.score) AS total_score
    ')
            ->leftJoin('votes', 'votes.image_id', '=', 'quest_images.id')
            ->leftJoin('users', 'users.id', '=', 'votes.user_id')
            ->leftJoin('quests', 'quests.id', '=', 'quest_images.quest_id')
            ->where('quest_images.quest_id', $questId)
            ->groupBy(
                'quest_images.id',
                'quest_images.quest_id',
                'quest_images.image',
                'quest_images.user_id',
                'quest_images.camera_brand',
                'quest_images.camera_model',
                'quest_images.lens',
                'quest_images.focal_length',
                'quest_images.aperture',
                'quest_images.shutter_speed',
                'quest_images.iso',
                'quest_images.date_captured',
                'quest_images.created_at',
                'quest_images.updated_at',
                'quests.lead_judge'
            )
            ->orderByDesc('total_score')
            ->get();

        $totalPrizes = Prize::where('quest_id', $questId)
            ->get()
            ->sum(function ($prize) {
                return $prize->max - $prize->min + 1;
            });

        return Inertia::render('Admin/DeclareWinner/judge-declear-winner', [
            'images' => $images,
            'totalPrizes' => $totalPrizes,
        ]);
    }

    public function autoDeclareContestWinner($questId)
    {
        $images = QuestImage::with('quest:id,title_en,end_date,winner_status,lead_judge')->select('quest_images.id', 'quest_images.quest_id', 'quest_images.image', 'quest_images.user_id', 'quest_images.camera_brand', 'quest_images.camera_model', 'quest_images.lens', 'quest_images.focal_length', 'quest_images.aperture', 'quest_images.shutter_speed', 'quest_images.iso', 'quest_images.date_captured', 'quest_images.created_at', 'quest_images.updated_at')
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
            ->paginate(10)
            ->withQueryString();

        $totalPrizes = Prize::where('quest_id', $questId)
            ->get()
            ->sum(function ($prize) {
                return $prize->max - $prize->min + 1;
            });

        return Inertia::render('Admin/DeclareWinner/auto-declear-winner', [
            'images' => $images,
            'totalPrizes' => $totalPrizes,
        ]);

    }

    public function winnerStore(Request $request)
    {

        $request->validate([
            'items' => 'required|array',
            'items.*.quest_id' => 'required|integer',
            'items.*.image_id' => 'required|integer',
        ]);

        foreach ($request->items as $item) {
            ContestWinner::create([
                'quest_id' => $item['quest_id'],
                'image_id' => $item['image_id'],
                'user_vote' => $item['user_vote'],
                'jury_score' => $item['jury_score'],
                'total_score' => $item['total_score'],
                'rank' => $item['rank'],
                'submitted_by' => $item['submitted_by'],
            ]);
        }

        $quest = Quest::find($request->items[0]['quest_id']);
        $quest->winner_status = 'admin_approved';
        $quest->winner_approved_at = now();
        $quest->update();

        return back()->with('success', 'Winners declared successfully!');

    }

    public function adminScoreView($imageId)
    {
        $image = QuestImage::findOrFail($imageId);
        $vote = Vote::where('image_id', $imageId)->where('user_id', auth()->id())->first();

        return Inertia::render('Admin/DeclareWinner/change-score', [
            'image' => $image,
            'vote' => $vote,
        ]);
    }

    public function adminScore(Request $request)
    {
        $request->validate([
            'image_id' => 'required|exists:quest_images,id',
            'quest_id' => 'required|exists:quests,id',
            'score' => 'required|numeric',
        ]);

        $image = QuestImage::findOrFail($request->image_id);

        // If image owner → update image score
        if ($image->user_id === auth()->id()) {
            $image->update([
                'score' => $request->score,
            ]);

            return back();
        }

        // Otherwise → update or create vote
        Vote::updateOrCreate(
            [
                'user_id' => auth()->id(),
                'image_id' => $image->id,
            ],
            [
                'quest_id' => $request->quest_id,
                'score' => $request->score,
                'skip' => false,
            ]
        );

        return back();
    }

    public function distributePrizes($questId)
    {
        $quest = Quest::findOrFail($questId);

        // 2. Wrap in a transaction for safety
        DB::transaction(function () use ($quest) {

            $winners = ContestWinner::where('quest_id', $quest->id)->get();

            // Fetch prizes with their type (Coin, Pixel, Cash)
            $prizes = DB::table('prizes')
                ->join('prize_pools', 'prizes.prize_pool', '=', 'prize_pools.id')
                ->where('prizes.quest_id', $quest->id)
                ->select('prizes.*', 'prize_pools.name as type_name')
                ->get();

            foreach ($winners as $winner) {

                $matchedPrize = $prizes->first(function ($prize) use ($winner) {
                    return $winner->rank >= $prize->min && $winner->rank <= $prize->max;
                });

                if ($matchedPrize && $matchedPrize->coin > 0) {

                    $image = DB::table('quest_images')->find($winner->image_id);

                    if ($image) {
                        $user = User::find($image->user_id);
                        $amount = $matchedPrize->coin;
                        $type = strtolower($matchedPrize->type_name);

                        switch ($type) {
                            case 'coin':
                                $user->increment('coin', $amount);
                                break;
                            case 'pixel':
                                $user->increment('pixel', $amount);
                                break;
                            case 'cash':
                                $user->increment('cash', $amount);
                                break;
                        }


                        Transaction::create([
                            'user_id' => $user->id,
                            'reference_id' => $quest->id,
                            'transaction_type' => 'contest_prize',
                            'amount' => $amount,
                            'amount_type' => $type,
                            'currency' => $type,
                            'payment_method' => 'system',
                            'status' => 'completed',
                            'details' => json_encode([
                                'rank' => $winner->rank,
                                'quest_id' => $quest->id,
                                'prize_type' => $type
                            ]),
                        ]);


                    }
                }
            }

            $quest->update([
                'status' => 'Closed',
                'winner_approved_at' => now(),
            ]);

        });

        return redirect()->back()->with('success', 'Prizes distributed successfully!');
    }
}
