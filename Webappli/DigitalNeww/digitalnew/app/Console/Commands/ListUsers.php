<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class ListUsers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'list:users';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'List all users in the system';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $users = User::with('roles')->get();
        
        $this->info("Users in the system:");
        $this->info("===================");
        
        foreach ($users as $user) {
            $roles = $user->roles->pluck('display_name')->join(', ');
            $this->line("• {$user->name} ({$user->email}) - Roles: {$roles}");
        }
        
        $this->info("Total: {$users->count()} users");
    }
}
