<?php

namespace App\Models;

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
}
