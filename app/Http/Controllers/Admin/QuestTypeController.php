<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\QuestType;
use Inertia\Inertia;

class QuestTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $items = QuestType::orderBy('id', 'DESC')->get();
        return Inertia::render('Admin/Type/Index',[
            'items' => $items
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */

    public function create()
    {
        return Inertia::render('Admin/Type/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);


        QuestType::create($validated);

        return redirect()
        ->back()
        ->with('success', 'Quest Type saved successfully 🎉');

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
        $item = QuestType::findOrFail($id);
        return Inertia::render('Admin/Type/Edit', [
            'item' => $item,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $item = QuestType::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'status' => 'required',
        ]);

        $item->update($validated);

        return redirect()
            ->route('admin.questType.index')
            ->with('success', 'Quest Type updated successfully 🎉');

    }

    /**
     * Remove the specified resource from storage.
     */

    public function destroy($id)
    {
        $questType = QuestType::findOrFail($id);
        $questType->delete();

        return redirect()
            ->back()
            ->with('success', 'Quest Type deleted successfully 🎉');
    }
}
