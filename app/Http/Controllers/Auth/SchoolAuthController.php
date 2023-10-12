<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\SchoolLoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Str;
use Inertia\Inertia;

class SchoolAuthController extends Controller
{
    public function showRegisterForm()
    {
        $user = Auth::guard('user')->user();
        return Inertia::render('Admin/NewSchool',['currentUser'=>$user]);
    }

    public function showLoginForm()
    {
        return Inertia::render('Auth/School/Login');
    }

    public function login(SchoolLoginRequest $request)
    {
        $credentials = $request->only('school_phone', 'password');
        $remember = $request->has('remember_me');

        if (Auth::guard('school')->attempt($credentials, $remember)) {
            // Authenticate the school user and set the session variable
            $school = Auth::guard('school')->user();
            session(['school_id' => $school->id]);
            return redirect('/school/dashboard'); // Redirect to the school user dashboard
        }
         else {
            // Authentication failed...
            return back()->withErrors(['password' => 'Incorrect password'])->withInput();
        }
    }

    public function logout(Request $request)
    {
        Auth::guard('school')->logout();

    }
}
