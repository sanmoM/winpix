<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Prize extends Model
{
  protected $fillable = [
    'quest_id',
    'min',
    'max',
    'coin',
    'title',
    'prize_pool'
  ];
  public function quest()
  {
    return $this->belongsTo(Quest::class);
  }
}
