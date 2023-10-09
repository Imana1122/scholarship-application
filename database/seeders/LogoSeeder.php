<?php

namespace Database\Seeders;

use App\Models\Logo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LogoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Logo::create([
            'id' => 1,
            'imagePath'=> 'logo.png',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
