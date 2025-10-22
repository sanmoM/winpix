<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DiscoverController extends Controller
{
    public function discover()
    {
        return Inertia::render('discover');
    }
}
