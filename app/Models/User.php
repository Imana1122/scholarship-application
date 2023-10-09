<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'phone_number',
        'password',
        'role_id',
        'remember_token',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'password' => 'hashed',
    ];

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
    }

    // User.php
    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function resetToken()
    {
        return $this->hasOne(UserPasswordResetToken::class, 'phone_number', 'phone_number');
    }

    public function getAuthIdentifierName()
    {
        return 'phone_number'; // Replace with your identifier field name
    }

    public function getAuthIdentifier()
    {
        return $this->getAttribute('phone_number');
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
