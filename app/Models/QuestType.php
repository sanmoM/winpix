<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuestType extends Model
{
    protected $fillable =[
        'name',
        'status'
    ];

    public function quests()
    {
        return $this->hasMany(Quest::class);
    }
}
