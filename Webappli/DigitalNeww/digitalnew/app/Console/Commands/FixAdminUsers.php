<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class FixAdminUsers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fix:admin-users';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fix admin users to be active and approved';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Fixing admin users...');
        
        // Fix admin@digitalnew.com
        $admin1 = User::where('email', 'admin@digitalnew.com')->first();
        if ($admin1) {
            $admin1->update([
                'approval_status' => 'approved',
                'is_active' => true,
                'activated_at' => now(),
            ]);
            $this->info('✅ Fixed admin@digitalnew.com');
        } else {
            $this->warn('❌ admin@digitalnew.com not found');
        }
        
        // Fix superadmin@digitalnew.com
        $admin2 = User::where('email', 'superadmin@digitalnew.com')->first();
        if ($admin2) {
            $admin2->update([
                'approval_status' => 'approved',
                'is_active' => true,
                'activated_at' => now(),
            ]);
            $this->info('✅ Fixed superadmin@digitalnew.com');
        } else {
            $this->warn('❌ superadmin@digitalnew.com not found');
        }
        
        // Check all admin users
        $adminUsers = User::whereHas('roles', function($query) {
            $query->where('name', 'admin');
        })->get();
        
        foreach ($adminUsers as $user) {
            if ($user->approval_status !== 'approved' || !$user->is_active) {
                $user->update([
                    'approval_status' => 'approved',
                    'is_active' => true,
                    'activated_at' => now(),
                ]);
                $this->info("✅ Fixed {$user->email}");
            }
        }
        
        $this->info('🎉 All admin users fixed!');
        
        // Show login credentials
        $this->info("\n=== Admin Login Credentials ===");
        $this->info("Email: admin@digitalnew.com");
        $this->info("Password: admin123");
        $this->info("\nEmail: superadmin@digitalnew.com");
        $this->info("Password: superadmin123");
    }
}
