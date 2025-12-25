<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $table = 'transactions';

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
}
