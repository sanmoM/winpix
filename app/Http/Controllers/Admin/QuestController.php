<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PrizePool;
use App\Models\Quest;
use App\Models\QuestCategory;
use App\Models\QuestType;
use App\Models\Series;
use App\Models\User;
use App\Models\VotingOverrideLog;
use Inertia\Inertia;

class QuestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $quests = Quest::with(['prizes', 'user:id,name'])->get();

        return Inertia::render('Admin/Quest/show-quests', [
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
        $judges = User::where('role', 'jury')->select('id', 'name')->get();

        return Inertia::render('Admin/Quest/create-quest', [
            'categories' => $categories,
            'series' => $series,
            'types' => $types,
            'judges' => $judges,
            'prizePools' => PrizePool::all(),
        ]);
    }

    public function show(string $id)
    {
        $quest = Quest::with('prizes', 'category', 'quest_type', 'questSeries')->findOrFail($id);

        return Inertia::render('Admin/Quest/view-quest', [
            'quest' => [
                'id' => $quest->id,
                'title_en' => $quest->title_en,
                'brief_en' => $quest->brief_en,
                'title_ar' => $quest->title_ar,
                'brief_ar' => $quest->brief_ar,
                'category' => $quest->category,
                'startDate' => $quest->start_date,
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

                'quest_series' => $quest->questSeries,
                'quest_type' => $quest->quest_type,
                'rank_tier' => $quest->rank_tier,
            ],
            'prizePools' => PrizePool::all(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $quest = Quest::with('prizes', 'judges')->findOrFail($id);
        $series = Series::all();
        $categories = QuestCategory::all();
        $types = QuestType::all();
        $prizePools = PrizePool::all();
        $judges = User::where('role', 'jury')->select('id', 'name')->get();

        return Inertia::render('Admin/Quest/edit-quest', [
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
                'status' => $quest->status,
                'manual_override' => $quest->manual_override,
                'lead_judge' => $quest->lead_judge,
                'winner_declaration' => $quest->winner_declaration,
                'manual_override_end_date' => $quest->manual_override_end_date,
                'judges' => $quest->judges->pluck('user_id'),
                'vote_rights' => $quest->vote_rights,
            ],
            'categories' => $categories,
            'series' => $series,
            'types' => $types,
            'prizePools' => $prizePools,
            'judges' => $judges,

        ]);

    }

    public function destroy(string $id)
    {
        $quest = Quest::findOrFail($id);
        $quest->delete();

        return redirect()->back('success', 'Quest deleted successfully 🎉');
    }

    public function ContestLogs()
    {
        $loges = VotingOverrideLog::with('quest:id,title_en', 'admin:id,name')->get();

        return Inertia::render('Admin/Quest/quest-log', [
            'loges' => $loges,
        ]);
    }
}
