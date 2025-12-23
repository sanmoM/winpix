<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Quest extends Model
{
    use HasFactory;

    protected $fillable = [

        'title_en',
        'brief_en',
        'title_ar',
        'brief_ar',
        'start_date',
        'end_date',
        'image',
        'status',
        'category_id',
        'user_id',
        'entry_coin',
        'level_requirement_en',
        'categories_requirement_en',
        'copyright_requirement_en',
        'level_requirement_ar',
        'categories_requirement_ar',
        'copyright_requirement_ar',
        'quest_series_id',
        'quest_type_id',
        'vote_rights',
        'manual_override',
        'winner_declaration',
        'lead_judge',
        'manual_override_end_date',
    ];

    protected static function booted()
    {
        static::deleting(function ($quest) {
            // Delete all joins
            $quest->quest_join->each->delete();
            $quest->images->each->delete();

            // Delete all prizes
            $quest->prizes()->delete();

            // Delete Quest main image
            if ($quest->image && Storage::disk('public')->exists($quest->image)) {
                Storage::disk('public')->delete($quest->image);
            }
        });
    }

    public function category()
    {
        return $this->belongsTo(QuestCategory::class);
    }

    public function quest_type()
    {
        return $this->belongsTo(QuestType::class);
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

    public function quest_join()
    {
        return $this->hasMany(QuestJoin::class);
    }

    public function images()
    {
        return $this->hasMany(QuestImage::class);
    }

    public function votes()
    {
        return $this->hasMany(Vote::class);
    }

    public function judges()
    {
        return $this->hasMany(JudgePanel::class);
    }

    protected $casts = [
        'start_date' => 'date:Y-m-d',
        'end_date' => 'date:Y-m-d',
    ];
}
