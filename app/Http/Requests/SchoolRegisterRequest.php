<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SchoolRegisterRequest extends FormRequest
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
            'school_name' => 'required|string|max:255|unique:schools', // Add 'unique:schools' rule
            'school_type' => 'required|string|in:Secondary School',
            'school_email' => 'required|string|email|unique:schools,school_email',
            'school_phone' => 'required|numeric|unique:schools,school_phone',
            'school_address' => 'required|string',
            'school_category' => 'required|string|in:Public,Private,Community',
            'established_date' => ['required', 'date', 'before:today - 1 year'],
            'principal_name' => 'required|string|max:255',
            'principal_email' => 'required|string|email',
            'principal_phone' => 'required|numeric',
            'school_license' => 'nullable|string',
            'school_license_file' => [
                'nullable',
                'file',
                'mimes:jpeg,jpg,png,gif'
            ],
            'password' => [
                'required',
                'string',
                'confirmed',
                'min:8', // Minimum 8 characters
                'regex:/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/',
                // The regex enforces at least one uppercase, one lowercase, one number, and one special character.
            ],
        ];
    }
}
