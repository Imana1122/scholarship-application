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
            $school = School::with('students')->where('id',$id)->get();



            return response()->json($school);
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
