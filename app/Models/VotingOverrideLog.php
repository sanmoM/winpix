<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VotingOverrideLog extends Model
{
    protected $fillable = [
        'contest_id',
        'admin_id',
        'action',
        'reason',
    ];

    public function admin()
    {
        return $this->belongsTo(User::class, 'admin_id');
    }

    public function quest()
    {
        return $this->belongsTo(Quest::class, 'contest_id');
    }
}
