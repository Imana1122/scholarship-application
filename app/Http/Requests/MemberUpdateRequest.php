<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MemberUpdateRequest extends FormRequest
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
        $memberId = $this->route('id');
        return [
            'name' => ['required','string','max:255'],
            'phone_number' => ['required','string','max:255', Rule::unique('members', 'phone_number')->ignore($memberId)],
            'description' => 'nullable|string',
            'image' => 'nullable|file|mimes:jpeg,jpg,png,gif',
            'imagePath'=>'nullable|string'
        ];
    }
}
