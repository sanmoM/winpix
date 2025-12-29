<?php
namespace App\Http\Controllers;

use App\Models\Quest;
use App\Models\QuestImage;
use App\Models\User;
use App\Models\Vote;
use App\Services\RankingService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DiscoverController extends Controller
{
    public function discover()
    {
        $Ranking = new RankingService();
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
        $topPlayers = User::with(['followers'])
            ->where('role', 'user')
            ->orderByDesc('level')
            ->take(9)
            ->get();

        return Inertia::render('discover', [
            'quests' => $new_quest,
            'galleryImages' => $topImages,
            "allRanks" => $Ranking->getAllRanks(),
            // "userRank" => $Ranking->getRank(auth()->user()->level),
            "topPlayers" => $topPlayers
        ]);
    }
}
