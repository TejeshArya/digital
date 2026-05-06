<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class CheckUserPermissions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'check:user-permissions {email}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check what permissions a specific user has';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->argument('email');
        $user = User::where('email', $email)->with('roles.permissions')->first();
        
        if (!$user) {
            $this->error("User with email '{$email}' not found!");
            return;
        }

        $this->info("User: {$user->name} ({$user->email})");
        $this->info("Roles: " . $user->roles->pluck('display_name')->join(', '));
        $this->info("=======================");
        
        $permissions = $user->getAllPermissions();
        $this->info("User Permissions ({$permissions->count()} total):");
        
        foreach ($permissions as $permission) {
            $this->line("• {$permission->name} - {$permission->display_name}");
        }
    }
}
