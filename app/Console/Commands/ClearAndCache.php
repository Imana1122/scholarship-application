<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class ClearAndCache extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'clear:cache';

    /**
     * The console command description.
     *
     * @var string
     */

    protected $description = 'Clear route, config, and application cache and cache configuration';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Clear the route cache
        $this->call('route:clear');

        // Clear the configuration cache
        $this->call('config:clear');

        // Clear the application cache
        $this->call('cache:clear');

        // Cache the configuration
        $this->call('config:cache');

        // Cache the route
        $this->call('route:cache');

        $this->info('Route, config, and application cache cleared, and configuration cached.');
    }

}
