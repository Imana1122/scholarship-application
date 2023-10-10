<?php

namespace App\Http\Controllers;

use App\Http\Requests\MemberRegisterRequest;
use App\Http\Requests\MemberUpdateRequest;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MemberController extends Controller
{


    public function showRegisterForm(){

        $user = auth('user')->user();
        return Inertia::render('Admin/NewMember',['currentUser'=>$user]);
    }

    public function showMembersForAdmin(){
        $user = auth('user')->user();
        $members = Member::all();
        return Inertia::render('Admin/Members',['currentUser'=>$user,'members'=>$members]);
    }


    public function registerMember(MemberRegisterRequest $request){
        $data = $request->validated();

        // Check if an image was uploaded
        if ($request->hasFile('image')) {
            // Store the uploaded image in the 'public/images/trainers' directory
            $imagePath = $request->file('image')->store('public/images/members');


            $extension = 'png';
            $uniqueFilename = $data['name'] . '_' . time() . '.' . $extension;

            // Move the uploaded file with a custom filename
            Storage::move($imagePath, 'public/images/members/' . $uniqueFilename);


            $data['imagePath'] = 'members/'.$uniqueFilename;
        }

        $member = Member::create([
            'name' => $data['name'],
            'phone_number' => $data['phone_number'],
            'description' => $data['description'],
            'imagePath' => $data['imagePath'],
        ]);

        if ($member) {
            // Return a response with a 200 OK status code and success message
            return redirect('/user/members');
        } else {
            // Return a response with a 500 Internal Server Error status code and error message
            return back()->withErrors(['error'=>'Internal Server.']);
        }
    }

    public function showUpdateForm(Request $request, $id){
        // Get the authenticated user
        $user = Auth::guard('user')->user();

        // Fetch the Member using the provided $id
        $member = Member::find($id);

        if (!$member) {
            // Return back with an error message
            return redirect()->back()->with('error', 'Member with ID ' . $id . ' not found.');
        }

        return Inertia::render('Admin/UpdateMember', [
            'currentUser'=>$user,
            'member' => $member,
        ]);
    }

    public function updateMember(MemberUpdateRequest $request, $id){

        // Fetch the Member using the provided $id
        $member = Member::find($id);

        if (!$member) {
            // Return a response with a 404 Not Found status code
            return response()->json(['error' => 'Member with ID ' . $id . ' not found.'], 404);
        }

        $data = $request->validated();

        // Check if a new image was uploaded
        if ($request->hasFile('image')) {
            // Delete the previous image if it exists
            $previousImagePath = $member->imagePath;

            if ($previousImagePath && Storage::exists('public/images/' .$previousImagePath)) {
                Storage::delete('public/images/' . $previousImagePath);
            }

            // Store the new uploaded image in the 'public/images/trainers' directory
            $imagePath = $request->file('image')->store('public/images/members');


            $extension = 'png';
            $uniqueFilename = $data['name'] . '_' . time() . '.' . $extension;

            // Move the uploaded file with a custom filename
            Storage::move($imagePath, 'public/images/members/' . $uniqueFilename);


            $data['imagePath'] = 'members/'.$uniqueFilename;
        }

        $updatedMember = $member->update([
            'name' => $data['name'],
            'phone_number' => $data['phone_number'],
            'description' => $data['description'],
            'imagePath' => $data['imagePath'],
        ]);

        if ($updatedMember) {
            // Return a response with a 200 OK status code and success message

            return redirect('/user/members')->with(['message'=>'Updated Succesfully']);
        } else {
            // Return a response with a 500 Internal Server Error status code and error message
            return back();
        }

    }

    public function delete(Request $request, $id)
    {
        // Fetch the Member using the provided $id
        $member = Member::findOrFail($id);
        $imagePath = $member->imagePath;

        if ($imagePath && Storage::exists('public/images/' . $imagePath)) {
            Storage::delete('public/images/' . $imagePath);
        }

        if (!$member) {
            // Return a response with a 404 Not Found status code
            return response()->json(['error' => 'Member with ID ' . $id . ' not found.'], 404);
        }

        if ($member->delete()) {
            // Return a response with a 200 OK status code and success message
            return response()->json(['message' => 'Member deleted successfully.'], 200);
        } else {
            // Return a response with a 500 Internal Server Error status code and error message
            return response()->json(['error' => 'Failed to delete member.'], 500);
        }
    }

}
