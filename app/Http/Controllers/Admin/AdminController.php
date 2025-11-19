<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Quest;
use App\Models\User;
use App\Models\Visitor;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function admin(Request $request): Response
    {
        // Basic stats
        $totalUsers = User::where('role', 'user')->count();
        $totalQuests = Quest::count();
        $totalVisitors = Visitor::count();

        $monthlyVisitors = array_fill(0, 12, 0);
        $visitorData = Visitor::selectRaw('MONTH(visit_date) as month, COUNT(*) as total')
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        foreach ($visitorData as $row) {
            $monthlyVisitors[$row->month - 1] = $row->total;
        }

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'users' => $totalUsers,
                'quests' => $totalQuests,
                'visitors' => $totalVisitors,
            ],
            'visitorChart' => [
                'labels' => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                'data' => $monthlyVisitors,
            ],
        ]);
    }
}
