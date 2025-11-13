<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class About extends Model
{
    protected $fillable = [
        'group_id',
        'title',
        'content',
        'picture',
        'lang',
        'status',
    ];
}
