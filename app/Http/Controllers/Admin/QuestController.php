<?php

namespace App\Http\Controllers\Admin;

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

        return Inertia::render('Admin/Quest/create-quest', [
            'categories' => $categories,
            'series' => $series,
            'types' => $types,
            'rank_tiers' => RankingService::RANK_TIERS,
        ]);
    }
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

        return Inertia::render('Admin/Quest/edit-quest', [
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
                'quest_type_id' => $quest->quest_type_id,
                'rank_tier' => $quest->rank_tier,
            ],
            'categories' => $categories,
            'series' => $series,
            'types' => $types,
            'rank_tiers' => RankingService::RANK_TIERS,

        ]);
    }

    public function destroy(string $id)
    {
        $quest = Quest::findOrFail($id);
        $quest->delete();

        return redirect()->route('user-dashboard.quest.index');
    }
}
