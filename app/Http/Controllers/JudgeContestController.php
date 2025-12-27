<?php

namespace App\Http\Controllers;

use App\Models\JudgePanel;
use App\Models\Quest;
use Inertia\Inertia;

class JudgeContestController extends Controller
{
    public function index()
    {

        return $panel = JudgePanel::where('user_id', auth()->user()->id)->with('user')->with('quest')->orderBy('id', 'desc')->get();

        return Inertia::render('Jury/Contest/Index', [
            'panel' => $panel,
        ]);

    }

    public function leadJudge()
    {

        return $panel = Quest::where('lead_judge', auth()->user()->id)->orderBy('id', 'desc')->get();

        return Inertia::render('Jury/Contest/Index', [
            'panel' => $panel,
        ]);

    }
}
