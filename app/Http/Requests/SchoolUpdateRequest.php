<?php

namespace App\Http\Requests;


use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SchoolUpdateRequest extends FormRequest
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
    public function rules()
    {
        $schoolId = $this->route('id'); // Assuming you are using 'school' as the parameter name

        return [
            'school_name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('schools', 'school_name')->ignore($schoolId),
            ],
            'school_type' => [
                'required',
                'string',
                Rule::in([ 'Secondary School']),
            ],
            'school_email' => [
                'required',
                'string',
                'email',
                Rule::unique('schools', 'school_email')->ignore($schoolId),
            ],
            'school_phone' => [
                'required',
                'numeric',
                Rule::unique('schools', 'school_phone')->ignore($schoolId),
            ],
            'school_address' => [
                'required',
                'string',
            ],
            'school_category' => [
                'required',
                'string',
                Rule::in(['Public', 'Private', 'Community']),
            ],
            'established_date' => [
                'required',
                'date',
            ],
            'principal_name' => [
                'required',
                'string',
                'max:255',
            ],
            'principal_email' => [
                'required',
                'string',
                'email',
            ],
            'principal_phone' => [
                'required',
                'numeric',
            ],
            'school_license' => [
                'nullable',
                'string',
            ],
            'school_license_file' => [
                'nullable',
                'file',
                'mimes:jpeg,jpg,png,gif'
            ]
        ];
    }

}
