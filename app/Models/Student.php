<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable=[
        'symbol_number',
        'first_name',
        'middle_name',
        'last_name',
        'temporary_address',
        'permanent_address',
        'scored_gpa',
        'gender',
        'school_id',
        'phone_number',
        'mother_name',
        'father_name',
        'mother_phone_number',
        'father_phone_number',
        'preferred_school',
        'preferred_school_address',
        'preferred_major',
        'result',
        'rank',
        'imagePath',
        'marks'
    ];

    public function school()
    {
        return $this->belongsTo(School::class, 'school_id');
    }

}
