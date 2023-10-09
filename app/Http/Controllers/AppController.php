<?php

namespace App\Http\Controllers;

use App\Models\ApplicationImage;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AppController extends Controller
{
    //
    public function index()
    {
        $images = ApplicationImage::all();
        return Inertia::render('Welcome',['images'=>$images]);
    }

    public function chooseUser(){
        return Inertia::render('User/ChooseUser');
    }

    public function showUserDashboard(){
        $user = Auth::guard('user')->user();
        return Inertia::render('Admin/Dashboard',['currentUser'=>$user]);
    }

    public function showSchoolDashboard(){
        // Get the authenticated school
        $school = Auth::guard('school')->user();
        return Inertia::render('School/Dashboard',['currentUser'=>$school]);
    }
}
