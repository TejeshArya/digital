<?php

namespace App\Console\Commands;

use App\Models\Role;
use App\Models\User;
use Illuminate\Console\Command;

class ChangeUserRole extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'change:user-role {email} {role}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Change a user\'s role';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->argument('email');
        $roleName = $this->argument('role');
        
        $user = User::where('email', $email)->first();
        $role = Role::where('name', $roleName)->first();
        
        if (!$user) {
            $this->error("User with email '{$email}' not found!");
            return;
        }
        
        if (!$role) {
            $this->error("Role '{$roleName}' not found!");
            return;
        }
        
        $user->roles()->sync([$role->id]);
        
        $this->info("User '{$user->name}' role changed to '{$role->display_name}' successfully!");
    }
}
