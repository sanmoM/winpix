<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function allUsers(Request $request)
    {
        $users = User::where('role', 'user')->get();

        return Inertia::render('Admin/Users/AllUsers', ['users' => $users]);
    }

    public function EditUsers($id)
    {
        $user = User::select('id', 'name', 'email', 'status')->find($id);

        return Inertia::render('Admin/Users/Edit', ['user' => $user]);
    }

    public function updateUsers(Request $request, string $id)
    {
        $item = User::findOrFail($id);
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'status' => 'required',
        ]);

        $item->update($validated);

        return redirect()
            ->route('admin.allUsers')
            ->with('success', 'User updated successfully 🎉');

    }

    public function show($id)
    {
        $user = User::find($id);

        return Inertia::render('Admin/Users/view-user', ['user' => $user]);
    }
}
