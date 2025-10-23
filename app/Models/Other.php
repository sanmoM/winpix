<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Other extends Model
{

    protected $fillable = [
        'logo',
        'fav_icon',
        'app_description',
        'terms_of_service',
        'privacy_policy',
    ];

}
