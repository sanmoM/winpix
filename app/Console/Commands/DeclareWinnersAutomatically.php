<?php

namespace App\Console\Commands;

use App\Models\ContestWinner;
use App\Models\Prize;
use App\Models\Quest;
use App\Models\QuestImage;
use Carbon\Carbon;
use Illuminate\Console\Command;

class DeclareWinnersAutomatically extends Command
{
    protected $signature = 'contest:declare-winners-automatically';

    protected $description = 'Automatically declare winners for quests where winner_declaration is set to auto and end_date has passed';

    public function handle()
    {
        $quests = Quest::where('winner_declaration', 'auto')
            // ->where('end_date', '>', Carbon::today())
            // ->where('winner_status', 'pending')
            ->get();

        foreach ($quests as $quest) {
            $this->info("Declaring winners for Quest: {$quest->title_en}");

            $images = QuestImage::with('quest:id,title_en,end_date,winner_status,lead_judge')
                ->select('quest_images.id', 'quest_images.quest_id', 'quest_images.image', 'quest_images.user_id')
                ->selectRaw('
                    SUM(CASE WHEN users.role = "jury" THEN votes.score ELSE 0 END) AS jury_score,
                    SUM(CASE WHEN users.role = "user" THEN votes.score ELSE 0 END) AS user_score,
                    SUM(votes.score) AS total_score
                ')
                ->leftJoin('votes', 'votes.image_id', '=', 'quest_images.id')
                ->leftJoin('users', 'users.id', '=', 'votes.user_id')
                ->where('quest_images.quest_id', $quest->id)
                ->groupBy('quest_images.id', 'quest_images.quest_id', 'quest_images.image', 'quest_images.user_id')
                ->orderByDesc('total_score')
                ->get();

            $totalPrizes = Prize::where('quest_id', $quest->id)
                ->get()
                ->sum(function ($prize) {
                    return $prize->max - $prize->min + 1;
                });

            $formattedItems = $images->slice(0, $totalPrizes)->map(function ($item, $index) {
                return [
                    'id' => $item->id,
                    'image_id' => $item->id,
                    'quest_id' => $item->quest_id,
                    'user_vote' => $item->user_score,
                    'jury_score' => $item->jury_score,
                    'total_score' => $item->total_score,
                    'rank' => $index + 1,
                    'submitted_by' => 'System',
                ];
            });

            foreach ($formattedItems as $item) {
                ContestWinner::create($item);
            }

            // Mark the quest as 'admin_approved'
            $quest->winner_status = 'admin_approved';
            $quest->winner_approved_at = now();
            $quest->save();

            $this->info("Winners declared for Quest: {$quest->title_en}");
        }

        $this->info('Automatic winner declaration completed!'.$quests);
    }
}
