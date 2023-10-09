<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        // Attempt to authenticate the user as a school
        if (Auth::guard('school')->attempt($request->only('phone_number', 'password'))) {
            return redirect()->route('school-dashboard');
        }

        // Attempt to authenticate the user as a regular user
        if (Auth::guard('user')->attempt($request->only('phone_number', 'password'))) {
            return redirect()->route('user-dashboard');
        }

        // If authentication fails for both guards, throw a ValidationException with a custom error message
        throw ValidationException::withMessages([
            'login' => ['Invalid credentials'], // Customize the error message here
        ]);
    }
}
