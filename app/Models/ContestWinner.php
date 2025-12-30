<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContestWinner extends Model
{
    protected $fillable = [

        'quest_id',
        'image_id',
        'user_vote',
        'jury_score',
        'total_score',
        'rank',
        'submitted_by',
    ];
}
