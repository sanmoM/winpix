<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Series extends Model
{
    protected $fillable = [
        'image',
        'title',
        'description',
        'status'
    ];

    public function quests()
    {
        return $this->hasMany(Quest::class, 'quest_series_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
