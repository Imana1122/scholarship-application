<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserUpdateRequest extends FormRequest
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
        $userId = $this->route('id');
        return [
            'name' => 'required|string',
            'phone_number' => [
                'required',
                'numeric',
                Rule::unique('users', 'phone_number')->ignore($userId),
            ],
            'role_id'=>'required|exists:roles,id',
        ];
    }
}
