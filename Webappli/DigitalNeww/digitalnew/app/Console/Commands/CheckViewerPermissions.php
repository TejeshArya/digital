<?php

namespace App\Console\Commands;

use App\Models\Role;
use Illuminate\Console\Command;

class CheckViewerPermissions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'check:viewer-permissions';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check what permissions the viewer role has';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $viewer = Role::where('name', 'viewer')->with('permissions')->first();
        
        if (!$viewer) {
            $this->error('Viewer role not found!');
            return;
        }

        $this->info('Viewer Role Permissions:');
        $this->info('=======================');
        
        foreach ($viewer->permissions as $permission) {
            $this->line("• {$permission->name} - {$permission->display_name}");
        }
        
        $this->info("Total: {$viewer->permissions->count()} permissions");
    }
}
