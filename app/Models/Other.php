<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Other extends Model
{

    protected $fillable = [
        'light_logo',
        'dark_logo',
        'fav_icon',
        'app_name',
        'app_description',
        'terms_of_service',
        'privacy_policy',
        'copyright',
        'facebook',
        'twitter',
        'instagram',
    ];

}
