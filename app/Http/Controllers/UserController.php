<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Requests\UserRegisterRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class UserController extends Controller
{

    public function showRegisterForm(){

        $user = auth('user')->user();
        return Inertia::render('Admin/NewUser',['currentUser'=>$user]);
    }

    public function showUsersForAdmin()
    {
        $user = auth('user')->user();

        // Retrieve users with their associated roles
        $users = User::with('role')->get();

        return Inertia::render('Admin/Users', ['currentUser' => $user, 'users' => $users]);
    }


    public function registerUser(UserRegisterRequest $request){
        echo('hello');
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'phone_number' => $data['phone_number'],
            'password' => $data['password'],
            'role_id'=>$data['role_id']
        ]);

        if ($user) {
            // Return a response with a 200 OK status code and success message
            return redirect('/user/users')->with(['message'=>'Created Succesfully']);
        } else {
            // Return a response with a 500 Internal Server Error status code and error message
            return back();
        }
    }

    public function showUpdateForm(Request $request, $id){
        // Get the authenticated school
        $user = Auth::guard('user')->user();

        // Fetch the student using the provided $id
        $user = User::find($id);

        if (!$user) {
            // Return back with an error message
            return redirect()->back()->with('error', 'User with ID ' . $id . ' not found.');
        }

        return Inertia::render('Admin/UpdateUser', [
            'currentUser'=>$user,
            'user' => $user,
        ]);
    }

    public function updateUser(UserUpdateRequest $request, $id){
        $currentUser = Auth::guard('user')->user();

        // Check if the current user is superadmin (role_id = 2) or has some other appropriate role
        if ($currentUser->role_id === 2) {
            // Current user has the necessary privileges to perform the update
            $user = User::findOrFail($id);

            if (!$user) {
                // Return a response with a 404 Not Found status code
                return back()->with('error', 'User with ID ' . $id . ' not found.');
            }

            $data = $request->validated();

            $updatedUser = $user->update([
                'name' => $data['name'],
                'phone_number' => $data['phone_number'],
                'role_id' => $data['role_id'],
            ]);

            if ($updatedUser) {
                // Return a response with a 200 OK status code and success message
                return redirect('/user/users');
            } else {
                // Return a response with a 500 Internal Server Error status code and error message
                return back()->withErrors(['error' => 'Internal Server Error']);
            }
        } else {
            // Current user does not have the necessary privileges
            return back()->withErrors(['error' => 'You do not have permission to update user.']);
        }
    }

    public function showProfile(Request $request){
        // Get the authenticated user
        $user = Auth::guard('user')->user();

        if (!$user) {
            // Return back with an error message
            return redirect()->back()->with('error', 'Not Authenticated');
        }

        return Inertia::render('Profile/User/Edit', [
            'currentUser'=>$user,
        ]);
    }

    public function updateProfileInformation(ProfileUpdateRequest $request){
        // Get the authenticated user
        $user = Auth::guard('user')->user();

        if (!$user) {
            // Return a response with a 404 Not Found status code
            return response()->json(['error' => 'Not authenticated.'], 404);
        }

        $data = $request->validated();



        $updatedUser = $user->update([
            'name' => $data['name'],
            'phone_number' => $data['phone_number'],
        ]);

        if ($updatedUser) {
            // Return a JSON response with a 200 OK status code and success message
            return response()->json(['message' => 'Updated Successfully'], 200);
        } else {
            // Return a JSON response with a 500 Internal Server Error status code and error message
            return response()->json(['message' => 'Update Failed'], 500);
        }

    }

    public function updatePassword(Request $request){
        // Get the authenticated user
        $user = Auth::guard('user')->user();

        if (!$user) {
            // Return a response with a 404 Not Found status code
            return response()->json(['error' => 'Not authenticated.'], 404);
        }

        // Validate the password field
        $validator = Validator::make($request->all(), [
            'currentPassword' => [
                'required',
                function ($attribute, $value, $fail) use ($user) {
                    // Check if the provided current password matches the one in the database
                    if (!Hash::check($value, $user->password)) {
                        $fail('The current password is incorrect.');
                    }
                },
            ],
            'password' => [
                'required',
                'string',
                'confirmed',
                'min:8', // Minimum 8 characters
                'regex:/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/',
                // The regex enforces at least one uppercase, one lowercase, one number, and one special character.
            ],
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
            // You can change the response format or HTTP status code as needed
        }

        $updatedUser = $user->update([
            'password' => $request->password,
        ]);

        if ($updatedUser) {
            // Return a JSON response with a 200 OK status code and success message
            return response()->json(['message' => 'Updated Successfully'], 200);
        } else {
            // Return a JSON response with a 500 Internal Server Error status code and error message
            return response()->json(['message' => 'Update Failed'], 500);
        }

    }

    public function deleteProfile(Request $request)
    {
        $user = Auth::guard('user')->user();

        if (!$user) {
            // Return a response with a 404 Not Found status code
            return response()->json(['error' => 'Not Authenticated.'], 404);
        }

        // Check if the user has the role ID that you want to protect (e.g., role ID 2 for superadmins)
        if ($user->role_id === 2) {
            // Return a response with a 403 Forbidden status code and a message indicating that deletion is not allowed
            return response()->json(['error' => 'Deletion of superadmin user is not allowed.'], 403);
        }

        // Validate the provided password
        $validator = Validator::make($request->all(), [
            'password' => [
                'required',
                function ($attribute, $value, $fail) use ($user) {
                    // Check if the provided current password matches the one in the database
                    if (!Hash::check($value, $user->password)) {
                        $fail('The current password is incorrect.');
                    }
                },
            ]
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
            // Redirect back with validation errors and input data
        }

        // Check if the provided password matches the database password
        if (!Hash::check($request->input('password'), $user->password)) {
            return back()->withErrors(['password' => 'Incorrect password'])->withInput();
            // Redirect back with a custom error message for the password field
        }

        // Clear the user's session and logout
        Auth::guard('user')->logout();
        $request->session()->invalidate();

        if ($user->delete()) {
            // Return a response with a 200 OK status code and success message
            return response()->json(['message' => 'User deleted successfully.'], 200);
        } else {
            // Return a response with a 500 Internal Server Error status code and error message
            return response()->json(['error' => 'Failed to delete user.'], 500);
        }
    }
    public function delete(Request $request, $id)
    {
        // Check if the current user is superadmin (role_id = 2) or has some other appropriate role
        if (auth()->user()->role_id === 2) {
            $user = User::find($id);

            if (!$user) {
                return response()->json(['error' => 'User with ID ' . $id . ' not found.'], 404);
            }

            // Check if the user has the role ID that you want to protect (e.g., role ID 2 for superadmins)
            if ($user->role_id === 2) {
                return response()->json(['error' => 'Deletion of superadmin user is not allowed.'], 403);
            }


            if ($user->delete()) {
                return response()->json(['message' => 'User deleted successfully.'], 200);
            } else {
                return response()->json(['error' => 'Failed to delete user.'], 500);
            }
        } else {
            return response()->json(['error' => 'You do not have permission to delete user.'], 403);
        }
    }



}
