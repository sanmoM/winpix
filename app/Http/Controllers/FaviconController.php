<?php

namespace App\Http\Controllers;

use App\Models\Favicon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FaviconController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $favicons = Favicon::all();
        return Inertia::render('Admin/favicon/index', [
            'favicons' => $favicons,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/favicon/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        $file = $request->file('image')->store('uploads/favicon', 'public');
        Favicon::create([
            'title' => $request->title,
            'image' => $file,
        ]);
        return redirect()->route('admin.favicon.index')->with('success', 'Favicon created successfully');
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
        $favicon = Favicon::findOrFail($id);
        return Inertia::render('Admin/favicon/edit', [
            'favicon' => $favicon,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $favicon = Favicon::findOrFail($id);
        $request->validate([
            'title' => 'required'
        ]);
        $file = $favicon->image;
        if ($request->hasFile('image')) {
            $file = $request->file('image')->store('uploads/favicon', 'public');
        }
        $favicon->update([
            'title' => $request->title,
            'image' => $file,
        ]);
        return redirect()->route('admin.favicon.index')->with('success', 'Favicon updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
