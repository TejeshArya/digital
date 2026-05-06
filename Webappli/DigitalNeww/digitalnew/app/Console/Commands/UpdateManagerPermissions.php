<?php

namespace App\Console\Commands;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Console\Command;

class UpdateManagerPermissions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:manager-permissions {--restricted} {--full}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update manager role permissions - use --restricted for limited access or --full for full access';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $managerRole = Role::where('name', 'manager')->first();
        
        if (!$managerRole) {
            $this->error('Manager role not found!');
            return;
        }

        if ($this->option('restricted')) {
            // Limited permissions for manager
            $limitedPermissions = [
                'view_dashboard',
                'view_projects',
                'view_quotations',
                'view_invoices',
                'view_purchases',
                'view_gst',
                'view_companies',
                'view_reports'
            ];
            
            $permissionIds = Permission::whereIn('name', $limitedPermissions)->pluck('id');
            $managerRole->permissions()->sync($permissionIds);
            
            $this->info('Manager permissions updated to RESTRICTED mode!');
            $this->info('Manager can only VIEW data, cannot CREATE/EDIT/DELETE');
            
        } elseif ($this->option('full')) {
            // Full permissions for manager (original)
            $fullPermissions = [
                'view_dashboard', 'manage_projects', 'view_projects',
                'create_quotations', 'edit_quotations', 'view_quotations', 'authorize_quotations',
                'create_invoices', 'edit_invoices', 'view_invoices',
                'manage_purchases', 'view_purchases',
                'manage_gst', 'view_gst',
                'manage_companies', 'view_companies',
                'view_users', 'view_reports', 'export_reports',
                'view_settings'
            ];
            
            $permissionIds = Permission::whereIn('name', $fullPermissions)->pluck('id');
            $managerRole->permissions()->sync($permissionIds);
            
            $this->info('Manager permissions updated to FULL mode!');
            $this->info('Manager can CREATE/EDIT/VIEW business data');
            
        } else {
            $this->error('Please specify --restricted or --full option');
            $this->info('Usage: php artisan update:manager-permissions --restricted');
            $this->info('       php artisan update:manager-permissions --full');
        }
    }
}
