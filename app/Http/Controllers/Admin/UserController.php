<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Country;
use App\Models\QuestImage;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class UserController extends Controller
{
    public function allUsers(Request $request)
    {
        $users = User::where('role', 'user')->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Users/AllUsers', ['users' => $users]);
    }

    public function EditUsers($id)
    {
        $user = User::find($id);
        $countries = Country::all();

        return Inertia::render('Admin/Users/Edit', ['user' => $user, 'countries' => $countries]);
    }

    public function updateUsers(Request $request, string $id)
    {
        $item = User::findOrFail($id);
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($item->id),
            ],
            'number' => 'nullable|string|max:50',
            'coin' => 'nullable|numeric|min:0',
            'pixel' => 'nullable|numeric|min:0',
            'cash' => 'nullable|numeric|min:0',
            'country_id' => 'nullable|string',
            'status' => 'required|string',
        ]);

        $item->update($validated);

        return redirect()
            ->route('admin.allUsers')
            ->with('success', 'User updated successfully 🎉');

    }

    public function ChangePasswordUsers($id)
    {
        $user = User::select('id', 'password')->find($id);

        return Inertia::render('Admin/Users/ChangePassword', ['user' => $user]);
    }

    public function PasswordUpdate(Request $request, string $id)
    {
        $item = User::findOrFail($id);

        $validated = $request->validate([
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        $item->update([
            'password' => Hash::make($validated['password']),
        ]);

        return redirect()
            ->route('admin.allUsers')
            ->with('success', 'Password updated successfully 🎉');
    }

    public function show($id)
    /**
     * Show the form for editing the given user.
     *
     * @param  int  $id
     * @return \Inertia\Response
     */
    {
        // $user = User::find($id);
        $user = User::with(['followers', 'following', 'joinedQuests', 'questImages', 'votes'])->find($id);
        $usersPhotos = QuestImage::where('user_id', $user->id)->get();

        return Inertia::render('Admin/Users/view-user', ['user' => $user, 'usersPhotos' => $usersPhotos]);
    }

    // New method to get all judges

    public function allJudge(Request $request)
    {
        $judges = User::where('role', 'jury')->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Judge/AllJudge', ['judges' => $judges]);
    }

    public function createJudge()
    {
        return Inertia::render('Admin/Judge/Create');
    }

    public function storeJudge(Request $request)
    {

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'role' => $request->role,
            'level' => $request->level,
        ]);

        $user->save();

        return redirect()
            ->route('admin.allJudge')
            ->with('success', 'User created successfully 🎉');
    }

    public function editJudge($id)
    {

        $judge = User::find($id);

        return Inertia::render('Admin/Judge/Edit', ['judge' => $judge]);

    }

    public function updateJudge(Request $request, string $id)
    {
        $item = User::findOrFail($id);
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'status' => 'required',
        ]);

        $item->update($validated);

        return redirect()
            ->route('admin.allJudge')
            ->with('success', 'User updated successfully 🎉');
    }
}
