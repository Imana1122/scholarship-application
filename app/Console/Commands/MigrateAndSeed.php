<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class MigrateAndSeed extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:migrate-and-seed';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->call('migrate');
        $this->call('db:seed', ['--class' => 'DatabaseSeeder']);
        $this->info('Migrations and seeders have been executed.');
    }
}
