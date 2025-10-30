<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\QuestCategory;
use Inertia\Inertia;

class QuestCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $items = QuestCategory::orderBy('id', 'DESC')->get();
        return Inertia::render('Admin/Category/Index',[
            'items' => $items
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */

    public function create()
    {
        return Inertia::render('Admin/Category/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);


        QuestCategory::create($validated);

        return redirect()
        ->back()
        ->with('success', 'Quest Category saved successfully 🎉');

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
        $item = QuestCategory::findOrFail($id);
        return Inertia::render('Admin/Category/Edit', [
            'item' => $item,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $item = QuestCategory::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'status' => 'required',
        ]);

        $item->update($validated);

        return redirect()
            ->route('admin.questCategory.index')
            ->with('success', 'Quest Category updated successfully 🎉');

    }

    /**
     * Remove the specified resource from storage.
     */

    public function destroy($id)
    {
        $questCategory = QuestCategory::findOrFail($id);
        $questCategory->delete();

        return redirect()
            ->back()
            ->with('success', 'Quest category deleted successfully 🎉');
    }
}
