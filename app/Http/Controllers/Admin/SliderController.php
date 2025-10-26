<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Slider;

class SliderController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        $sliders = Slider::orderBy('id', 'DESC')->get();
        return Inertia::render('Admin/Slider/Index', [
            'sliders' => $sliders
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */

    public function create()
    {
        return Inertia::render('Admin/Slider/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([

            'title' => 'required|string|max:255',
            'content' => 'required',
            'bg_image' => 'required|image|max:2048',
        ]);

       $slider =new Slider();
       $slider->title = $request->title;
       $slider->content = $request->content;

       if ($request->hasFile('bg_image')) {
           $file = $request->file('bg_image')->store('uploads/slider', 'public');
           $slider->bg_image = $file;
       }

       $slider->save();

       return redirect()->back()->with('success', 'Slider saved successfully 🎉');

    }

    /**
     * Display the specified resource.
     */

    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $slider = Slider::find($id);
        return Inertia::render('Admin/Slider/Edit', [
            'slider' => $slider
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([

            'title' => 'required|string|max:255',
            'content' => 'required',
            'bg_image' => 'nullable|image|max:2048',
            'status' => 'required'
        ]);

       $slider = Slider::find($id);
       $slider->title = $request->title;
       $slider->content = $request->content;
       $slider->status = $request->status;

        if ($request->hasFile('bg_image')) {
            // Delete old image
            if ($slider->bg_image && Storage::disk('public')->exists($slider->bg_image)) {
                Storage::disk('public')->delete($slider->bg_image);
            }

            // Store new image
            $file = $request->file('bg_image')->store('uploads/slider', 'public');
            $slider->bg_image = $file;
        }

        $slider->save();

        return redirect()
            ->route('admin.slider.index')
            ->with('success', 'Slider updated successfully 🎉');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $slider = Slider::find($id);
        // Delete old image
        if ($slider->bg_image && Storage::disk('public')->exists($slider->bg_image)) {
            Storage::disk('public')->delete($slider->bg_image);
        }
        $slider->delete();

        return redirect()
            ->back()
            ->with('success', 'Slider item deleted successfully 🎉');
    }
}
