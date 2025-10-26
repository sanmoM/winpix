<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Store;

class StoreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $stores = Store::orderBy('id', 'DESC')->get();
        return Inertia::render('Admin/Store/Index', [
            'stores' => $stores
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
     return Inertia::render('Admin/Store/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([

            'number_of_coin' => 'required',
            'price' => 'required',
        ]);

       $store =new Store();
       $store->number_of_coin = $request->number_of_coin;
       $store->price = $request->price;
       $store->save();

       return redirect()->back()->with('success', 'Store package saved successfully 🎉');
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
       $store = Store::find($id);
       return Inertia::render('Admin/Store/Edit',[
            'store' => $store
       ]);
    }

    /**
     * Update the specified resource in storage.
     */

    public function update(Request $request, string $id)
    {
        $validated = $request->validate([

            'number_of_coin' => 'required',
            'price' => 'required',
        ]);

       $store = Store::find($id);
       $store->number_of_coin = $request->number_of_coin;
       $store->price = $request->price;
       $store->status = $request->status;
       $store->update();

       return redirect()->route('admin.store.index')->with('success', 'Store package updated successfully 🎉');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $store = Store::find($id);
        $store->delete();

        return redirect()
            ->back()
            ->with('success', 'Store Package deleted successfully 🎉');
    }
}
