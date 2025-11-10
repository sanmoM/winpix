<?php

namespace App\Http\Controllers\UserDashboard;

use App\Http\Controllers\Controller;
use App\Models\Prize;
use App\Models\Quest;
use App\Models\QuestCategory;
use App\Models\Series;
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
        $series = Series::all();
        return Inertia::render('user-dashboard/quest/create-quest', [
            'categories' => $categories,
            'series' => $series,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        // Get authenticated user
        $user = auth()->user(); // full user model
        $userId = $user->id;    // or just use auth()->id()
        // dd($userId);

        $input = $request->all();
// return $input;
        // Validate request
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
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'entry_coin' => 'required|integer|min:0',
            'level_requirement' => 'nullable|string|max:255',
            'categories_requirement' => 'nullable|string|max:255',
            'copyright_requirement' => 'nullable|string|max:255',
            'quest_series_id' => 'required|integer|exists:series,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

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
            'user_id' => $userId,
            'entry_coin' => $input['entry_coin'],
            'level_requirement' => $input['level_requirement'],
            'categories_requirement' => $input['categories_requirement'],
            'copyright_requirement' => $input['copyright_requirement'],
            'quest_series_id' => $input['quest_series_id'],
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

        return redirect()->route('user-dashboard.quest.index');
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
        $series = Series::all();
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
                'entry_coin' => $quest->entry_coin,
                'level_requirement' => $quest->level_requirement,
                'categories_requirement' => $quest->categories_requirement,
                'copyright_requirement' => $quest->copyright_requirement,
                'quest_series_id' => $quest->quest_series_id,
            ],
            'categories' => $categories,
            'series' => $series,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $quest = Quest::with('prizes')->findOrFail($id);

        $input = $request->all();

        // return $input;

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
            'entry_coin' => 'required|integer|min:0',
            'level_requirement' => 'nullable|string|max:255',
            'categories_requirement' => 'nullable|string|max:255',
            'copyright_requirement' => 'nullable|string|max:255',
            'quest_series_id' => 'integer|exists:series,id',
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
            'entry_coin' => $input['entry_coin'],
            'level_requirement' => $input['level_requirement'],
            'categories_requirement' => $input['categories_requirement'],
            'copyright_requirement' => $input['copyright_requirement'],
            'quest_series_id' => $input['quest_series_id'],
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
        // delete prizes
        Prize::where('quest_id', $id)->delete();
        Quest::destroy($id);
        return redirect()->route('user-dashboard.quest.index');
    }
}
