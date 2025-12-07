<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class QuestImage extends Model
{
    protected $fillable = [
        'quest_id',
        'image',
        'user_id',
    ];

    protected static function booted()
    {
        static::deleting(function ($questImage) {
            if ($questImage->image && Storage::disk('public')->exists($questImage->image)) {
                Storage::disk('public')->delete($questImage->image);
            }
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

    public function vote()
    {
        return $this->hasMany(Vote::class);
    }

    public function report()
    {
        return $this->hasMany(Report::class);
    }
}
