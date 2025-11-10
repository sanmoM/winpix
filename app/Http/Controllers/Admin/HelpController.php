<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Help;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HelpController extends Controller
{
    public function index()
    {
        $items = Help::orderBy('id', 'desc')->get();

        return Inertia::render('Admin/Help/Index', [
            'items' => $items,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Help/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'section' => 'required|string|max:255',
            'question' => 'required|string',
            'answer' => 'required',
            'lang' => 'required',
        ]);

        Help::create($validated);

        return redirect()
            ->back()
            ->with('success', 'Question saved successfully 🎉');

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
        $item = Help::findOrFail($id);

        return Inertia::render('Admin/Help/Edit', [
            'item' => $item,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $item = Help::findOrFail($id);

        $validated = $request->validate([
            'section' => 'required|string|max:255',
            'question' => 'required|string',
            'answer' => 'required',
            'lang' => 'required',
        ]);

        $item->update($validated);

        return redirect()
            ->route('admin.help.index')
            ->with('success', 'Question updated successfully 🎉');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $help = Help::findOrFail($id);
        $help->delete();

        return redirect()
            ->back()
            ->with('success', 'Question deleted successfully 🎉');
    }
}
