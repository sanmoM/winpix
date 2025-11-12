<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuestImage extends Model
{
    protected $fillable = [
        'quest_join_id',
        'image',
    ];

    public function quest_join()
    {
        return $this->belongsTo(QuestJoin::class);
    }
}
