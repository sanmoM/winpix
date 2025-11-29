<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MarketingBanner;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BannerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $banner = MarketingBanner::first();

        return Inertia::render('Admin/Banner/Edit', [
            'banner' => $banner,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $banner = MarketingBanner::first();

        // 1. Validate Data
        $data = $request->validate([
            'title_en' => 'required|string|max:255',
            'subtitle_en' => 'nullable|string',

            'title_ar' => 'required|string|max:255',
            'subtitle_ar' => 'nullable|string',

            'bg_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048', // Max 2MB
        ]);

        // 2. Create record if it doesn't exist
        if (! $banner) {
            $banner = new MarketingBanner;
        }

        if ($request->hasFile('bg_image')) {
            // Delete old image
            if ($banner->bg_image && file_exists(public_path('storage/'.$banner->bg_image))) {
                unlink(public_path('storage/'.$banner->bg_image));
            }
            // Store new image
            $path = $request->file('bg_image')->store('uploads/about', 'public');
            $banner->bg_image = $path;
        }

        $banner->title_en = $data['title_en'];
        $banner->subtitle_en = $data['subtitle_en'];
        $banner->title_ar = $data['title_ar'];
        $banner->subtitle_ar = $data['subtitle_ar'];
        $banner->save();

        return to_route('marketing.banner')->with('message', 'Banner updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
}
