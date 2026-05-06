<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Group;
use App\Models\Role;
use App\Models\Permission;
use Illuminate\Support\Facades\DB;

class SetupSuperAdminGroups extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'setup:super-admin-groups';

    /**
     * The console command description.
     */
    protected $description = 'Setup super admin groups (1 and 2) with all permissions';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Setting up super admin groups...');

        // Create or update groups 1 and 2
        $superGroups = ['1', '2'];
        
        foreach ($superGroups as $groupId) {
            $group = Group::updateOrCreate(
                ['group_id' => $groupId],
                [
                    'group_id' => $groupId,
                    'name' => "Super Admin Group {$groupId}",
                    'description' => "Super Admin Group - Full Access"
                ]
            );

            $this->info("✅ Group {$groupId}: {$group->name}");

            // Create or update corresponding role
            $role = Role::updateOrCreate(
                ['group_manager_id' => $groupId],
                [
                    'group_manager_id' => $groupId,
                    'name' => "super_admin_group_{$groupId}",
                    'display_name' => "Super Admin Group {$groupId}",
                    'description' => "Super Admin Role with full access"
                ]
            );

            $this->info("✅ Role: {$role->display_name}");
        }

        // Get all permissions
        $permissions = Permission::all();
        
        if ($permissions->isEmpty()) {
            $this->error('No permissions found! Please run PermissionSeeder first.');
            return Command::FAILURE;
        }

        $this->info("Found {$permissions->count()} permissions");

        // Assign ALL permissions to groups 1 and 2
        foreach ($superGroups as $groupId) {
            $role = Role::where('group_manager_id', $groupId)->first();
            
            if ($role) {
                foreach ($permissions as $permission) {
                    DB::table('role_permissions')->updateOrInsert(
                        ['group_manager_id' => $groupId, 'permission_id' => $permission->id],
                        ['created_at' => now(), 'updated_at' => now()]
                    );
                }
                
                $this->info("✅ Assigned {$permissions->count()} permissions to Group {$groupId}");
            }
        }

        $this->info('🎉 Super admin groups setup completed!');
        $this->info('Groups 1 and 2 now have full access to everything.');
        
        return Command::SUCCESS;
    }
}
