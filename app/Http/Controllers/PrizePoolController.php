<?php

namespace App\Http\Controllers;

use App\Models\PrizePool;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PrizePoolController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $items = PrizePool::orderBy('id', 'DESC')->get();
        return Inertia::render('Admin/PrizePool/index', [
            'items' => $items,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/PrizePool/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "name" => "required|string|max:255",
        ]);

        PrizePool::create([
            "name" => $request->name,
        ]);

        return redirect()->route('admin.prize_pools.index')
            ->with('success', 'Prize pool created successfully.');
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $prizePool = PrizePool::findOrFail($id);
        $prizePool->delete();
    }
}
