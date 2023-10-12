<?php

namespace Database\Seeders;

use App\Models\About;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AboutSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        About::create([
            'id' => 1,
            'about_description1'=>'Last thing i want to say',
            'about_description2'=>'Hello okay',
            'mission_description'=>'So my name is imana',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
