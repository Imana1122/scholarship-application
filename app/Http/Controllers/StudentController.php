<?php

namespace App\Http\Controllers;

use App\Http\Requests\StudentRegisterRequest;
use App\Http\Requests\StudentUpdateRequest;
use App\Http\Requests\UpdateStudentResultRequest;
use App\Models\School;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function showRegisterForm(){

        $authenticatedSchool = auth('school')->user();
        return Inertia::render('School/NewStudent',['currentUser'=>$authenticatedSchool]);
    }

    public function showStudentsForAdmin()
    {
        $user = Auth::guard('user')->user();

        // Retrieve all students, ordered by symbol number
        $students = Student::orderBy('symbol_number')->get();

        // Retrieve the students associated with the school
        $appliedStudents = Student::whereNotNull('preferred_school')
            ->whereNotNull('preferred_school_address')
            ->whereNotNull('preferred_major')
            ->get();

        // Retrieve 'Passed' students in ascending order of 'rank'
        $passedStudents = Student::where('result', 'Passed')
            ->orderBy('rank')
            ->get();

        // Retrieve 'Failed' students in ascending order of 'rank'
        $failedStudents = Student::where('result', 'Failed')
            ->orderBy('rank')
            ->get();

        // Retrieve 'Failed' students in ascending order of 'rank'
        $onHoldStudents = Student::where('result', 'On Hold')
            ->orderBy('rank')
            ->get();

        return Inertia::render('Admin/Students', [
            'currentUser' => $user,
            'students' => [
                'All' => $students,
                'Scholarship_Applied' => $appliedStudents,
                'Passed' => $passedStudents,
                'Failed' => $failedStudents,
                'On Hold' => $onHoldStudents
            ],
        ]);
    }


    public function showUpdateStudentResultForm(Request $request, $id){
        $user = Auth::guard('user')->user();

        // Fetch the student using the provided $id
        $student = Student::find($id);

        if (!$student) {
            // Return a response with a 404 Not Found status code
            return response()->json(['error' => 'Student with ID ' . $id . ' not found.'], 404);
        }

        return Inertia::render('Admin/UpdateStudentResult', [
            'currentUser'=>$user,
            'student'=>$student
        ]);
    }

    public function updateStudentResult(UpdateStudentResultRequest $request, $id){
        // Fetch the student using the provided $id
        $student = Student::find($id);

        if (!$student) {
            // Return a response with a 404 Not Found status code
            return response()->json(['error' => 'Student with ID ' . $id . ' not found.'], 404);
        }

        $data = $request->validated();
        $updatedStudent = $student->update([
            'marks' => $data['marks'],
            'rank' =>$data['rank'],
            'result' => $data['result']
        ]);

        if ($updatedStudent) {
            // Return a response with a 200 OK status code and success message

            return redirect('/user/students')->with(['message'=>'Updated Succesfully']);
        } else {
            // Return a response with a 500 Internal Server Error status code and error message
            return back();
        }
    }

    public function showStudentsForSchool(){
        // Get the authenticated school
    $school = Auth::guard('school')->user();

    // Retrieve the students associated with the school
    $students = $school->students->sortBy('symbol_number')->values()->all();

    // Separate students based on their result and filter based on criteria
    $appliedStudents = collect($students)->filter(function ($student) {
        return (
            $student->preferred_major !== null &&
            $student->preferred_school !== null &&
            $student->preferred_school_address !== null
        );
    })->sortBy('symbol_number')->values()->all(); // Convert to array

    $passedStudents = collect($students)->filter(function ($student) {
        return $student->result === 'Passed';
    })->sortBy('rank')->values()->all(); // Convert to array

    $failedStudents = collect($students)->filter(function ($student) {
        return $student->result === 'Failed';
    })->sortBy('rank')->values()->all(); // Convert to array

    $onHoldStudents = collect($students)->filter(function ($student) {
        return $student->result === 'On Hold';
    })->sortBy('rank')->values()->all(); // Convert to array


    return Inertia::render('School/Students', [
        'currentUser'=>$school,
        'students'=>[
            'Students' => $students,
            'Applied_For_Scholarship'=>$appliedStudents,
            'Passed'=>$passedStudents,
            'Failed'=>$failedStudents,
            'On Hold'=>$onHoldStudents
            ]
    ]);
    }

    public function registerStudent(StudentRegisterRequest $request){
        $data = $request->validated();

        // Check if an image was uploaded
        if ($request->hasFile('image')) {
            // Store the uploaded image in the 'public/images/trainers' directory
            $imagePath = $request->file('image')->store('public/images/students');


            $extension = 'png';
            $uniqueFilename = $data['symbol_number'] . '_' . time() . '.' . $extension;

            // Move the uploaded file with a custom filename
            Storage::move($imagePath, 'public/images/students/' . $uniqueFilename);


            $data['imagePath'] = 'students/'.$uniqueFilename;
            echo('hello'.$data['imagePath']);
        }

        $student = Student::create([
            'symbol_number' => $data['symbol_number'],
            'gender' =>$data['gender'],
            'first_name' => $data['first_name'],
            'middle_name' => $data['middle_name'],
            'last_name' => $data['last_name'],
            'temporary_address'=>$data['temporary_address'],
            'permanent_address'=>$data['permanent_address'],
            'scored_gpa' => $data['scored_gpa'],
            'school_id' => $data['school_id'],
            'phone_number' => $data['phone_number'],
            'mother_name' =>$data['mother_name'],
            'father_name' => $data['father_name'],
            'father_phone_number' => $data['father_phone_number'],
            'mother_phone_number'=>$data['mother_phone_number'],
            'preferred_major'=>$data['preferred_major'],
            'preferred_school'=>$data['preferred_school'],
            'preferred_school_address'=>$data['preferred_school_address'],
            'imagePath' => $data['imagePath'],

        ]);

        if ($student) {
            // Return a response with a 200 OK status code and success message
            return redirect('/school/students')->with(['message'=>'Created Succesfully']);
        } else {
            // Return a response with a 500 Internal Server Error status code and error message
            return back();
        }
    }

    public function showUpdateForm(Request $request, $id){
        // Get the authenticated school
        $school = Auth::guard('school')->user();

        // Fetch the student using the provided $id
        $student = Student::find($id);

        if (!$student) {
            // Return back with an error message
            return redirect()->back()->with('error', 'Student with ID ' . $id . ' not found.');
        }

        return Inertia::render('School/UpdateStudent', [
            'currentUser'=>$school,
            'student' => $student,
        ]);
    }

    public function updateStudent(StudentUpdateRequest $request, $id){
        $school = Auth::guard('school')->user();

        // Fetch the student using the provided $id
        $student = Student::find($id);

        if (!$student) {
            // Return a response with a 404 Not Found status code
            return response()->json(['error' => 'Student with ID ' . $id . ' not found.'], 404);
        }

        $data = $request->validated();

        // Check if a new image was uploaded
        if ($request->hasFile('image')) {
            // Delete the previous image if it exists
            $previousImagePath = $student->imagePath;

            if ($previousImagePath && Storage::exists('public/images/' .$previousImagePath)) {
                Storage::delete('public/images/' . $previousImagePath);
            }

            // Store the new uploaded image in the 'public/images/trainers' directory
            $imagePath = $request->file('image')->store('public/images/students');


            $extension = 'png';
            $uniqueFilename = $data['symbol_number'] . '_' . time() . '.' . $extension;

            // Move the uploaded file with a custom filename
            Storage::move($imagePath, 'public/images/students/' . $uniqueFilename);


            $data['imagePath'] = 'students/'.$uniqueFilename;
        }

        $updatedStudent = $student->update([
            'symbol_number' => $data['symbol_number'],
            'gender' =>$data['gender'],
            'first_name' => $data['first_name'],
            'middle_name' => $data['middle_name'],
            'last_name' => $data['last_name'],
            'temporary_address'=>$data['temporary_address'],
            'permanent_address'=>$data['permanent_address'],
            'scored_gpa' => $data['scored_gpa'],
            'school_id' => $data['school_id'],
            'phone_number' => $data['phone_number'],
            'mother_name' =>$data['mother_name'],
            'father_name' => $data['father_name'],
            'father_phone_number' => $data['father_phone_number'],
            'mother_phone_number'=>$data['mother_phone_number'],
            'imagePath' => $data['imagePath'],
            'preferred_school'=>$data['preferred_school'],
            'preferred_school_address'=>$data['preferred_school_address'],
            'preferred_major'=>$data['preferred_major'],
        ]);

        if ($updatedStudent) {
            // Return a response with a 200 OK status code and success message

            return redirect('/school/students')->with(['message'=>'Updated Succesfully']);
        } else {
            // Return a response with a 500 Internal Server Error status code and error message
            return back();
        }

    }

    public function delete(Request $request, $id)
    {
        // Fetch the student using the provided $id
        $student = Student::findOrFail($id);
        $imagePath = $student->imagePath;

        if ($imagePath && Storage::exists('public/images/' . $imagePath)) {
            Storage::delete('public/images/' . $imagePath);
        }

        if (!$student) {
            // Return a response with a 404 Not Found status code
            return response()->json(['error' => 'Student with ID ' . $id . ' not found.'], 404);
        }

        if ($student->delete()) {
            // Return a response with a 200 OK status code and success message
            return response()->json(['message' => 'Student deleted successfully.'], 200);
        } else {
            // Return a response with a 500 Internal Server Error status code and error message
            return response()->json(['error' => 'Failed to delete student.'], 500);
        }
    }

}
