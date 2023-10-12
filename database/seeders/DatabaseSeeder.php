<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $this->call(RoleSeeder::class);
        $this->call(UsersTableSeeder::class);
        $this->call(LogoSeeder::class);
        $this->call(NoticeSeeder::class);
        $this->call(ScholarshipApplicationSeeder::class);
        $this->call(SchoolSeeder::class);
        $this->call(MemberSeeder::class);
        $this->call(StudentSeeder::class);
        $this->call(AboutSeeder::class);
        // Add more seeders as needed
    }
}
