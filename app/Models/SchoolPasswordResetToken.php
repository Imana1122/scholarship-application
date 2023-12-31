<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SchoolPasswordResetToken extends Model
{
    use HasFactory;
    protected $fillable = [
        'school_phone',
        'verification_token',
        'verification_status'
    ];

    protected $hidden = [
        'verification_token',
    ];

    public function school()
    {
        return $this->belongsTo(School::class, 'school_phone', 'school_phone');
    }

}
