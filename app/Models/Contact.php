<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;
    protected $fillable = [
        'phone',
        'email',
        'location',
        'facebook_link',
        'instagram_link',
        'github_link',
        'youtube_link',
        'tiktok_link',
        'allow_send_message'
    ];
}
