<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Series;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class SeriesController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        $series = Series::orderBy('id', 'DESC')->get();
        return Inertia::render('Admin/Series/Index', [
            'series' => $series
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Series/Create');
    }

    /**
     * Series a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = $request->user();
        $validated = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'image' => 'required|image|max:2048'
        ]);


       $series =new Series();
       $series->title = $request->title;
       $series->description = $request->description;

       if ($request->hasFile('image')) {
            $file = $request->file('image')->store('uploads/series', 'public');
            $series->image = $file;
            $series->user_id = $user->id;
       }


       $series->save();

       return redirect()->back()->with('success', 'Series saved successfully 🎉');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */

    public function edit(string $id)
    {
       $series = Series::find($id);
       return Inertia::render('Admin/Series/Edit',[
            'series' => $series
       ]);
    }

    /**
     * Update the specified resource in storage.
     */

    public function update(Request $request, string $id)
    {
       $validated = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'image' => 'nullable|image|max:2048',
            'status' => 'required',
        ]);

       $series = Series::find($id);
       $series->title = $request->title;
       $series->description = $request->description;
       $series->status = $request->status;

       if ($request->hasFile('image')) {
            // Delete old image
            if ($series->image && Storage::disk('public')->exists($series->image)) {
                Storage::disk('public')->delete($series->image);
            }
            // Series new image
            $file = $request->file('image')->store('uploads/series', 'public');
            $series->image = $file;
       }

       $series->update();

       return redirect()->route('admin.series.index')->with('success', 'Series updated successfully 🎉');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $series = Series::find($id);
        // Delete old image
        if ($series->image && Storage::disk('public')->exists($series->image)) {
            Storage::disk('public')->delete($series->image);
        }
        $series->delete();

        return redirect()
            ->back()
            ->with('success', 'Series deleted successfully 🎉');
    }
}
