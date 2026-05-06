<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Group;
use App\Models\Role;
use App\Models\Permission;
use Illuminate\Support\Facades\Log;

class SyncGroupsToRoles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sync:groups-to-roles';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sync existing groups to roles table';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting sync of groups to roles...');
        
        $groups = Group::all();
        $createdCount = 0;
        $skippedCount = 0;
        
        foreach ($groups as $group) {
            // Check if role already exists for this group
            $existingRole = Role::where('group_manager_id', $group->group_id)->first();
            
            if (!$existingRole) {
                $role = Role::create([
                    'group_manager_id' => $group->group_id,
                    'name' => $group->name,
                    'display_name' => $group->name,
                    'description' => $group->description ?? 'Auto-generated role for group: ' . $group->name,
                ]);

                // Assign default permissions to the new role
                $this->assignDefaultPermissionsToRole($role);
                
                $this->info("Created role for group: {$group->group_id} - {$group->name}");
                $createdCount++;
            } else {
                $this->line("Skipped group: {$group->group_id} - Role already exists");
                $skippedCount++;
            }
        }
        
        $this->info("Sync completed!");
        $this->info("Created: {$createdCount} roles");
        $this->info("Skipped: {$skippedCount} groups");
        
        return Command::SUCCESS;
    }

    /**
     * Assign default permissions to a role.
     */
    private function assignDefaultPermissionsToRole(Role $role)
    {
        $defaultPermissions = [
            'view_dashboard',
            'view_projects',
            'create_quotations',
            'view_quotations',
            'create_invoices',
            'view_invoices',
        ];

        $permissionIds = Permission::whereIn('name', $defaultPermissions)->pluck('id');
        
        if ($permissionIds->isNotEmpty()) {
            $role->syncPermissions($permissionIds->toArray());
            $this->line("  → Assigned default permissions");
        }
    }
}
