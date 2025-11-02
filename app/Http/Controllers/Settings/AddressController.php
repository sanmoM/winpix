<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Country;
use Illuminate\Support\Facades\Auth;

class AddressController extends Controller
{
    public function address()
    {
        $user = Auth::user()->only([
            'id',
            'country_id',
            'city',
            'full_address',
        ]);

        $countries = Country::all();
        return Inertia::render('settings/address',[
           'user' =>  $user,
           'countries' => $countries
        ]);
    }

    public function socialLinks()
    {
        $user = Auth::user()->only([
            'id',
            'personal_website',
            'instagram',
            'facebook',
            'x',
        ]);

        return Inertia::render('settings/social-links',[
           'user' =>  $user
        ]);
    }

    // ⚙️ Single scalable update method
    public function profileUpdate(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            abort(401, 'Unauthorized');
        }

        $rules = [
            'personal_website' => 'nullable|string|max:255',
            'instagram'        => 'nullable|string|max:255',
            'facebook'         => 'nullable|string|max:255',
            'x'                => 'nullable|string|max:255',
            'country_id'       => 'nullable|string',
            'city'             => 'nullable|string|max:255',
            'full_address'     => 'nullable|string|max:500',
        ];

        $filteredRules = array_intersect_key($rules, $request->all());
        $validated = $request->validate($filteredRules);

        $user->update($validated);

        return back()->with('success', 'Your edits have been saved!');
    }


}
