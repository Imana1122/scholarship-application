<?php

namespace App\Http\Requests;

use App\Models\School;
use Illuminate\Foundation\Http\FormRequest;

class StudentRegisterRequest extends FormRequest
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
            'symbol_number' => 'required|unique:students,symbol_number',
            'first_name' => 'required|string',
            'middle_name' => 'nullable|string',
            'last_name' => 'required|string',
            'gender' => 'required|in:male,female,other',
            'imagePath' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'temporary_address' => 'required|string',
            'permanent_address' => 'required|string',
            'scored_gpa' => 'required|numeric|min:0|max:4.00',
            'school_id' => 'required|exists:schools,id',
            'phone_number' => 'required|numeric|unique:students,phone_number',
            'mother_name' => 'required|string',
            'father_name' => 'required|string',
            'mother_phone_number' => 'required|numeric',
            'father_phone_number' => 'required|numeric',
            'preferred_school' => 'nullable|string',
            'preferred_school_address' => 'nullable|string',
            'preferred_major' => 'nullable|string',
            'result' => 'nullable|string',
            'rank' => 'nullable|integer',
        ];
    }

}
