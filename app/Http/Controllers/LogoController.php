<?php

namespace App\Http\Controllers;

use App\Http\Requests\LogoRequest;
use App\Models\Logo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LogoController extends Controller
{
    public function showUpdateForm(){
        // Get the authenticated user
        $user = Auth::guard('user')->user();

        // Fetch the Member using the provided $id
        $image = Logo::findOrFail(1);

        if (!$image) {
            // Return back with an error message
            return redirect()->back()->with('error', 'Logo not found.');
        }

        return Inertia::render('Admin/UpdateLogo', [
            'currentUser'=>$user,
            'image' => $image,
        ]);
    }

    public function updateLogo(LogoRequest $request){

        // Fetch the Member using the provided $id
        $image = Logo::findOrFail(1);

        if (!$image) {
            // Return a response with a 404 Not Found status code
            return response()->json(['error' => 'Logo not found.'], 404);
        }

        $data = $request->validated();

        // Check if a new image was uploaded
        if ($request->hasFile('image')) {
            // Delete the previous image if it exists
            $previousLogoPath = $image->imagePath;

            if ($previousLogoPath && Storage::exists('public/images/' .$previousLogoPath)) {
                Storage::delete('public/images/' . $previousLogoPath);
            }

            // Store the new uploaded image in the 'public/images/background' directory
            $imagePath = $request->file('image')->store('public/images');

            $extension = 'png';
            $uniqueFilename = 'logo' .  '.' . $extension;

            // Move the uploaded file with a custom filename
            Storage::move($imagePath, 'public/images/' . $uniqueFilename);


            $data['imagePath'] = $uniqueFilename;
        }

        $updatedLogo = $image->update([
            'imagePath' => $data['imagePath'],
        ]);

        if ($updatedLogo) {
            // Return a response with a 200 OK status code and success message

            return back()->with(['message'=>'Updated Succesfully']);
        } else {
            // Return a response with a 500 Internal Server Error status code and error message
            return back();
        }

    }
}
