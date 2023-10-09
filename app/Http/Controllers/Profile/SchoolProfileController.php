<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SchoolProfileController extends Controller
{
    public function showUpdateForm()
    {
        // Make sure the authenticated user can only access their own profile
        $school = auth()->school();

        return Inertia::render('Profile/EditSchool', [
            'user' => $school,
        ]);
    }
}
