<?php

namespace App\Http\Controllers;


use App\Http\Requests\DownloadRequest;
use App\Models\Download;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DownloadController extends Controller
{

    public function index(){
        $downloads = Download::all();
        return Inertia::render('User/Downloads',['files'=>$downloads]);
    }
    public function showRegisterForm(){

        $user = auth('user')->user();
        return Inertia::render('Admin/NewDownloadFile',['currentUser'=>$user]);
    }

    public function showFilesForAdmin(){
        $user = auth('user')->user();
        $downloads = Download::all();
        return Inertia::render('Admin/DownloadFiles',['currentUser'=>$user,'files'=>$downloads]);
    }

    public function registerDownloadFile(DownloadRequest $request){
        $data = $request->validated();

        // Check if an file was uploaded
        if ($request->hasFile('file')) {
            // Store the uploaded file in the 'public/files/downloads' directory
            $download = $request->file('file')->store('public/files/downloads');

            $file = $request->file('file');
            $originalFilename = $file->getClientOriginalName();

            // Optionally, you can sanitize the original filename or use it directly
            $extension = $file->getClientOriginalExtension();
            $uniqueFilename = $originalFilename. '_' . time() . '.' . $extension;

            // Move the uploaded file with a custom filename
            Storage::move($download, 'public/files/downloads/' . $uniqueFilename);


            $data['download'] = 'downloads/'.$uniqueFilename;

             $imagePath = Download::create([
                'description'=>$data['description'],
                'download' => $data['download'],
            ]);
        }



        if ($imagePath) {
            // Return a response with a 200 OK status code and success message
            return redirect('/user/download-files');
        } else {
            // Return a response with a 500 Internal Server Error status code and error message
            return back()->withErrors(['error'=>'Internal Server.']);
        }
    }

    public function showUpdateForm($id){
        // Get the authenticated user
        $user = Auth::guard('user')->user();

        // Fetch the Member using the provided $id
        $imagePath = Download::find($id);

        if (!$imagePath) {
            // Return back with an error message
            return redirect()->back()->with('error', 'Member with ID ' . $id . ' not found.');
        }

        return Inertia::render('Admin/UpdateDownloadFile', [
            'currentUser'=>$user,
            'file' => $imagePath,
        ]);
    }

    public function updateDownloadFile(DownloadRequest $request, $id){

        // Fetch the Member using the provided $id
        $imagePath = Download::find($id);

        if (!$imagePath) {
            // Return a response with a 404 Not Found status code
            return response()->json(['error' => 'File with ID ' . $id . ' not found.'], 404);
        }

        $data = $request->validated();

        // Check if a new file was uploaded
        if ($request->hasFile('file')) {
            // Delete the previous file if it exists
            $previousFilePath = $imagePath->download;

            if ($previousFilePath && Storage::exists('public/files/' .$previousFilePath)) {
                Storage::delete('public/files/' . $previousFilePath);
            }

            // Store the new uploaded file in the 'public/files/downloads' directory
            $download = $request->file('file')->store('public/files/downloads');


            $file = $request->file('file');
            $originalFilename = $file->getClientOriginalName();

            // Optionally, you can sanitize the original filename or use it directly
            $extension = $file->getClientOriginalExtension();
            $uniqueFilename = $originalFilename. '_' . time() . '.' . $extension;

            // Move the uploaded file with a custom filename
            Storage::move($download, 'public/files/downloads/' . $uniqueFilename);


            $data['download'] = 'downloads/'.$uniqueFilename;
        }

        $updatedFile = $imagePath->update([
            'description'=>$data['description'],
            'download' => $data['download'],
        ]);

        if ($updatedFile) {
            // Return a response with a 200 OK status code and success message

            return redirect('/user/download-files')->with(['message'=>'Updated Succesfully']);
        } else {
            // Return a response with a 500 Internal Server Error status code and error message
            return back();
        }

    }

    public function delete( $id)
    {
        // Fetch the Member using the provided $id
        $imagePath = Download::findOrFail($id);
        $download = $imagePath->download;

        if ($download && Storage::exists('public/files/' . $download)) {
            Storage::delete('public/files/' . $download);
        }

        if (!$imagePath) {
            // Return a response with a 404 Not Found status code
            return response()->json(['error' => 'File with ID ' . $id . ' not found.'], 404);
        }

        if ($imagePath->delete()) {
            // Return a response with a 200 OK status code and success message
            return response()->json(['message' => 'File deleted successfully.'], 200);
        } else {
            // Return a response with a 500 Internal Server Error status code and error message
            return response()->json(['error' => 'Failed to delete file path.'], 500);
        }
    }


}
