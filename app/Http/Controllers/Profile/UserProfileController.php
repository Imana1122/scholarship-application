<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserProfileController extends Controller
{
    public function showUpdateForm()
    {
        // Make sure the authenticated user can only access their own profile
        $user = auth()->user();

        return Inertia::render('Profile/Edit', [
            'user' => $user,
        ]);
    }
}
