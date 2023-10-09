<?php

namespace App\Models;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class School extends Model implements Authenticatable
{
    use HasFactory;

    protected $fillable = [
        'school_name',
        'school_type',
        'school_email',
        'school_phone',
        'school_address',
        'school_category',
        'established_date',
        'principal_name',
        'principal_email',
        'principal_phone',
        'school_license',
        'password', // If you need to store the password for admin-created schools
        'remember_token', // Add the remember_token field to your $fillable array
    ];

    // Define any additional relationships, accessors, or mutators here

    // Define a mutator to hash the password when setting it
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
    }

    public function students()
    {
        return $this->hasMany(Student::class, 'school_id'); // 'school_id' is the foreign key in the students table
    }

    // Required methods for Authenticatable interface

    public function getAuthIdentifierName()
    {
        return 'school_phone'; // Replace with your identifier field name
    }

    public function getAuthIdentifier()
    {
        return $this->getAttribute('school_phone');
    }

    public function getAuthPassword()
    {
        return $this->getAttribute('password');
    }

    // Methods for "remember me" functionality

    public function getRememberToken()
    {
        return $this->getAttribute('remember_token');
    }

    public function setRememberToken($value)
    {
        $this->attributes['remember_token'] = $value;
    }

    public function getRememberTokenName()
    {
        return 'remember_token';
    }
}
