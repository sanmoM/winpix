<?php

namespace App\Http\Controllers\UserDashboard;

use App\Http\Controllers\Controller;
use App\Models\Prize;
use App\Models\Quest;
use App\Models\QuestCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class QuestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $quests = Quest::with('prizes')->get();
        return Inertia::render('user-dashboard/quest/show-quests', [
            'quests' => $quests
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = QuestCategory::all();
        return Inertia::render('user-dashboard/quest/create-quest', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $input = $request->all();

        // Validate
        $validator = Validator::make($input, [
            'title' => 'required|string|max:255',
            'brief' => 'required|string|max:255',
            'category_id' => 'required|integer|exists:quest_categories,id',
            'startDate' => 'required|string|max:255',
            'endDate' => 'required|string|max:255',
            'prizes' => 'required|array|min:1',
            'prizes.*.min' => 'required|integer|min:0',
            'prizes.*.max' => 'required|integer|gte:prizes.*.min',
            'prizes.*.coin' => 'required|integer|min:0',
            'prizes.*.title' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        // if ($validator->fails()) {
        //     dd($validator->errors()->toArray());
        // }

        // Handle image upload
        if ($request->hasFile('image')) {
            $input['image'] = $request->file('image')->store('uploads/quests', 'public');
        }

        // Create quest
        $quest = Quest::create([
            'title' => $input['title'],
            'brief' => $input['brief'],
            'category_id' => $input['category_id'],
            'start_date' => $input['startDate'],
            'end_date' => $input['endDate'],
            'image' => $input['image'] ?? null,
            'status' => 'active',
        ]);

        // Create prizes
        foreach ($input['prizes'] as $prizeData) {
            Prize::create([
                'quest_id' => $quest->id,
                'min' => $prizeData['min'],
                'max' => $prizeData['max'],
                'coin' => $prizeData['coin'],
                'title' => $prizeData['title'],
            ]);
        }

        return "hellow";
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
        $quest = Quest::with('prizes')->findOrFail($id);
        $categories = QuestCategory::all();
        return Inertia::render('user-dashboard/quest/edit-quest', [
            'quest' => [
                'id' => $quest->id,
                'title' => $quest->title,
                'brief' => $quest->brief,
                'category_id' => (string) $quest->category_id,
                'startDate' => $quest->start_date, // already string thanks to casting
                'endDate' => $quest->end_date,
                'prizes' => $quest->prizes,
                'image' => $quest->image,
            ],
            'categories' => $categories
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $quest = Quest::with('prizes')->findOrFail($id);

        $input = $request->all();

        // Validate
        $validator = Validator::make($input, [
            'title' => 'required|string|max:255',
            'brief' => 'required|string|max:255',
            'category_id' => 'required|integer|exists:quest_categories,id',
            'startDate' => 'required|date',
            'endDate' => 'required|date|after_or_equal:startDate',
            'prizes' => 'required|array|min:1',
            'prizes.*.id' => 'sometimes|integer|exists:prizes,id',
            'prizes.*.min' => 'required|integer|min:0',
            'prizes.*.max' => 'required|integer|gte:prizes.*.min',
            'prizes.*.coin' => 'nullable|integer|min:0',
            'prizes.*.title' => 'required|string|max:255',
            // Conditional validation for image
            'image' => [
                'nullable',
                function ($attribute, $value, $fail) {
                    if ($value instanceof \Illuminate\Http\UploadedFile) {
                        $validator = Validator::make([$attribute => $value], [
                            $attribute => 'file|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                        ]);
                        if ($validator->fails()) {
                            $fail($validator->errors()->first($attribute));
                        }
                    }
                },
            ],
        ]);


        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Handle image upload only if it is a file
        if ($request->hasFile('image')) {
            $input['image'] = $request->file('image')->store('uploads/quests', 'public');
        } else {
            // Keep old image if 'image' is a string (existing path) or null
            $input['image'] = $quest->image;
        }

        // Update quest
        $quest->update([
            'title' => $input['title'],
            'brief' => $input['brief'],
            'category_id' => $input['category_id'],
            'start_date' => $input['startDate'],
            'end_date' => $input['endDate'],
            'image' => $input['image'],
        ]);

        // Update prizes
        $existingPrizeIds = $quest->prizes->pluck('id')->toArray();
        $incomingPrizeIds = collect($input['prizes'])->pluck('id')->filter()->toArray();

        // Delete removed prizes
        $prizesToDelete = array_diff($existingPrizeIds, $incomingPrizeIds);
        if (!empty($prizesToDelete)) {
            Prize::destroy($prizesToDelete);
        }

        // Upsert prizes (update existing or create new)
        foreach ($input['prizes'] as $prizeData) {
            if (isset($prizeData['id']) && in_array($prizeData['id'], $existingPrizeIds)) {
                $prize = Prize::find($prizeData['id']);
                $prize->update([
                    'min' => $prizeData['min'],
                    'max' => $prizeData['max'],
                    'coin' => $prizeData['coin'],
                    'title' => $prizeData['title'],
                ]);
            } else {
                Prize::create([
                    'quest_id' => $quest->id,
                    'min' => $prizeData['min'],
                    'max' => $prizeData['max'],
                    'coin' => $prizeData['coin'],
                    'title' => $prizeData['title'],
                ]);
            }
        }

        return redirect()->route('user-dashboard.quest.index')
            ->with('success', 'Quest updated successfully.');
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
