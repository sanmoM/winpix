<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Series extends Model
{
    protected $fillable = [

        'image',
        'title_en',
        'description_en',
        'title_ar',
        'description_ar',
        'status',
        'user_id',

    ];

    public function quests()
    {
        return $this->hasMany(Quest::class, 'quest_series_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getTotalQuestsAttribute()
    {
        return $this->quests()->count();
    }

    public function getTotalCoinsAttribute()
    {
        return $this->quests()->sum('entry_coin');
    }

    public function getTotalImagesAttribute()
    {
        return QuestImage::whereIn(
            'quest_id',
            $this->quests()->pluck('id')
        )->count();
    }
}
