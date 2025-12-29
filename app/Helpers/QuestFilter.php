<?php

namespace App\Helpers;

use App\Models\Quest;

class QuestFilter
{
    /** @var \Illuminate\Database\Eloquent\Builder */
    private static $query;

    /**
     * Initialize static base query
     */
    public static function init()
    {
        self::$query = Quest::query()
            ->with(['category', 'user', 'quest_type', 'questSeries']);

        return new static;
    }

    /**
     * Return current query
     */
    public static function query()
    {
        return self::$query;
    }

    /**
     * Apply filter
     */
    public static function filter($filter)
    {
        $query = self::$query;

        match ($filter) {
            'free' =>
                $query->where('entry_coin', 0),

            'ranked' =>
                $query->withCount('votes')
                      ->orderBy('votes_count', 'desc'),

            'premium' =>
                $query->where('entry_coin', '>', 0),

            'community' =>
                $query->whereHas('quest_type', fn ($q) =>
                    $q->where('name', 'Community')
                ),

            default => null
        };

        return new static;
    }

    /**
     * Apply sort conditions
     */
    public static function sort($sort)
    {
        $query = self::$query;

        match ($sort) {
            'endingSoon' =>
                $query->whereDate('end_date', today()),

            'rising' =>
                $query->withCount('votes')
                      ->orderBy('votes_count', 'desc'),

            'newest' =>
                $query->orderBy('created_at', 'desc'),

            'oldest' =>
                $query->orderBy('created_at', 'asc'),

            default => null
        };

        return new static;
    }

    /**
     * Final result
     */
    public function get()
    {
        return self::$query->get();
    }
}
