<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Redeem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class RedeemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $redeems = Redeem::latest()
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Admin/Redeem/Index', [
            'redeems' => $redeems,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Redeem/Create');
    }

    /**
     * Redeem a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([

            'icon_image' => 'required|image|max:2048',
            'number_of_coin' => 'nullable',
            'name' => 'nullable',
            'price' => 'required',
            'prize_type' => 'required',

        ]);

        $redeem = new Redeem;
        $redeem->name = $request->name;
        $redeem->number_of_coin = $request->number_of_coin;
        $redeem->price = $request->price;
        $redeem->prize_type = $request->prize_type;

        if ($request->hasFile('icon_image')) {

            $file = $request->file('icon_image')->store('uploads/redeem', 'public');
            $redeem->icon_image = $file;
        }

        $redeem->save();

        return redirect()->back()->with('success', 'Redeem package saved successfully 🎉');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $redeem = Redeem::find($id);

        return Inertia::render('Admin/Redeem/Edit', [
            'redeem' => $redeem,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([

            'icon_image' => 'nullable|image|max:2048',
            'number_of_coin' => 'nullable',
            'name' => 'nullable',
            'price' => 'required',
            'prize_type' => 'required',
        ]);

        $redeem = Redeem::find($id);
        $redeem->name = $request->name;
        $redeem->number_of_coin = $request->number_of_coin;
        $redeem->price = $request->price;
        $redeem->prize_type = $request->prize_type;
        $redeem->status = $request->status;

        if ($request->hasFile('icon_image')) {
            // Delete old image
            if ($redeem->icon_image && Storage::disk('public')->exists($redeem->icon_image)) {
                Storage::disk('public')->delete($redeem->icon_image);
            }

            // Store new image
            $file = $request->file('icon_image')->store('uploads/redeem', 'public');
            $redeem->icon_image = $file;
        }

        $redeem->update();

        return redirect()->route('admin.redeem.index')->with('success', 'Redeem package updated successfully 🎉');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $redeem = Redeem::find($id);
        // Delete old image
        if ($redeem->icon_image && Storage::disk('public')->exists($redeem->icon_image)) {
            Storage::disk('public')->delete($redeem->icon_image);
        }
        $redeem->delete();

        return redirect()
            ->back()
            ->with('success', 'Redeem Package deleted successfully 🎉');
    }
}
