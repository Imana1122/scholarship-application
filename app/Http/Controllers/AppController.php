<?php

namespace App\Http\Controllers;

use App\Models\ApplicationImage;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
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

    public function storageLink(){
        // Run the Artisan command
       $exitCode =  Artisan::call('storage:link');

       // Capture the output of the command
       $output = Artisan::output();

       if ($exitCode === 0) {
           return "Storage Linked.. Output: $output";
       } else {
           return "Command failed. Output: $output";
       }
    }

    public function migrateRollback(){
        // Run the Artisan command
       $exitCode =  Artisan::call('migrate:rollback');

       // Capture the output of the command
       $output = Artisan::output();

       if ($exitCode === 0) {
           return "Migration rollbacked.. Output: $output";
       } else {
           return "Command failed. Output: $output";
       }
    }
}
