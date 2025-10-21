<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\About;

class AboutController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $items = About::all();
        return Inertia::render('Admin/About/Index',[
            'items' => $items
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */

    public function create()
    {
        return Inertia::render('Admin/About/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'picture' => 'required|image|max:2048',
        ]);

        if ($request->hasFile('picture')) {

            $file = $request->file('picture');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->storeAs('uploads/about', $filename, 'public');
            $validated['picture'] = $filename;

        }

        About::create($validated);

        return redirect()
        ->route('admin.about.index')
        ->with('success', 'About date saved successfully 🎉');

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
        $item = About::findOrFail($id);
        return Inertia::render('Admin/About/Edit', [
            'item' => $item,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $item = About::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'picture' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('picture')) {

            $file = $request->file('picture');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->storeAs('uploads/about', $filename, 'public');
            $validated['picture'] = $filename;

            if ($item->picture && file_exists(storage_path('uploads/about/' . $item->picture))) {
                unlink(storage_path('uploads/about/' . $item->picture));
            }
        }
       else
       {
        $validated['picture'] = $item->picture;
       }

        $item->update($validated);

        return redirect()
            ->route('admin.about.index')
            ->with('success', 'About data updated successfully 🎉');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $about = About::findOrFail($id);

        // Delete image if exists
        if ($about->picture && file_exists(storage_path('app/public/uploads/about/' . $about->picture))) {
            unlink(storage_path('app/public/uploads/about/' . $about->picture));
        }

        $about->delete();

        return redirect()
            ->back()
            ->with('success', 'About item deleted successfully 🎉');
    }
}
