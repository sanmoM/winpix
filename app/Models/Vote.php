<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    protected $fillable = [
        'image_id',
        'user_id',
    ];

    public function image()
    {
        return $this->belongsTo(QuestImage::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
