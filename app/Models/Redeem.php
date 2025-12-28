<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Redeem extends Model
{
    protected $fillable = [

        'icon_image',
        'number_of_coin',
        'price',
        'prize_type',
        'status',
    ];
}
