<?php

namespace App\Http\Controllers;

use App\Http\Requests\ApplicationImageRequest;
use App\Models\ApplicationImage;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ApplicationImageController extends Controller
{

    public function showRegisterForm(){

        $user = auth('user')->user();
        return Inertia::render('Admin/NewBackgroundImage',['currentUser'=>$user]);
    }

    public function showImagesForAdmin(){
        $user = auth('user')->user();
        $images = ApplicationImage::all();
        return Inertia::render('Admin/BackgroundImages',['currentUser'=>$user,'images'=>$images]);
    }

    public function registerApplicationImage(ApplicationImageRequest $request){
        $data = $request->validated();

        // Check if an image was uploaded
        if ($request->hasFile('image')) {
            // Store the uploaded image in the 'public/images/background' directory
            $background_image = $request->file('image')->store('public/images/background');


            $extension = 'png';
            $uniqueFilename = $data['title'] . '_' . time() . '.' . $extension;

            // Move the uploaded file with a custom filename
            Storage::move($background_image, 'public/images/background/' . $uniqueFilename);


            $data['background_image'] = 'background/'.$uniqueFilename;

             $imagePath = ApplicationImage::create([
                'title'=>$data['title'],
                'background_image' => $data['background_image'],
            ]);
        }



        if ($imagePath) {
            // Return a response with a 200 OK status code and success message
            return redirect('/user/background-images');
        } else {
            // Return a response with a 500 Internal Server Error status code and error message
            return back()->withErrors(['error'=>'Internal Server.']);
        }
    }

    public function showUpdateForm($id){
        // Get the authenticated user
        $user = Auth::guard('user')->user();

        // Fetch the Member using the provided $id
        $imagePath = ApplicationImage::find($id);

        if (!$imagePath) {
            // Return back with an error message
            return redirect()->back()->with('error', 'Member with ID ' . $id . ' not found.');
        }

        return Inertia::render('Admin/UpdateBackgroundImage', [
            'currentUser'=>$user,
            'image' => $imagePath,
        ]);
    }

    public function updateApplicationImage(ApplicationImageRequest $request, $id){

        // Fetch the Member using the provided $id
        $imagePath = ApplicationImage::find($id);

        if (!$imagePath) {
            // Return a response with a 404 Not Found status code
            return response()->json(['error' => 'Image with ID ' . $id . ' not found.'], 404);
        }

        $data = $request->validated();

        // Check if a new image was uploaded
        if ($request->hasFile('image')) {
            // Delete the previous image if it exists
            $previousImagePath = $imagePath->background_image;

            if ($previousImagePath && Storage::exists('public/images/' .$previousImagePath)) {
                Storage::delete('public/images/' . $previousImagePath);
            }

            // Store the new uploaded image in the 'public/images/background' directory
            $background_image = $request->file('image')->store('public/images/background');


            $extension = 'png';
            $uniqueFilename = $data['title'] . '_' . time() . '.' . $extension;

            // Move the uploaded file with a custom filename
            Storage::move($background_image, 'public/images/background/' . $uniqueFilename);


            $data['background_image'] = 'background/'.$uniqueFilename;
        }

        $updatedImage = $imagePath->update([
            'title'=>$data['title'],
            'background_image' => $data['background_image'],
        ]);

        if ($updatedImage) {
            // Return a response with a 200 OK status code and success message

            return redirect('/user/background-images')->with(['message'=>'Updated Succesfully']);
        } else {
            // Return a response with a 500 Internal Server Error status code and error message
            return back();
        }

    }

    public function delete( $id)
    {
        // Fetch the Member using the provided $id
        $imagePath = ApplicationImage::findOrFail($id);
        $background_image = $imagePath->background_image;

        if ($background_image && Storage::exists('public/images/' . $background_image)) {
            Storage::delete('public/images/' . $background_image);
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
