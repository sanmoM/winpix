<?php

namespace App\Http\Controllers\Settings;

use App\Helpers\FileHelper as File;
use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('settings/profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Update the user's profile settings.
     */
    public function update(ProfileUpdateRequest $request)
    {
        $user = $request->user();

        $user->name = $request->validated()['name'] ?? $user->name;
        $user->email = $request['email'] ?? $user->email;
        $user->number = $request['number'] ?? $user->number;
        $user->country_id = $request['country_id'] ?? $user->country_id;
        $user->facebook = $request['facebook'] ?? $user->facebook;
        $user->instagram = $request['instagram'] ?? $user->instagram;
        $user->x = $request['x'] ?? $user->x;
        Log::info($request->all());

        // Handle image upload using your File helper
        if ($request->hasFile('image')) {
            // Delete old image
            if ($user->image) {
                File::deleteFile($user->image);
            }

            // Upload new image
            $user->image = File::uploadFile($request->file('image'), 'users');
        }


        // return dd($user['number']);
        $user->save();

        return route('dashboard');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
