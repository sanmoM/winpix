<?php

namespace App\Services;

use App\Models\User;

class RankingService
{
    /**
     * Define the ranking tiers.
     * 'max_level' is the highest level included in this tier.
     */
    public const RANKS = [
        ['title' => 'Unranked', 'min_level' => 1, 'max_level' => 4],
        ['title' => 'Bronze I', 'min_level' => 5, 'max_level' => 9],
        ['title' => 'Bronze II', 'min_level' => 10, 'max_level' => 14],
        ['title' => 'Bronze III', 'min_level' => 15, 'max_level' => 19],
        ['title' => 'Silver I', 'min_level' => 20, 'max_level' => 24],
        ['title' => 'Silver II', 'min_level' => 25, 'max_level' => 29],
        ['title' => 'Silver III', 'min_level' => 30, 'max_level' => 34],
        ['title' => 'Gold I', 'min_level' => 35, 'max_level' => 39],
        ['title' => 'Gold II', 'min_level' => 40, 'max_level' => 44],
        ['title' => 'Gold III', 'min_level' => 45, 'max_level' => 49],
        ['title' => 'Diamond I', 'min_level' => 50, 'max_level' => 59],
        ['title' => 'Diamond II', 'min_level' => 60, 'max_level' => 69],
        ['title' => 'Diamond III', 'min_level' => 70, 'max_level' => 79],
        ['title' => 'Professional Photographer', 'min_level' => 80, 'max_level' => 89],
        ['title' => 'Judge', 'min_level' => 90, 'max_level' => 100],
    ];

     public const RANK_TIERS = [
        [
            "tier" => "Unranked",
            "ranks" => ["Unranked"]
        ],
        [
            "tier" => "C",
            "ranks" => ["Bronze I", "Bronze II", "Bronze III", "Silver I"]
        ],
        [
            "tier" => "B",
            "ranks" => ["Silver II", "Silver III", "Gold I", "Gold II"]
        ],
        [
            "tier" => "A",
            "ranks" => ["Gold III", "Diamond I", "Diamond II", "Diamond III"]
        ],
        [
            "tier" => "M",
            "ranks" => ["Professional Photographer", "Judge"]
        ],
    ];

    /**
     * Get all defined ranking tiers.
     */
    public function getAllRanks(): array
    {
        return self::RANKS;
    }

    /**
     * Get the rank details (title, min, max) for a given level.
     */
    public static function getRank(int $level): array
    {
        foreach (self::RANKS as $rank) {
            if ($level >= $rank['min_level'] && $level <= $rank['max_level']) {
                return $rank;
            }
        }

        return $level < 1 ? self::RANKS[0] : end(self::RANKS);
    }

    public static function getNextRank(int $level): ?array
    {
        $currentRank = self::getRank($level);
        foreach (self::RANKS as $index => $rank) {
            if ($rank['title'] === $currentRank['title']) {
                return self::RANKS[$index + 1] ?? null;
            }
        }
        return null;
    }

    private function increaseLevel(User $user, int $amount): void
    {
        if ($user->role === 'admin' || $user->role === 'jury') {
            if ($user->level < 90) {
                $user->level = 90;
                $user->save();
            }
            return;
        }

        $user->level = min(100, $user->level + $amount);
        $user->save();
    }

    public function joinContest(User $user):void
    {
        $this->increaseLevel($user, 2);
    }

    public function winContest(User $user):void
    {
        $this->increaseLevel($user, 5);
    }

    public function castVote(User $user):void
    {
        if ($user->role === 'admin' || $user->role === 'jury') {
            return;
        }

        $user->votes_cast += 1;

        if ($user->votes_cast > 0 && $user->votes_cast % 50 === 0) {
            $this->increaseLevel($user, 1);
        } else {
            $user->save();
        }
    }

    public function setLevel(User $user, int $level): void
    {
        $user->level = max(1, min(100, $level));

        if ($user->level >= 90 && $user->role === 'user') {
            $user->role = 'jury';
        } elseif ($user->level < 90 && $user->role === 'jury') {
            $user->role = 'user';
        }

        $user->save();
    }
}
