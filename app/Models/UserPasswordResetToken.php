<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserPasswordResetToken extends Model
{
    use HasFactory;
    protected $fillable = [
        'phone_number',
        'verification_token',
        'verification_status'
    ];

    protected $hidden = [
        'verification_token',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'phone_number', 'phone_number');
    }
}
