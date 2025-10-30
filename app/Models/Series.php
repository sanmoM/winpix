<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Series extends Model
{
    protected $fillable =[
        'image',
        'title',
        'description',
        'status'
    ];
}
