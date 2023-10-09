<?php

namespace App\Http\Controllers;

use App\Models\Scholarship;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class StudentScholarshipController extends Controller
{

    public function showScholarshipApplicationForm(){
        // Retrieve the is_open value from the scholarships table
        $scholarship = Scholarship::first();

        // Pass the is_open value to the view
        return Inertia::render('User/Scholarship', ['tab' => 'Apply', 'isScholarshipOpen' => $scholarship->is_open]);
    }

    public function showScholarshipApplicationUpdateForm()
    {
        // Get the authenticated user
        $user = Auth::guard('user')->user();

        $scholarship = Scholarship::firstOrFail();
        return Inertia::render('Admin/ScholarshipStatus', ['scholarship'=>$scholarship, 'currentUser'=>$user]);
    }

    public function updateScholarshipApplicationStatus(Request $request)
    {
        try {
            $scholarshipApplication = Scholarship::firstOrFail();
            $scholarshipApplication->update(['is_open' => $request->input('is_open')]);

            // Return a success response
            return response()->json(['message' => 'Scholarship application status updated successfully'], 200);
        } catch (\Exception $e) {
            // Handle any exceptions or errors here
            return response()->json(['message' => 'Error updating scholarship application status'], 500);
        }
    }

    public function checkResult(){

        return Inertia::render('User/Scholarship',['tab'=>'Result']);
    }

    public function showResult(Request $request, $id){

        // Step 2: Retrieve the student based on $id
        $student = Student::where('symbol_number', $id)
                          ->orWhere('phone_number', $id)
                          ->first();

        // Step 3: Check if the student meets the criteria
        if ($student &&
            $student->preferred_major !== null &&
            $student->preferred_school !== null &&
            $student->preferred_school_address !== null) {
            // Criteria met, so return the view using Inertia
            return Inertia::render('User/Scholarship',['tab'=>'Result','student'=>$student]);
        } else {
            // Criteria not met, return back with errors
            return back()->withErrors(['id' => 'The provided student id has not applied for scholarship.'])->withInput();
        }
    }


    public function applyForScholarship(Request $request) {
        $id = $request->input('id');
        // Step 1: Define the validation rules with a custom rule for checking existence
        $rules = [
            'id' => [
                'required',
                'string',
            ],
            'preferred_major' => 'required|string',
            'preferred_school' => 'required|string',
            'preferred_school_address' => 'required|string',
        ];

        // Step 2: Validate the request data
        $validatedData = $request->validate($rules);

        // Step 3: Update the student's information
        $student = Student::where('phone_number', $id)->orWhere('symbol_number', $id)->first();

        if ($student) {
            $validatedData = $request->only(['preferred_major', 'preferred_school', 'preferred_school_address']);
            $student->update($validatedData);

            // Step 4: Render the User/Scholarship view
            return redirect("/scholarship-admit-card/$id");
        } else {
            // Handle the case where the student is not found
            return back()->withErrors(['id' => 'Student not found.'])->withInput();
        }
    }

}
