<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = Transaction::with('user:id,name')
            ->latest()
            ->paginate(10);

        return Inertia::render('Transaction/Index', [
            'transactions' => $transactions,
        ]);
    }

    public function adminIndex()
    {
        $transactions = Transaction::with('user:id,name')
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/Transaction/Index', [
            'transactions' => $transactions,
        ]);
    }
}
