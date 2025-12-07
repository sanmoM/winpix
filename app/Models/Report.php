<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    protected $fillable = [
        'image_id',
        'reason',
    ];

    public function image()
    {
        return $this->belongsTo(QuestImage::class);
    }
}
