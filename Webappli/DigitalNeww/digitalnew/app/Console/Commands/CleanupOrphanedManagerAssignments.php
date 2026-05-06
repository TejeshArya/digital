<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\ManagerAssignment;
use App\Models\Assignment;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CleanupOrphanedManagerAssignments extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'manager-assignments:cleanup 
                            {--dry-run : Run in dry-run mode without making changes}
                            {--delete-old : Also delete old unassigned records}
                            {--days=90 : Days threshold for deleting old unassigned records}
                            {--force : Skip confirmation prompts}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Cleanup orphaned manager assignments that have no corresponding active employee assignments';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $isDryRun = $this->option('dry-run');
        $deleteOld = $this->option('delete-old');
        $daysThreshold = (int) $this->option('days');
        $force = $this->option('force');

        $this->info('===========================================');
        $this->info('Manager Assignments Cleanup Tool');
        $this->info('===========================================');
        
        if ($isDryRun) {
            $this->warn('DRY RUN MODE - No changes will be made');
        }
        
        $this->newLine();

        // Step 1: Identify orphaned active manager assignments
        $this->info('Step 1: Identifying orphaned active manager assignments...');
        $orphanedActive = $this->getOrphanedActiveManagerAssignments();
        
        if ($orphanedActive->isEmpty()) {
            $this->info('✓ No orphaned active manager assignments found.');
        } else {
            $this->warn("✗ Found {$orphanedActive->count()} orphaned active manager assignments");
            
            // Display details
            $this->table(
                ['ID', 'Employee ID', 'Employee Name', 'Manager Name', 'Created At'],
                $orphanedActive->map(function ($ma) {
                    return [
                        $ma->id,
                        $ma->employee_id,
                        $ma->employee->name ?? 'N/A',
                        $ma->manager->name ?? 'N/A',
                        $ma->created_at->format('Y-m-d H:i:s'),
                    ];
                })->toArray()
            );

            // Ask for confirmation
            if (!$force && !$isDryRun) {
                if (!$this->confirm('Do you want to mark these as unassigned?')) {
                    $this->info('Skipping orphaned active manager assignments cleanup.');
                } else {
                    $this->markAsUnassigned($orphanedActive);
                }
            } elseif (!$isDryRun) {
                $this->markAsUnassigned($orphanedActive);
            } else {
                $this->info('[DRY RUN] Would mark ' . $orphanedActive->count() . ' records as unassigned');
            }
        }

        $this->newLine();

        // Step 2: Handle old unassigned records (if requested)
        if ($deleteOld) {
            $this->info("Step 2: Identifying old unassigned records (older than {$daysThreshold} days)...");
            $oldUnassigned = $this->getOldUnassignedManagerAssignments($daysThreshold);
            
            if ($oldUnassigned->isEmpty()) {
                $this->info("✓ No old unassigned records found (older than {$daysThreshold} days).");
            } else {
                $this->warn("✗ Found {$oldUnassigned->count()} old unassigned records");
                
                // Display details
                $this->table(
                    ['ID', 'Employee Name', 'Manager Name', 'Unassigned At', 'Days Ago'],
                    $oldUnassigned->map(function ($ma) {
                        return [
                            $ma->id,
                            $ma->employee->name ?? 'N/A',
                            $ma->manager->name ?? 'N/A',
                            $ma->unassigned_at->format('Y-m-d H:i:s'),
                            $ma->unassigned_at->diffInDays(now()) . ' days',
                        ];
                    })->toArray()
                );

                // Ask for confirmation
                if (!$force && !$isDryRun) {
                    $this->warn('WARNING: This will permanently delete these records!');
                    if (!$this->confirm('Are you sure you want to delete these old records?')) {
                        $this->info('Skipping old records deletion.');
                    } else {
                        $this->deleteOldRecords($oldUnassigned);
                    }
                } elseif (!$isDryRun) {
                    $this->deleteOldRecords($oldUnassigned);
                } else {
                    $this->info('[DRY RUN] Would delete ' . $oldUnassigned->count() . ' old records');
                }
            }
        }

        $this->newLine();

        // Step 3: Display final summary
        $this->displaySummary();

        $this->newLine();
        $this->info('===========================================');
        $this->info('Cleanup completed!');
        $this->info('===========================================');

        return Command::SUCCESS;
    }

    /**
     * Get orphaned active manager assignments
     */
    protected function getOrphanedActiveManagerAssignments()
    {
        // Get all employee IDs with active assignments
        $activeEmployeeIds = Assignment::whereNull('unassigned_at')
            ->pluck('employee_id')
            ->unique()
            ->toArray();

        // Get manager assignments for employees WITHOUT active assignments
        return ManagerAssignment::with(['employee', 'manager'])
            ->whereNull('unassigned_at')
            ->whereNotIn('employee_id', $activeEmployeeIds)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Get old unassigned manager assignments
     */
    protected function getOldUnassignedManagerAssignments($daysThreshold)
    {
        $thresholdDate = Carbon::now()->subDays($daysThreshold);

        return ManagerAssignment::with(['employee', 'manager'])
            ->whereNotNull('unassigned_at')
            ->where('unassigned_at', '<', $thresholdDate)
            ->orderBy('unassigned_at', 'asc')
            ->get();
    }

    /**
     * Mark manager assignments as unassigned
     */
    protected function markAsUnassigned($managerAssignments)
    {
        DB::beginTransaction();

        try {
            $count = 0;
            foreach ($managerAssignments as $ma) {
                $ma->update([
                    'unassigned_at' => now(),
                    'unassigned_by' => 1, // System cleanup
                    'unassign_reason' => 'Automated cleanup - No active assignment for employee',
                ]);
                $count++;
            }

            DB::commit();
            $this->info("✓ Successfully marked {$count} manager assignments as unassigned");
        } catch (\Exception $e) {
            DB::rollback();
            $this->error("✗ Error marking records as unassigned: " . $e->getMessage());
        }
    }

    /**
     * Delete old manager assignment records
     */
    protected function deleteOldRecords($managerAssignments)
    {
        DB::beginTransaction();

        try {
            $count = $managerAssignments->count();
            $ids = $managerAssignments->pluck('id')->toArray();
            
            ManagerAssignment::whereIn('id', $ids)->delete();

            DB::commit();
            $this->info("✓ Successfully deleted {$count} old manager assignment records");
        } catch (\Exception $e) {
            DB::rollback();
            $this->error("✗ Error deleting old records: " . $e->getMessage());
        }
    }

    /**
     * Display summary statistics
     */
    protected function displaySummary()
    {
        $activeCount = ManagerAssignment::whereNull('unassigned_at')->count();
        $unassignedCount = ManagerAssignment::whereNotNull('unassigned_at')->count();
        $totalCount = ManagerAssignment::count();

        $this->info('Current Database State:');
        $this->table(
            ['Status', 'Count'],
            [
                ['Active Manager Assignments', $activeCount],
                ['Unassigned Manager Assignments', $unassignedCount],
                ['Total Manager Assignments', $totalCount],
            ]
        );

        // Check for any remaining orphaned active records
        $remainingOrphaned = $this->getOrphanedActiveManagerAssignments();
        if ($remainingOrphaned->isEmpty()) {
            $this->info('✓ All active manager assignments have corresponding employee assignments');
        } else {
            $this->warn("✗ Still have {$remainingOrphaned->count()} orphaned active manager assignments");
        }
    }
}

