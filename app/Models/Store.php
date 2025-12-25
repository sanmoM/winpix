<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    protected $fillable = [
        'icon_image',
        'number_of_coin',
        'price',
        'status',
    ];
}
