<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function showContact(){
        $contact = Contact::find(1);

        return Inertia::render('User/Contact',['activeRoute' => '/contact','contact'=>$contact]);
    }
    public function update(ContactRequest $request)
    {
        $contacts = Contact::findOrFail(1);

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
            'contacts' => $contacts,
            'message' => 'Contacts updated successfully.',
        ]);
    }
}
