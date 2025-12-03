<?php

namespace App\Http\Controllers\UserDashboard;

use App\Http\Controllers\Controller;
use App\Models\Prize;
use App\Models\Quest;
use App\Models\QuestCategory;
use App\Models\QuestType;
use App\Models\Series;
use App\Services\RankingService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class QuestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $quests = Quest::where('user_id', auth()->user()->id)->get();
        $quests = Quest::where('user_id', auth()->id())
            ->get();

        return Inertia::render('user-dashboard/quest/show-quests', [
            'quests' => $quests,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = QuestCategory::all();
        $series = Series::all();
        $types = QuestType::all();

        return Inertia::render('user-dashboard/quest/create-quest', [
            'categories' => $categories,
            'series' => $series,
            'types' => $types,
            'rank_tiers' => RankingService::RANK_TIERS,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Get authenticated user
        $user = auth()->user();
        $userId = $user->id;
        $input = $request->all();

        // Validate request
        $validator = Validator::make($input, [
            'title_en' => 'required|string|max:255',
            'brief_en' => 'required',
            'title_ar' => 'required|string|max:255',
            'brief_ar' => 'required',
            'category_id' => 'required|integer|exists:quest_categories,id',
            'startDate' => 'required|string|max:255',
            'endDate' => 'required|string|max:255',
            'prizes' => 'required|array|min:1',
            'prizes.*.min' => 'required|integer|min:0',
            'prizes.*.max' => 'required|integer|gte:prizes.*.min',
            'prizes.*.coin' => 'required|integer|min:0',
            'prizes.*.title' => 'required|string|max:255',
            'prizes.*.coinType' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'entry_coin' => 'required|integer|min:0',
            'level_requirement' => 'nullable|string|max:255',
            'categories_requirement' => 'nullable|string|max:255',
            'copyright_requirement' => 'nullable|string|max:255',

            'level_requirement_ar' => 'nullable|string|max:255',
            'categories_requirement_ar' => 'nullable|string|max:255',
            'copyright_requirement_ar' => 'nullable|string|max:255',

            'quest_series_id' => 'required|integer|exists:series,id',
            'quest_type_id' => 'required|integer|exists:quest_types,id',
            'rank_tier' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Handle image upload
        if ($request->hasFile('image')) {
            $input['image'] = $request->file('image')->store('uploads/quests', 'public');
        }

        // // Create quest
        $quest = Quest::create([
            'title_en' => $input['title_en'],
            'brief_en' => $input['brief_en'],
            'title_ar' => $input['title_ar'],
            'brief_ar' => $input['brief_ar'],
            'category_id' => $input['category_id'],
            'start_date' => $input['startDate'],
            'end_date' => $input['endDate'],
            'image' => $input['image'] ?? null,
            'status' => 'active',
            'user_id' => $userId,
            'entry_coin' => $input['entry_coin'],
            'level_requirement_en' => $input['level_requirement_en'],
            'categories_requirement_en' => $input['categories_requirement_en'],
            'copyright_requirement_en' => $input['copyright_requirement_en'],

            'level_requirement_ar' => $input['level_requirement_ar'],
            'categories_requirement_ar' => $input['categories_requirement_ar'],
            'copyright_requirement_ar' => $input['copyright_requirement_ar'],

            'quest_series_id' => $input['quest_series_id'],
            'quest_type_id' => $input['quest_type_id'],
            'rank_tier' => $input['rank_tier'],
        ]);

        // Create prizes
        foreach ($input['prizes'] as $prizeData) {
            Prize::create([
                'quest_id' => $quest->id,
                'min' => $prizeData['min'],
                'max' => $prizeData['max'],
                'coin' => $prizeData['coin'],
                'title' => $prizeData['title'],
                'coinType' => $prizeData['coinType'],
            ]);
        }

        return redirect()->route('admin.quest')
            ->with('success', 'Quest created successfully.');
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
        $types = QuestType::all();

        return Inertia::render('user-dashboard/quest/edit-quest', [
            'quest' => [
                'id' => $quest->id,
                'title_en' => $quest->title_en,
                'brief_en' => $quest->brief_en,
                'title_ar' => $quest->title_ar,
                'brief_ar' => $quest->brief_ar,
                'category_id' => (string) $quest->category_id,
                'startDate' => $quest->start_date, // already string thanks to casting
                'endDate' => $quest->end_date,
                'prizes' => $quest->prizes,
                'image' => $quest->image,
                'entry_coin' => $quest->entry_coin,
                'level_requirement_en' => $quest->level_requirement_en,
                'categories_requirement_en' => $quest->categories_requirement_en,
                'copyright_requirement_en' => $quest->copyright_requirement_en,

                'level_requirement_ar' => $quest->level_requirement_ar,
                'categories_requirement_ar' => $quest->categories_requirement_ar,
                'copyright_requirement_ar' => $quest->copyright_requirement_ar,

                'quest_series_id' => $quest->quest_series_id,
                'quest_type_id' => $quest->quest_type_id,
                'rank_tier' => $quest->rank_tier,
            ],
            'categories' => $categories,
            'series' => $series,
            'types' => $types,
        ]);
    }

    public function update(Request $request, string $id)
    {
        $quest = Quest::with('prizes')->findOrFail($id);
        $input = $request->all();

        // Validation (same as before)
        $validator = Validator::make($input, [
            'title_en' => 'required|string|max:255',
            'brief_en' => 'required',
            'title_ar' => 'required|string|max:255',
            'brief_ar' => 'required',
            'category_id' => 'required|integer|exists:quest_categories,id',
            'startDate' => 'required|date',
            'endDate' => 'required|date|after_or_equal:startDate',
            'prizes' => 'required|array|min:1',
            'prizes.*.id' => 'sometimes|integer|exists:prizes,id',
            'prizes.*.min' => 'required|integer|min:0',
            'prizes.*.max' => 'required|integer|gte:prizes.*.min',
            'prizes.*.coin' => 'nullable|integer|min:0',
            'prizes.*.title' => 'required|string|max:255',
            'prizes.*.coinType' => 'required|string|max:255',
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

            'level_requirement_ar' => 'nullable|string|max:255',
            'categories_requirement_ar' => 'nullable|string|max:255',
            'copyright_requirement_ar' => 'nullable|string|max:255',

            'quest_series_id' => 'integer|exists:series,id',
            'quest_type_id' => 'integer|exists:quest_types,id',
            'rank_tier' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // ✅ Handle image upload and delete old one if replaced
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($quest->image && Storage::disk('public')->exists($quest->image)) {
                Storage::disk('public')->delete($quest->image);
            }

            // Upload new one
            $input['image'] = $request->file('image')->store('uploads/quests', 'public');
        } else {
            // Keep the existing image if no new file uploaded
            $input['image'] = $quest->image;
        }

        // Update quest
        $quest->update([

            'title_en' => $input['title_en'],
            'brief_en' => $input['brief_en'],
            'title_ar' => $input['title_ar'],
            'brief_ar' => $input['brief_ar'],
            'category_id' => $input['category_id'],
            'start_date' => $input['startDate'],
            'end_date' => $input['endDate'],
            'image' => $input['image'],
            'entry_coin' => $input['entry_coin'],

            'level_requirement_en' => $input['level_requirement_en'],
            'categories_requirement_en' => $input['categories_requirement_en'],
            'copyright_requirement_en' => $input['copyright_requirement_en'],

            'level_requirement_ar' => $input['level_requirement_ar'],
            'categories_requirement_ar' => $input['categories_requirement_ar'],
            'copyright_requirement_ar' => $input['copyright_requirement_ar'],

            'quest_series_id' => $input['quest_series_id'],
            'quest_type_id' => $input['quest_type_id'],
            'rank_tier' => $input['rank_tier'],
        ]);

        // (Prizes update logic same as before...)

        return redirect()->route('admin.quest')
            ->with('success', 'Quest updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $quest = Quest::findOrFail($id);
        $quest->delete(); // This triggers all cascading deletes

        return redirect()->route('user-dashboard.quest.index');
    }
}
