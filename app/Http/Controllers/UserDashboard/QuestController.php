<?php

namespace App\Http\Controllers\UserDashboard;

use App\Http\Controllers\Controller;
use App\Models\JudgePanel;
use App\Models\Prize;
use App\Models\Quest;
use App\Models\QuestCategory;
use App\Models\QuestType;
use App\Models\Series;
use App\Models\VotingOverrideLog;
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
    // public function index()
    // {
    //     // $quests = Quest::where('user_id', auth()->user()->id)->get();
    //     $quests = Quest::where('user_id', auth()->id())
    //         ->get();

    //     return Inertia::render('user-dashboard/quest/show-quests', [
    //         'quests' => $quests,
    //     ]);
    // }

    /**
     * Show the form for creating a new resource.
     */
    // public function create()
    // {
    //     $categories = QuestCategory::all();
    //     $series = Series::all();
    //     $types = QuestType::all();

    //     return Inertia::render('user-dashboard/quest/create-quest', [
    //         'categories' => $categories,
    //         'series' => $series,
    //         'types' => $types,
    //         'rank_tiers' => RankingService::RANK_TIERS,
    //     ]);
    // }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
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
            'prizes.*.prize_pool' => 'required|integer|exists:prize_pools,id',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'entry_coin' => 'required|integer|min:0',
            'level_requirement' => 'nullable|string|max:255',
            'categories_requirement' => 'nullable|string|max:255',
            'copyright_requirement' => 'nullable|string|max:255',

            'level_requirement_ar' => 'nullable|string|max:255',
            'categories_requirement_ar' => 'nullable|string|max:255',
            'copyright_requirement_ar' => 'nullable|string|max:255',

            'quest_series_id' => 'required|integer|exists:series,id',
            'quest_type_id' => 'required|integer|exists:quest_types,id',

            'winner_declaration' => 'nullable|string|in:auto,admin,judges',

            'vote_rights' => 'required|string|in:Public,Judges,Hybrid',
            'judges' => 'required_if:winner_declaration,judges|array',
            'judges.*' => 'exists:users,id',

            'lead_judge' => [
                'nullable',
                'required_if:winner_declaration,judges',
                'exists:users,id',
            ],
            'manual_override' => 'required',
            'manual_override_end_date' => 'required_if:manual_override,Force_Open',

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
            'title_en' => $input['title_en'],
            'brief_en' => $input['brief_en'],
            'title_ar' => $input['title_ar'],
            'brief_ar' => $input['brief_ar'],
            'category_id' => $input['category_id'],
            'start_date' => $input['startDate'],
            'end_date' => $input['endDate'],
            'image' => $input['image'] ?? null,
            'status' => $input['status'],
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

            'vote_rights' => $input['vote_rights'],
            'winner_declaration' => $input['winner_declaration'],
            'manual_override' => $input['manual_override'],
            'manual_override_end_date' => $input['manual_override_end_date'],
            'lead_judge' => $input['lead_judge'] ?? null,

        ]);

        // Create prizes
        foreach ($input['prizes'] as $prizeData) {
            Prize::create([
                'quest_id' => $quest->id,
                'min' => $prizeData['min'],
                'max' => $prizeData['max'],
                'coin' => $prizeData['coin'],
                'title' => $prizeData['title'],
                'prize_pool' => $prizeData['prize_pool'],
            ]);
        }

        if (isset($input['judges']) && is_array($input['judges'])) {
            foreach ($input['judges'] as $judge) {
                JudgePanel::create([
                    'quest_id' => $quest->id,
                    'user_id' => $judge,
                ]);
            }
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

    public function update(Request $request, string $id)
    {
        $quest = Quest::with('prizes')->findOrFail($id);
        $input = $request->all();

        $oldStatus = $quest->manual_override ?? 'None';
        $newStatus = $request->input('manual_override') ?? 'None';
        $statusChanged = $oldStatus !== $newStatus;

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
            'prizes.*.prize_pool' => 'required|integer|exists:prize_pools,id',
            'image' => [
                function ($attribute, $value, $fail) {
                    if ($value instanceof \Illuminate\Http\UploadedFile) {
                        $validator = Validator::make([$attribute => $value], [
                            $attribute => 'file|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
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

            'winner_declaration' => 'nullable|string|in:auto,admin,judges',
            'vote_rights' => 'required|string|in:Public,Judges,Hybrid',

            'judges' => 'required_if:winner_declaration,judges|array',
            'judges.*' => 'exists:users,id',

            'lead_judge' => [
                'required_if:winner_declaration,judges',
                'exists:users,id',
            ],
            'manual_override' => 'required',
            'reason' => 'nullable|string',
            'manual_override_end_date' => 'required_if:manual_override,Force_Open',

        ]);

        if ($statusChanged) {
            $rules['reason'] = 'required|string|min:5|max:500';
        }

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if ($request->hasFile('image')) {
            if ($quest->image && Storage::disk('public')->exists($quest->image)) {
                Storage::disk('public')->delete($quest->image);
            }

            // Upload new one
            $input['image'] = $request->file('image')->store('uploads/quests', 'public');
        } else {
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
            'winner_declaration' => $input['winner_declaration'],
            'vote_rights' => $input['vote_rights'],
            'lead_judge' => $input['lead_judge'] ?? null,
            'manual_override' => $newStatus,
            'manual_override_end_date' => $input['manual_override_end_date'],
        ]);

        Prize::where('quest_id', $id)->delete();

        foreach ($input['prizes'] as $prizeData) {
            Prize::create([
                'quest_id' => $quest->id,
                'min' => $prizeData['min'],
                'max' => $prizeData['max'],
                'coin' => $prizeData['coin'],
                'title' => $prizeData['title'],
                'prize_pool' => $prizeData['prize_pool'],
            ]);
        }

        JudgePanel::where('quest_id', $quest->id)->delete();

        if (isset($input['judges']) && is_array($input['judges'])) {
            foreach ($input['judges'] as $judgeId) {
                JudgePanel::create([
                    'quest_id' => $quest->id,
                    'user_id' => $judgeId,
                ]);
            }
        }

        if ($statusChanged) {
            VotingOverrideLog::create([
                'contest_id' => $quest->id,
                'admin_id' => auth()->id(),
                'action' => $newStatus,
                'reason' => $request->input('reason'),
            ]);
        }

        return redirect()->route('admin.quest')
            ->with('success', 'Quest updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $quest = Quest::findOrFail($id);
        $quest->judges()->delete();
        $quest->delete();

        return redirect()->back()
            ->with('success', 'Quest deleted successfully.');
    }
}
