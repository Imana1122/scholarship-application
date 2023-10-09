<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdmitCardController extends Controller
{

    public function giveAdmitCardRequestForm(){
        return Inertia::render('User/Scholarship',['tab'=>'Admit Card']);
    }

    public function showAdmitCard(Request $request, $id){

        $student = Student::where('phone_number', $id)
            ->orWhere('symbol_number', $id)
            ->first();

        if (!$student) {
            return back()->withErrors(['id' => 'Student not found']);
        }

        if (!$student->preferred_major || !$student->preferred_school || !$student->preferred_school_address) {
            return back()->withErrors(['id' => 'Not Applied for scholarship']);
        }


        return Inertia::render('User/AdmitCard',['student'=>$student]);
    }




}
