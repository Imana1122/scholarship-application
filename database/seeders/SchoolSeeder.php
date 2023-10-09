<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\School;

class SchoolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Generate multiple fake school records
        School::factory(5)->create();
    }
}
