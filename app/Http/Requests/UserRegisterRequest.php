<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRegisterRequest extends FormRequest
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
            'name' => 'required|string',
            'phone_number' => 'required|string|unique:users,phone_number',
            'role_id'=>'required|exists:roles,id',
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
