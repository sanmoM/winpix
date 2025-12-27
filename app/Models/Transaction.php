<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [
        'user_id',
        'transaction_type',
        'reference_id',
        'transaction_id',
        'amount',
        'amount_type',
        'currency',
        'payment_method',
        'status',
        'details',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
