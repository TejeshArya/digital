<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class TestAdminAccess extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'test:admin-access';

    /**
     * The console command description.
     */
    protected $description = 'Test admin user access and roles';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $adminUser = User::where('id', 1)->first();
        
        if (!$adminUser) {
            $this->error('Admin user not found!');
            return 1;
        }

        $this->info('Admin User: ' . $adminUser->name);
        $this->info('Roles: ' . $adminUser->roles->pluck('name')->implode(', '));
        $this->info('Has admin role: ' . ($adminUser->hasRole('admin') ? 'YES' : 'NO'));
        
        // Test hierarchy permissions
        $hierarchyPerms = ['view_hierarchy', 'manage_hierarchy', 'view_locations', 'view_departments'];
        
        foreach ($hierarchyPerms as $perm) {
            $hasPerm = $adminUser->hasPermission($perm);
            $this->info("Permission '{$perm}': " . ($hasPerm ? 'YES' : 'NO'));
        }
        
        return 0;
    }
}
