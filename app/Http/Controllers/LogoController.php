<?php

namespace App\Http\Controllers;

use App\Models\Logo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LogoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $logos = Logo::all();
        return Inertia::render("Admin/logo/index", [
            "logos" => $logos,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Admin/logo/create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'light_logo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'dark_logo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        $light_logo = $request->file('light_logo')->store('uploads/logo', 'public');
        $dark_logo = $request->file('dark_logo')->store('uploads/logo', 'public');

        Logo::create([
            "light_logo" => $light_logo,
            "dark_logo" => $dark_logo,
        ]);
        return redirect()->route("admin.logo.index")->with("success", "Logo created successfully");
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
        $logo = Logo::find($id);
        return Inertia::render("Admin/logo/edit", [
            "logo" => $logo,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $logo = Logo::find($id);
        $light_logo = $logo->light_logo;
        $dark_logo = $logo->dark_logo;
        if ($request->hasFile("light_logo")) {
            $light_logo = $request->file('light_logo')->store('uploads/logo', 'public');
        }
        if ($request->hasFile("dark_logo")) {
            $dark_logo = $request->file('dark_logo')->store('uploads/logo', 'public');
        }
        $logo->update([
            "light_logo" => $light_logo,
            "dark_logo" => $dark_logo,
        ]);
        return redirect()->route("admin.logo.index")->with("success", "Logo updated successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
