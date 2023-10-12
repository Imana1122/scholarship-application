<?php

namespace App\Http\Controllers;

use App\Http\Requests\SchoolProfileRequest;
use App\Http\Requests\SchoolProfileUpdateRequest;
use App\Http\Requests\SchoolRegisterRequest;
use App\Http\Requests\SchoolUpdateRequest;
use App\Models\School;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class SchoolController extends Controller
{
    public function registerSchool(SchoolRegisterRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('school_license_file')) {
            // Store the uploaded image in the 'public/images/trainers' directory
            $filePath = $request->file('school_license_file')->store('public/images/schools');


            $extension = 'png';
            $uniqueFilename = $data['school_phone'] . '_' . time() . '.' . $extension;

            // Move the uploaded file with a custom filename
            Storage::move($filePath, 'public/images/schools/' . $uniqueFilename);


            $data['school_license'] = 'schools/'.$uniqueFilename;
            echo('hello'.$data['school_license']);
        }
    // Create a new school
    $school = School::create([
        'school_name' => $data['school_name'],
        'school_type' => $data['school_type'],
        'school_email' => $data['school_email'],
        'school_phone' => $data['school_phone'],
        'school_address' => $data['school_address'],
        'school_category' => $data['school_category'],
        'established_date' => $data['established_date'],
        'principal_name' =>$data['principal_name'],
        'principal_email' => $data['principal_email'],
        'principal_phone' => $data['principal_phone'],
        'school_license' => $data['school_license'],
        'password' => $data['password'],
    ]);

    // Return a success message
    if ($school) {
        // Return a response with a 200 OK status code and success message
        return redirect('/user/schools')->with(['message'=>'Created Succesfully']);
    } else {
        // Return a response with a 500 Internal Server Error status code and error message
        return back();
    }
    }

    public function showUpdateForm(Request $request, $id){
        // Get the authenticated user
        $user = Auth::guard('user')->user();

        // Fetch the student using the provided $id
        $school = School::find($id);

        if (!$school) {
            // Return back with an error message
            return back()->with('error', 'School with ID ' . $id . ' not found.');
        }

        return Inertia::render('Admin/UpdateSchool', [
            'currentUser'=>$user,
            'school' => $school,
        ]);
    }

    public function updateSchool(SchoolUpdateRequest $request, $id){


        $school = School::findOrFail($id);

        if (!$school) {
            // Return a response with a 404 Not Found status code
            return redirect()->back()->with('error', 'School with ID ' . $id . ' not found.');
        }

        $data = $request->validated();

        // Check if a new image was uploaded
        if ($request->hasFile('school_license_file')) {
            // Delete the previous image if it exists
            $previousFile = $school->school_license;

            if ($previousFile && Storage::exists('public/images/' .$previousFile)) {
                Storage::delete('public/images/' . $previousFile);
            }

            // Store the new uploaded image in the 'public/images/trainers' directory
            $filePath = $request->file('school_license_file')->store('public/images/schools');


            $extension = 'png';
            $uniqueFilename = $data['school_phone'] . '_' . time() . '.' . $extension;

            // Move the uploaded file with a custom filename
            Storage::move($filePath, 'public/images/schools/' . $uniqueFilename);


            $data['school_license'] = 'schools/'.$uniqueFilename;
        }

        $updatedSchool = $school->update([
            'school_name' => $data['school_name'],
            'school_type' => $data['school_type'],
            'school_email' => $data['school_email'],
            'school_phone' => $data['school_phone'],
            'school_address' => $data['school_address'],
            'school_category' => $data['school_category'],
            'established_date' => $data['established_date'],
            'principal_name' =>$data['principal_name'],
            'principal_email' => $data['principal_email'],
            'principal_phone' => $data['principal_phone'],
            'school_license' => $data['school_license'],
        ]);

        if ($updatedSchool) {
            // Return a response with a 200 OK status code and success message

            return redirect('/user/schools')->with(['message'=>'Updated Succesfully']);
        } else {
            // Return a response with a 500 Internal Server Error status code and error message
            return back();
        }

    }

    public function delete(Request $request, $id)
    {
        // Fetch the school using the provided $id
        $school = School::findOrFail($id);

        if (!$school) {
            // Return a response with a 404 Not Found status code
            return response()->json(['error' => 'School with ID ' . $id . ' not found.'], 404);
        }

        $filePath = $school->school_license;

        if ($filePath && Storage::exists('public/images/' . $filePath)) {
            Storage::delete('public/images/' . $filePath);
        }

        // Delete the associated students
        if ($school->students) {
            $school->students->each(function ($student) {
                // Delete the student's image from storage
                if ($student->image && Storage::exists('public/images/' . $student->imagePath)) {
                    Storage::delete('public/images/' . $student->imagePath);
                }
                $student->delete();
            });
        }



        if ($school->delete()) {
            // Return a response with a 200 OK status code and success message
            return response()->json(['message' => 'School deleted successfully.'], 200);
        } else {
            // Return a response with a 500 Internal Server Error status code and error message
            return response()->json(['error' => 'Failed to delete school.'], 500);
        }
    }


    public function updateProfile(SchoolProfileRequest $request){
        // Get the authenticated user
        $school = Auth::guard('school')->user();

        if (!$school) {
            // Return a response with a 404 Not Found status code
            return response()->json(['error' => 'Not authenticated.'], 404);
        }

        $data = $request->validated();

        if ($request->hasFile('school_license_file')) {
            // Delete the previous image if it exists
            $previousFile = $school->school_license;

            if ($previousFile && Storage::exists('public/images/' .$previousFile)) {
                Storage::delete('public/images/' . $previousFile);
            }

            // Store the new uploaded image in the 'public/images/trainers' directory
            $filePath = $request->file('school_license_file')->store('public/images/schools');


            $extension = 'png';
            $uniqueFilename = $data['school_phone'] . '_' . time() . '.' . $extension;

            // Move the uploaded file with a custom filename
            Storage::move($filePath, 'public/images/schools/' . $uniqueFilename);


            $data['school_license'] = 'schools/'.$uniqueFilename;
        }



        $updatedSchool = $school->update([
            'school_name' => $data['school_name'],
            'school_type' => $data['school_type'],
            'school_email' => $data['school_email'],
            'school_phone' => $data['school_phone'],
            'school_address' => $data['school_address'],
            'school_category' => $data['school_category'],
            'established_date' => $data['established_date'],
            'principal_name' =>$data['principal_name'],
            'principal_email' => $data['principal_email'],
            'principal_phone' => $data['principal_phone'],
            'school_license' => $data['school_license'],
        ]);

        if ($updatedSchool) {
            // Return a JSON response with a 200 OK status code and success message
            return response()->json(['message' => 'Updated Successfully'], 200);
        } else {
            // Return a JSON response with a 500 Internal Server Error status code and error message
            return response()->json(['message' => 'Update Failed'], 500);
        }


    }

    public function updatePassword(Request $request){
        // Get the authenticated user
        $school = Auth::guard('school')->user();

        if (!$school) {
            // Return a response with a 404 Not Found status code
            return response()->json(['error' => 'Not authenticated.'], 404);
        }

        // Validate the password field
        $validator = Validator::make($request->all(), [
            'currentPassword' => [
                'required',
                function ($attribute, $value, $fail) use ($school) {
                    // Check if the provided current password matches the one in the database
                    if (!Hash::check($value, $school->password)) {
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

        $updatedUser = $school->update([
            'password' => $request->input('password'),

        ]);

        if ($updatedUser) {
            // Return a JSON response with a 200 OK status code and success message
            return response()->json(['message' => 'Updated Successfully'], 200);
        } else {
            // Return a JSON response with a 500 Internal Server Error status code and error message
            return response()->json(['message' => 'Update Failed'], 500);
        }


    }

    public function showProfile(Request $request){
        // Get the authenticated user
        $school = Auth::guard('school')->user();

        if (!$school) {
            // Return back with an error message
            return redirect()->back()->with('error', 'Not Authenticated');
        }

        return Inertia::render('Profile/School/Edit', [
            'currentUser'=>$school,
        ]);
    }

    public function deleteProfile(Request $request)
    {
        $school = Auth::guard('school')->user();

        if (!$school) {
            // Return a response with a 404 Not Found status code
            return response()->json(['error' => 'Not Authenticated.'], 404);
        }

        $validator = Validator::make($request->all(), [
            'password' => [
                'required',
                function ($attribute, $value, $fail) use ($school) {
                    // Check if the provided current password matches the one in the database
                    if (!Hash::check($value, $school->password)) {
                        $fail('The current password is incorrect.');
                    }
                },
            ]
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
            // You can change the response format or HTTP status code as needed
        }

        // Check if the provided password matches the database password
        if (!Hash::check($request->input('password'), $school->password)) {
            return back()->withErrors(['password' => 'Incorrect password'])->withInput();
            // Redirect back with a custom error message for the password field
        }

        $filePath = $school->school_license;

        if ($filePath && Storage::exists('public/images/' . $filePath)) {
            Storage::delete('public/images/' . $filePath);
        }

        // Delete the associated students
        if ($school->students){
            $school->students->each(function ($student) {
                // Delete the student's image from storage
                if ($student->image && Storage::exists('public/images/' . $student->imagePath)) {
                    Storage::delete('public/images/' . $student->imagePath);
                }
                $student->delete();
            });
        }


        // Clear the user's session and logout
        Auth::guard('school')->logout();
        $request->session()->invalidate();

        if ($school->delete()) {
            // Return a response with a 200 OK status code and success message
            return response()->json(['message' => 'User deleted successfully.'], 200);
        } else {
            // Return a response with a 500 Internal Server Error status code and error message
            return response()->json(['error' => 'Failed to delete user.'], 500);
        }
    }



    public function getSchoolsWithStudents(){
        $user = Auth::guard('user')->user();

        // Retrieve schools with students
        $schoolsWithStudents = School::all();

        // Initialize an array to store categorized students for each school
        $schoolsWithCategorizedStudents = [];

        // Loop through each school
        foreach ($schoolsWithStudents as $school) {

            $students = $school->students()->orderBy('symbol_number')->get();

            // Retrieve 'Passed' students in ascending order of 'rank'
            $passedStudents = $school->students()->where('result', 'Passed')
                ->orderBy('rank')
                ->get();

            // Retrieve 'Failed' students in ascending order of 'rank'
            $failedStudents = $school->students()->where('result', 'Failed')
                ->orderBy('rank')
                ->get();

            // Retrieve 'On Hold' students in ascending order of 'rank'
            $onHoldStudents = $school->students()->where('result', 'On Hold')
                ->orderBy('rank')
                ->get();

            // Create an array for this school's data
            $schoolData = [
                'id' => $school->id,
                'school_name' => $school->school_name,
                'school_type' => $school->school_type,
                'school_email' => $school->school_email,
                'school_phone' => $school->school_phone,
                'school_address' => $school->school_address,
                'school_category' => $school->school_category,
                'established_date' => $school->established_date,
                'principal_name' => $school->principal_name,
                'principal_email' => $school->principal_email,
                'principal_phone' => $school->principal_phone,
                'school_license' => $school->school_license,
                'students' => [
                    'All' => $students,
                    'Passed' => $passedStudents,
                    'Failed' => $failedStudents,
                    'On Hold' => $onHoldStudents,
                ],
            ];

            // Add this school's data to the result array
            $schoolsWithCategorizedStudents[] = $schoolData;
        }

        return Inertia::render('Admin/Schools', ['schoolsWithStudents' => $schoolsWithCategorizedStudents, 'currentUser' => $user]);
    }


}
