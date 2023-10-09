<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
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
        $userId = Auth::guard('user')->user()->id; // Assuming you are using 'school' as the parameter name

        return [
            'name'=>'string|required',
            'phone_number' => [
                'required',
                'numeric',
                Rule::unique('users', 'phone_number')->ignore($userId),
            ],
        ];
    }
}
