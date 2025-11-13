<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class QuestJoin extends Model
{
    protected $fillable = [
        'quest_id',
        'user_id',
    ];

    public function images()
    {
        return $this->hasMany(QuestImage::class, 'quest_join_id');
    }

    protected static function booted()
    {
        static::deleting(function ($join) {
            // Delete all related QuestImages
            $join->images->each->delete();
        });
    }
    public function quest()
    {
        return $this->belongsTo(Quest::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
