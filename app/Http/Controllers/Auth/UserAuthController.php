<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserLoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserAuthController extends Controller
{
    public function showLoginForm(){
        return Inertia::render('Auth/User/Login');
    }

    public function login(UserLoginRequest $request)
{
    $credentials = $request->only('phone_number', 'password');
    $remember = $request->has('remember_me');

    if (Auth::guard('user')->attempt($credentials, $remember)) {
        // Authenticate the school user and set the session variable
        $user = Auth::guard('user')->user();
        session(['user_id' => $user->id]);

        return redirect('/user/dashboard'); // Redirect to the school user dashboard
    } else {
        // Authentication failed...
        return back()->withErrors(['password' => 'Incorrect password'])->withInput();
    }
}

    public function logout(Request $request)
    {
        Auth::guard('user')->logout();
        return redirect('/auth/school-login-form'); // Redirect after school user logout
    }

    public function showRegisterForm(Request $request){
        $user = Auth::guard('user')->user();
        return Inertia::render('Admin/NewUser',['currentUser'=>$user]);
    }
}
