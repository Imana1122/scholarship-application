<?php

namespace App\Http\Controllers;

use App\Http\Requests\AboutImageRequest;
use App\Http\Requests\UpdateAboutRequest;
use App\Models\About;
use App\Models\AboutImage;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AboutController extends Controller
{
    public function index(){
        $members = Member::all();
        $aboutDetails = About::first();
        $aboutImages = AboutImage::all();
        return Inertia::render('User/About',['members'=>$members,'aboutDetails'=>$aboutDetails,'aboutImages'=>$aboutImages]);
    }

    public function showUpdateForm(){
        $user = auth('user')->user();
        $images = AboutImage::all();
        $details = About::first();
        return Inertia::render('Admin/UpdateAboutPage',['images'=>$images,'details'=>$details,'currentUser'=>$user]);
    }

    public function showImageRegisterForm(){
         $user = auth('user')->user();
        return Inertia::render('Admin/NewAboutImage',['currentUser'=>$user]);
    }

    public function updateAboutDetails(UpdateAboutRequest $request){
        $data = $request->validated();

        $about = About::first();

        if ($request->hasFile('image')) {
            if ($about && $about->image_path){
                $image_path = $about->image_path;

                if ($image_path && Storage::exists('public/images/' . $image_path)) {
                    Storage::delete('public/images/' . $image_path);
                }
            }
            // Store the uploaded image in the 'public/images/about' directory
            $image_path = $request->file('image')->store('public/images/about');
            $extension = 'png';
            $uniqueFilename = 'missionImagePath' . '.' . $extension;

            // Move the uploaded file with a custom filename
            Storage::move($image_path, 'public/images/about/' . $uniqueFilename);

            $data['mission_image_path'] = 'about/'.$uniqueFilename;
        }

        if ($about){
            $new_about=$about->update([
                'about_description1'=> $data['about_description1'],
                'about_description2'=> $data['about_description2'],
                'mission_image_path'=> $data['mission_image_path'],
                'mission_description'=> $data['mission_description'],
            ]);
        }else{
            $new_about=About::create([
                'about_description1'=> $data['about_description1'],
                'about_description2'=> $data['about_description2'],
                'mission_image_path'=> $data['mission_image_path'],
                'mission_description'=> $data['mission_description'],
            ]);
        }

        if ($new_about) {
            // Return a response with a 200 OK status code and success message
            return redirect('/about-details/update-form');
        } else {
            // Return a response with a 500 Internal Server Error status code and error message
            return back()->withErrors(['error'=>'Internal Server Error.']);
        }
    }

    public function registerAboutImage(AboutImageRequest $request){
        $data = $request->validated();

        // Check if an image was uploaded
        if ($request->hasFile('image')) {

            // Store the uploaded image in the 'public/images/about' directory
            $image_path = $request->file('image')->store('public/images/about');
            $extension = 'png';
            $uniqueFilename = 'about_image' . '_' . time() . '.' . $extension;

            // Move the uploaded file with a custom filename
            Storage::move($image_path, 'public/images/about/' . $uniqueFilename);

            $data['image_path'] = 'about/'.$uniqueFilename;

            $imagePath = AboutImage::create([
                'image_path' => $data['image_path'],
            ]);
        }

        if ($imagePath) {
            // Return a response with a 200 OK status code and success message
            return redirect('/about-details/update-form');
        } else {
            // Return a response with a 500 Internal Server Error status code and error message
            return back()->withErrors(['error'=>'Internal Server.']);
        }
    }

    public function delete( $id)
    {
        // Fetch the Member using the provided $id
        $imagePath = AboutImage::findOrFail($id);
        $image_path = $imagePath->image_path;

        if ($image_path && Storage::exists('public/images/' . $image_path)) {
            Storage::delete('public/images/' . $image_path);
        }

        if (!$imagePath) {
            // Return a response with a 404 Not Found status code
            return response()->json(['error' => 'Image with ID ' . $id . ' not found.'], 404);
        }

        if ($imagePath->delete()) {
            // Return a response with a 200 OK status code and success message
            return response()->json(['message' => 'Image deleted successfully.'], 200);
        } else {
            // Return a response with a 500 Internal Server Error status code and error message
            return response()->json(['error' => 'Failed to delete image path.'], 500);
        }
    }
}
