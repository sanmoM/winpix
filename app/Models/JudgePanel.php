<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JudgePanel extends Model
{
    protected $table = 'judge_panels';

    protected $fillable = [
        'quest_id',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function quest()
    {
        return $this->belongsTo(Quest::class);
    }
}
