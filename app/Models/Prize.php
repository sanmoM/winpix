<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Prize extends Model
{
    protected $fillable =[
      'quest_id',
      'rank',
      'star_coin'
    ];
}
