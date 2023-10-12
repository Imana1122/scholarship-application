<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class CacheController extends Controller
{
    public function clearAndCache()
    {

        // Run the Artisan command
       $exitCode =  Artisan::call('clear:cache');

       // Capture the output of the command
       $output = Artisan::output();

       if ($exitCode === 0) {
           return "Route, config, and application cache cleared, and configuration cached.. Output: $output";
       } else {
           return "Migrations and seeders failed. Output: $output";
       }
    }
}
