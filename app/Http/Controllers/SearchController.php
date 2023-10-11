<?php

namespace App\Http\Controllers;

use App\Models\ApplicationImage;
use App\Models\Download;
use App\Models\Member;
use App\Models\Notice;
use App\Models\School;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SearchController extends Controller
{
        // Search for schools by ID
        public function searchSchools($id)
        {

            // Retrieve a specific school by its ID along with its students
        $schoolsWithStudents = School::where('id',$id)->get();
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
            return response()->json($schoolsWithCategorizedStudents);
        }

        // Search for students by ID
        public function searchStudents($id)
        {
            $school = Auth::guard('school')->user();
            $student = $school->students->where('symbol_number',$id)->values()->all();

            return response()->json(['Student'=>$student]); // Replace with your response format
        }

        public function searchStudentsForAdmin($id)
        {
            $school = Auth::guard('school')->user();
            $students=Student::all();
            $student = $students->where('symbol_number',$id)->values()->all();

            return response()->json(['Student'=>$student]); // Replace with your response format
        }

        // Search for users by ID
        public function searchUsers($id)
        {
            $user = User::with('role')->where('id',$id)->get();

            // Implement your search logic for users here

            return response()->json($user); // Replace with your response format
        }

        // Search for files by ID
        public function searchFiles($id)
        {
            $file = Download::where('id',$id)->get();

            // Implement your search logic for files here

            return response()->json($file); // Replace with your response format
        }

        // Search for images by ID
        public function searchImages($id)
        {
            $image = ApplicationImage::where('id',$id)->get();

            // Implement your search logic for images here

            return response()->json($image); // Replace with your response format
        }

        // Search for members by ID
        public function searchMembers($id)
        {
            $member = Member::where('id',$id)->get();

            // Implement your search logic for members here

            return response()->json($member); // Replace with your response format
        }

        public function searchNotices($id)
        {
            $notice = Notice::where('id',$id)->get();

            // Implement your search logic for members here

            return response()->json(['Notice'=>$notice]); // Replace with your response format
        }
}
