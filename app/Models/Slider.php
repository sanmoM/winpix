<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Slider extends Model
{
    protected $fillable = [

        'bg_image',
        'title',
        'content',
        'status'
    ];
}
