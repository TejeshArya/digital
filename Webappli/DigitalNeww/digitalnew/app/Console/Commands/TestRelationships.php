<?php

namespace App\Console\Commands;

use App\Models\Location;
use App\Models\UserHierarchy;
use App\Models\NewDepartment;
use Illuminate\Console\Command;

class TestRelationships extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:relationships';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test all model relationships';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Testing Model Relationships...');
        
        // Test Location relationships
        $this->info('Testing Location relationships:');
        $locations = Location::with('userHierarchies.user', 'userHierarchies.newDepartment')->get();
        
        foreach ($locations as $location) {
            $this->info("Location: {$location->name}");
            $this->info("  - User Hierarchies: " . $location->userHierarchies->count());
            
            foreach ($location->userHierarchies as $hierarchy) {
                $this->info("    - User: {$hierarchy->user->name}, Department: " . ($hierarchy->newDepartment ? $hierarchy->newDepartment->name : 'None'));
            }
        }
        
        // Test NewDepartment relationships
        $this->info("\nTesting NewDepartment relationships:");
        $departments = NewDepartment::with('userHierarchies.user')->get();
        
        foreach ($departments as $department) {
            $this->info("Department: {$department->name}");
            $this->info("  - User Hierarchies: " . $department->userHierarchies->count());
        }
        
        // Test UserHierarchy relationships
        $this->info("\nTesting UserHierarchy relationships:");
        $hierarchies = UserHierarchy::with('user', 'location', 'newDepartment', 'manager')->get();
        
        foreach ($hierarchies as $hierarchy) {
            $this->info("Hierarchy: {$hierarchy->user->name} at {$hierarchy->location->name}");
            $this->info("  - Department: " . ($hierarchy->newDepartment ? $hierarchy->newDepartment->name : 'None'));
            $this->info("  - Manager: " . ($hierarchy->manager ? $hierarchy->manager->name : 'None'));
        }
        
        $this->info("\nAll relationships tested successfully!");
    }
}
