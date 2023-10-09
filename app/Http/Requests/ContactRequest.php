<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'phone'=>'required|numeric',
            'email'=>'required|email',
            'location'=>'required|string',
            'facebook_link'=>'nullable|url',
            'instagram_link'=>'nullable|url',
            'twitter_link'=>'nullable|url',
            'github_link'=>'nullable|url',
            'youtube_link'=>'nullable|url',
            'tiktok_link'=>'nullable|url',
            'allow_send_message'=>'required|boolean'
        ];
    }
}
