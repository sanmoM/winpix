<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MarketingBanner extends Model
{
    protected $fillable = [

        'bg_image',
        'title_en',
        'subtitle_en',
        'title_ar',
        'subtitle_ar',

    ];
}
