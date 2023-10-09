<?php

namespace Database\Seeders;

use App\Models\Scholarship;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ScholarshipApplicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Scholarship::create(['is_open' => false]);
    }
}
