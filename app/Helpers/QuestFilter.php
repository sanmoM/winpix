<?php

namespace App\Helpers;

use App\Models\Quest;

class QuestFilter
{
    public static function getQuestModelByFilter($filter)
    {
        $query = match ($filter) {
            'discover', 'free' =>
            self::baseQuery()->where('entry_coin', 0),

            'ranked' => self::baseQuery()
                ->withCount('votes')
                ->orderBy('votes_count', 'desc'),

            'premium' =>
            self::baseQuery()->where('entry_coin', '>', 0),

            'community' => self::baseQuery()->whereHas('quest_type', function ($q) {
                    $q->where('name', 'community'); // replace 'name' with the actual column in quest_types table
                }),

            default =>
            self::baseQuery(),
        };

        return $query;
    }

    private static function baseQuery()
    {
        return Quest::with(['category', 'user', 'quest_type', 'questSeries'])
            ->where('status', 'active');
    }
}
