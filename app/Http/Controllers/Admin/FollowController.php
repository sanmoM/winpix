<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;

class FollowController extends Controller
{
    public function follow(User $user)
    {
        if (auth()->user()->id === $user->id) {
            // Prevent users from following themselves
            auth()->user()->following()->attach($user->id);
        }

        // Redirect back with Inertia
        return back();
    }

    public function unfollow(User $user)
    {

        if (auth()->user()->id === $user->id) {
            // Prevent users from unfollowing themselves
            auth()->user()->following()->detach($user->id);
        }

        // Redirect back with Inertia
        return back();
    }
}
