<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class QuestImage extends Model
{
    protected $fillable = [
        'quest_join_id',
        'image',
    ];

    protected static function booted()
    {
        static::deleting(function ($questImage) {
            \Log::info('Deleting QuestImage: ' . $questImage->id);
            if ($questImage->image && Storage::disk('public')->exists($questImage->image)) {
                Storage::disk('public')->delete($questImage->image);
            }
        });
    }

    public function quest_join()
    {
        return $this->belongsTo(QuestJoin::class);
    }
}
