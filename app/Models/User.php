<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'username',
        'image',
        'personal_website',
        'instagram',
        'facebook',
        'x',
        'country_id',
        'city',
        'full_address',
        'role',
        'password',
        'status',
        'level',
        'votes_cast',
        'coins',
        'pixel',
        'cash',
        'isRedeemed',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    public function getDashboardRoute()
    {
        return match ($this->role) {
            'admin' => route('admin.dashboard', absolute: false),
            'jury' => route('jury.dashboard', absolute: false),
            default => route('dashboard', absolute: false), // regular user
        };
    }

    // followers and following function
    public function following()
    {
        return $this->belongsToMany(User::class, 'followers', 'follower_id', 'followed_id');
    }

    public function followers()
    {
        return $this->belongsToMany(User::class, 'followers', 'followed_id', 'follower_id');
    }

    // helper method to check if the current user is following another user
    public function isFollowing(User $user): bool
    {
        return $this->following()->where('followed_id', $user->id)->exists();
    }

    public function votes()
    {
        // return $this->hasMany(Vote::class);
        return $this->hasMany(Vote::class)->whereNull('skip');

    }

    public function joinedQuests()
    {
        return $this->hasMany(QuestJoin::class);
    }

    public function questImages()
    {
        return $this->hasMany(QuestImage::class);
    }
}
