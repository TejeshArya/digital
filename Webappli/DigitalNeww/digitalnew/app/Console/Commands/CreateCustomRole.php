<?php

namespace App\Console\Commands;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Console\Command;

class CreateCustomRole extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'create:custom-role {name} {display_name} {permissions?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a custom role with specific permissions';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $name = $this->argument('name');
        $displayName = $this->argument('display_name');
        $permissionsString = $this->argument('permissions');

        // Check if role already exists
        if (Role::where('name', $name)->exists()) {
            $this->error('Role with this name already exists!');
            return;
        }

        // Create role
        $role = Role::create([
            'name' => $name,
            'display_name' => $displayName,
            'description' => 'Custom role created via command'
        ]);

        // Assign permissions if provided
        if ($permissionsString) {
            $permissionNames = explode(',', $permissionsString);
            $permissionIds = Permission::whereIn('name', $permissionNames)->pluck('id');
            
            if ($permissionIds->count() > 0) {
                $role->permissions()->sync($permissionIds);
                $this->info("Role '{$displayName}' created with " . $permissionIds->count() . " permissions!");
            } else {
                $this->warn("Role '{$displayName}' created but no valid permissions found!");
            }
        } else {
            $this->info("Role '{$displayName}' created without permissions!");
        }

        $this->info("You can now assign this role to users via the web interface.");
    }
}
