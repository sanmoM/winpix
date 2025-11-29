<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BrandMarketing extends Model
{
    protected $fillable = [
        'group_id',
        'bg_image',
        'title',
        'content',
        'lang',
        'status',
    ];
}
