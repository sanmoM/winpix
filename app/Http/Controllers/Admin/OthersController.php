<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Other;
use Illuminate\Http\Request;
use Inertia\Inertia;
class OthersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $website_settings = Other::first();
        return Inertia::render(
            'Admin/Others/Index',
            [
                'website_settings' => $website_settings
            ]
        );

    }

    public function update(Request $request)
    {
        $dataFromDB = Other::first();

        $request->validate([
            'light_logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'dark_logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'fav_icon' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'app_name' => 'required|string|max:255',
            'app_description' => 'required|string',
            'terms_of_service' => 'required|string',
            'privacy_policy' => 'required|string',
            'copyright' => 'required|string',
            'facebook' => 'required|string',
            'twitter' => 'required|string',
            'instagram' => 'required|string',
        ]);
        $light_logo = $dataFromDB->light_logo;
        $dark_logo = $dataFromDB->dark_logo;
        $fav_icon = $dataFromDB->fav_icon;

        if ($request->hasFile('light_logo')) {
            $light_logo = $request->file('light_logo')->store('uploads/website_settings', 'public');
        }
        if ($request->hasFile('dark_logo')) {
            $dark_logo = $request->file('dark_logo')->store('uploads/website_settings', 'public');
        }
        if ($request->hasFile('fav_icon')) {
            $fav_icon = $request->file('fav_icon')->store('uploads/website_settings', 'public');
        }

        if ($dataFromDB) {
            $dataFromDB->update([
                'light_logo' => $light_logo,
                'dark_logo' => $dark_logo,
                'fav_icon' => $fav_icon,
                'app_name' => $request->app_name,
                'app_description' => $request->app_description,
                'terms_of_service' => $request->terms_of_service,
                'privacy_policy' => $request->privacy_policy,
                'copyright' => $request->copyright,
                'facebook' => $request->facebook,
                'twitter' => $request->twitter,
                'instagram' => $request->instagram,
            ]);
        } else {
            Other::create([
                'light_logo' => $light_logo,
                'dark_logo' => $dark_logo,
                'fav_icon' => $fav_icon,
                'app_name' => $request->app_name,
                'app_description' => $request->app_description,
                'terms_of_service' => $request->terms_of_service,
                'privacy_policy' => $request->privacy_policy,
                'copyright' => $request->copyright,
                'facebook' => $request->facebook,
                'twitter' => $request->twitter,
                'instagram' => $request->instagram,
            ]);
        }

        return redirect()->back()->with('success', 'Website settings updated successfully 🎉');
    }

}
