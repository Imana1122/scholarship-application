<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class MigrateAndSeedController extends Controller
{
    public function migrateAndSeed()
    {
       // Run the Artisan command
       $exitCode = Artisan::call('app:migrate-and-seed');

       // Capture the output of the command
       $output = Artisan::output();

       if ($exitCode === 0) {
           return "Migrations and seeders have been executed successfully. Output: $output";
       } else {
           return "Migrations and seeders failed. Output: $output";
       }
    }
}
