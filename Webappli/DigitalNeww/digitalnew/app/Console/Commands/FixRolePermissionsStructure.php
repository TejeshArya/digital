<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class FixRolePermissionsStructure extends Command
{
    protected $signature = 'fix:role-permissions-structure';
    protected $description = 'Manually fix role_permissions table structure to use group_manager_id';

    public function handle()
    {
        $this->info('Fixing role_permissions table structure...');

        try {
            // Check if role_permissions table exists
            if (!Schema::hasTable('role_permissions')) {
                $this->error('role_permissions table does not exist!');
                return Command::FAILURE;
            }

            // Check current structure
            $columns = Schema::getColumnListing('role_permissions');
            $this->info('Current columns: ' . implode(', ', $columns));

            // Add group_manager_id column if it doesn't exist
            if (!in_array('group_manager_id', $columns)) {
                $this->info('Adding group_manager_id column...');
                DB::statement('ALTER TABLE role_permissions ADD COLUMN group_manager_id VARCHAR(255) NULL AFTER role_id');
            } else {
                $this->info('group_manager_id column already exists');
            }

            // Update existing data - populate group_manager_id from roles table
            $this->info('Populating group_manager_id from roles table...');
            $updated = DB::statement('
                UPDATE role_permissions rp 
                INNER JOIN roles r ON rp.role_id = r.id 
                SET rp.group_manager_id = r.group_manager_id 
                WHERE r.group_manager_id IS NOT NULL
            ');
            
            $this->info('Updated rows: ' . $updated);

            // Make group_manager_id NOT NULL after populating
            $this->info('Making group_manager_id NOT NULL...');
            DB::statement('ALTER TABLE role_permissions MODIFY COLUMN group_manager_id VARCHAR(255) NOT NULL');

            // Add index if it doesn't exist
            try {
                DB::statement('ALTER TABLE role_permissions ADD INDEX idx_group_manager_id (group_manager_id)');
                $this->info('Added index on group_manager_id');
            } catch (\Exception $e) {
                $this->info('Index on group_manager_id may already exist');
            }

            // Drop old foreign key constraint
            try {
                DB::statement('ALTER TABLE role_permissions DROP FOREIGN KEY role_permissions_role_id_foreign');
                $this->info('Dropped old foreign key constraint');
            } catch (\Exception $e) {
                $this->info('Old foreign key constraint may not exist');
            }

            // Drop old unique constraint
            try {
                DB::statement('ALTER TABLE role_permissions DROP INDEX role_permissions_role_id_permission_id_unique');
                $this->info('Dropped old unique constraint');
            } catch (\Exception $e) {
                $this->info('Old unique constraint may not exist');
            }

            // Drop role_id column
            if (in_array('role_id', $columns)) {
                $this->info('Dropping role_id column...');
                DB::statement('ALTER TABLE role_permissions DROP COLUMN role_id');
                $this->info('Dropped role_id column');
            } else {
                $this->info('role_id column already removed');
            }

            // Add new unique constraint
            try {
                DB::statement('ALTER TABLE role_permissions ADD UNIQUE KEY unique_group_permission (group_manager_id, permission_id)');
                $this->info('Added new unique constraint');
            } catch (\Exception $e) {
                $this->info('New unique constraint may already exist');
            }

            $this->info('✅ Role permissions structure fixed successfully!');

            // Show final structure
            $finalColumns = Schema::getColumnListing('role_permissions');
            $this->info('Final columns: ' . implode(', ', $finalColumns));

            return Command::SUCCESS;

        } catch (\Exception $e) {
            $this->error('Error: ' . $e->getMessage());
            return Command::FAILURE;
        }
    }
}
