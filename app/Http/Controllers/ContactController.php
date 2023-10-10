<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Models\Contact;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function showContact(){
        $contact = Contact::first();

        return Inertia::render('User/Contact',['contact'=>$contact]);
    }

    public function showUpdateForm(){
        $user = auth('user')->user();
        $contact = Contact::first();

        return Inertia::render('Admin/UpdateContact',['currentUser'=>$user, 'contact'=>$contact]);
    }

    public function updateContact(ContactRequest $request)
    {
        $contacts = Contact::first();

        $data = $request->validated();

        // Update the Trainer model based on the fields present in the validated data
        $contacts->update([
            'phone' => $data['phone'],
            'email' => $data['email'],
            'location' => $data['location'],
            'facebook_link' => $data['facebook_link'],
            'instagram_link' => $data['instagram_link'],
            'twitter_link' => $data['twitter_link'],
            'github_link' => $data['github_link'],
            'youtube_link' => $data['youtube_link'],
            'tiktok_link' => $data['tiktok_link'],
            'allow_send_message' => $data['allow_send_message'],

        ]);

        return response()->json([
            'message' => 'Contacts updated successfully.',
        ]);
    }
}
