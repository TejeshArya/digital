<?php

namespace App\Console\Commands;

use App\Models\Role;
use App\Models\Permission;
use Illuminate\Console\Command;

class UpdateAdminPermissions extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'admin:update-permissions';

    /**
     * The console command description.
     */
    protected $description = 'Update admin role with all permissions including hierarchy management';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $adminRole = Role::where('name', 'admin')->first();
        
        if (!$adminRole) {
            $this->error('Admin role not found!');
            return 1;
        }

        // Get all permissions
        $allPermissions = Permission::all();
        
        // Sync all permissions with admin role
        $adminRole->permissions()->sync($allPermissions->pluck('id'));
        
        $this->info('Admin role updated with ' . $allPermissions->count() . ' permissions.');
        
        // Check specific hierarchy permissions
        $hierarchyPerms = ['view_hierarchy', 'manage_hierarchy', 'view_locations', 'view_departments'];
        $existingPerms = $adminRole->permissions()->pluck('name');
        
        foreach ($hierarchyPerms as $perm) {
            if ($existingPerms->contains($perm)) {
                $this->info("✓ {$perm} - OK");
            } else {
                $this->warn("✗ {$perm} - Missing");
            }
        }
        
        return 0;
    }
}
