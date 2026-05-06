<?php

namespace App\Console\Commands;

use Illuminate\Support\Facades\DB;
use Illuminate\Console\Command;

class CheckTables extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'check:tables';

    /**
     * The console command description.
     */
    protected $description = 'Check if required tables exist and have data';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $tables = ['user_hierarchies', 'locations', 'new_departments', 'users'];
        
        foreach ($tables as $table) {
            try {
                $count = DB::table($table)->count();
                $this->info("✓ {$table} table exists with {$count} records");
            } catch (\Exception $e) {
                $this->error("✗ {$table} table error: " . $e->getMessage());
            }
        }
        
        return 0;
    }
}
