<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Insert sample data into the 'users' table
       User::create([
            'id' => 1, // Set a specific primary key value (e.g., 1)
            'name' => 'Itahari',
            'phone_number' => '9810490922',
            'password' => 'Hello@123',
            'role_id'=> 2,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        User::factory(3)->create();


    }
}
