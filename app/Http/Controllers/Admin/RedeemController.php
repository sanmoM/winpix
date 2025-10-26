<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Redeem;
use Illuminate\Support\Facades\Storage;

class RedeemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $redeems = Redeem::orderBy('id', 'DESC')->get();
        return Inertia::render('Admin/Redeem/Index', [
            'redeems' => $redeems
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
    public function redeem(Request $request)
    {
        $validated = $request->validate([

            'icon_image' => 'required|image|max:2048',
            'number_of_coin' => 'required',
            'price' => 'required',
            'prize_type' => 'required',

        ]);

       $redeem =new Redeem();
       $redeem->number_of_coin = $request->number_of_coin;
       $redeem->price = $request->price;
       $redeem->prize_type = $request->prize_type;


       if ($request->hasFile('bg_image')) {

            $file = $request->file('bg_image')->store('uploads/redeem', 'public');
            $redeem->bg_image = $file;
        }


       $redeem->save();

       return redirect()->back()->with('success', 'Redeem package saved successfully 🎉');
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
       $redeem = Redeem::find($id);
       return Inertia::render('Admin/Redeem/Edit',[
            'redeem' => $redeem
       ]);
    }

    /**
     * Update the specified resource in storage.
     */

    public function update(Request $request, string $id)
    {
        $validated = $request->validate([

            'icon_image' => 'required|image|max:2048',
            'number_of_coin' => 'required',
            'price' => 'required',
            'prize_type' => 'required',
        ]);

       $redeem = Redeem::find($id);
       $redeem->number_of_coin = $request->number_of_coin;
       $redeem->price = $request->price;
       $redeem->prize_type = $request->prize_type;
       $redeem->status = $request->status;

       if ($request->hasFile('bg_image')) {
            // Delete old image
            if ($redeem->bg_image && Storage::disk('public')->exists($redeem->bg_image)) {
                Storage::disk('public')->delete($redeem->bg_image);
            }

            // Store new image
            $file = $request->file('bg_image')->store('uploads/redeem', 'public');
            $redeem->bg_image = $file;
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
        $redeem->delete();

        return redirect()
            ->back()
            ->with('success', 'Redeem Package deleted successfully 🎉');
    }
}
