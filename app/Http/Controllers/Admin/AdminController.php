<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function admin(Request $request): Response
    {
         return Inertia::render('Admin/Dashboard');
    }
}
