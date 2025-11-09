<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quest extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'brief',
        'start_date',
        'end_date',
        'image',
        'status',
        'category_id',
    ];
    // Define the relation to prizes
    public function prizes()
    {
        return $this->hasMany(Prize::class);
    }

    protected $casts = [
        'start_date' => 'date:Y-m-d',
        'end_date' => 'date:Y-m-d',
    ];
}
