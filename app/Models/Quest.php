<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Quest extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'brief',
        'start_date',
        'end_date',
        'image',
        'status',
        'category_id',
        'user_id',
        'entry_coin',
        'level_requirement',
        'categories_requirement',
        'copyright_requirement',
        'quest_series_id',
        'quest_type_id',
    ];

    protected static function booted()
    {
        static::deleting(function ($quest) {
            // Delete all joins (this triggers QuestJoin deleting → QuestImages deleted)
            $quest->quest_join->each->delete(); // <-- remove parentheses
            $quest->images->each->delete(); // <-- remove parentheses

            // Delete all prizes
            $quest->prizes()->delete();

            // Delete Quest main image
            if ($quest->image && Storage::disk('public')->exists($quest->image)) {
                Storage::disk('public')->delete($quest->image);
            }
        });
    }

    // Define the relation to prizes
    public function prizes()
    {
        return $this->hasMany(Prize::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function questSeries()
    {
        return $this->belongsTo(Series::class, 'quest_series_id');
    }

    public function category()
    {
        return $this->belongsTo(QuestCategory::class);
    }

    public function quest_join()
    {
        return $this->hasMany(QuestJoin::class);
    }

    public function images()
    {
        return $this->hasMany(QuestImage::class);
    }

    protected $casts = [
        'start_date' => 'date:Y-m-d',
        'end_date' => 'date:Y-m-d',
    ];
}
