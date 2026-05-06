<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Role;
use App\Models\Permission;
use Illuminate\Support\Facades\DB;

class AssignDefaultPermissionsToGroups extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'assign:default-permissions-to-groups';

    /**
     * The console command description.
     */
    protected $description = 'Assign default permissions to group-managed roles';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Assigning default permissions to group-managed roles...');

        // Default permissions for group-managed roles
        $defaultPermissions = [
            'view_dashboard',
            'view_projects',
            'create_quotations',
            'view_quotations',
            'create_invoices',
            'view_invoices',
        ];

        $permissionIds = Permission::whereIn('name', $defaultPermissions)->pluck('id');
        
        if ($permissionIds->isEmpty()) {
            $this->error('No default permissions found! Please run PermissionSeeder first.');
            return Command::FAILURE;
        }

        $groupRoles = Role::whereNotNull('group_manager_id')->get();
        $updatedCount = 0;

        foreach ($groupRoles as $role) {
            // Check if role already has permissions
            $existingPermissionsCount = DB::table('role_permissions')
                ->where('group_manager_id', $role->group_manager_id)
                ->count();

            if ($existingPermissionsCount == 0) {
                $role->syncPermissions($permissionIds->toArray());
                $this->line("✅ Assigned default permissions to: {$role->group_manager_id} - {$role->display_name}");
                $updatedCount++;
            } else {
                $this->line("⏭️  Skipped: {$role->group_manager_id} - {$role->display_name} (already has permissions)");
            }
        }

        $this->info("✅ Completed! Updated {$updatedCount} roles with default permissions.");
        return Command::SUCCESS;
    }
}
