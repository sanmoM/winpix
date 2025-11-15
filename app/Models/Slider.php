<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Slider extends Model
{
    protected $fillable = [
        'lang',
        'group_id',
        'bg_image',
        'title',
        'content',
        'status',
    ];
}
