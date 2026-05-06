<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AddProject;
use App\Models\CompanyGst;
use App\Models\SubGst;
use App\Models\Location;
use App\Models\User;
use App\Models\Wing;
use App\Models\NewDepartment;
use App\Models\PostGroupingMember;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class AddProjectController extends Controller
{
    public function index()
    {
        // Check if user has permission to access Add Project
        if (!auth()->user()->hasPermission('view_projects')) {
            return redirect()->back()->with('error', 'You do not have permission to access Add Project.');
        }
        
        // Check if user is admin (group_id 1 or 2)
        if (auth()->user()->isAdmin()) {
            // Admin users get access to ALL projects
            $projects = AddProject::with([
                'assignedWing', 'assignedDepartment', 'assignedLocation', 'creator', 
                'post.assignments' => function($query) {
                    $query->whereNull('unassigned_at')->with('employee');
                }
            ])
                ->orderBy('id', 'desc')
                ->get();
        } else {
            // Regular users can see projects for:
            // 1. ALL their currently assigned posts
            // 2. Posts that are in the same ACTIVE grouping as their posts (is_active = 1)
            
            // Get user's active post IDs
            $activeAssignments = auth()->user()->getActiveAssignments();
            $userPostIds = $activeAssignments->pluck('post_id')->toArray();
            
            if (!empty($userPostIds)) {
                // Start with user's own post IDs
                $visiblePostIds = $userPostIds;
                
                // Check if any of user's posts are in an ACTIVE grouping (is_active = 1)
                $activeGroupingIds = PostGroupingMember::whereIn('post_id', $userPostIds)
                    ->whereNull('removed_at') // Only posts not removed from grouping
                    ->whereHas('grouping', function($query) {
                        $query->where('is_active', 1); // Only ACTIVE groupings
                    })
                    ->pluck('grouping_id')
                    ->unique();
                
                if ($activeGroupingIds->isNotEmpty()) {
                    // Get ALL posts from these ACTIVE groupings
                    $groupedPosts = PostGroupingMember::whereIn('grouping_id', $activeGroupingIds)
                        ->whereNull('removed_at')
                        ->pluck('post_id')
                        ->toArray();
                    
                    // Merge with user's own posts
                    $visiblePostIds = array_unique(array_merge($visiblePostIds, $groupedPosts));
                }
                
                // Get projects for all visible posts
                $projects = AddProject::with([
                    'assignedWing', 'assignedDepartment', 'assignedLocation', 'creator', 
                    'post.assignments' => function($query) {
                        $query->whereNull('unassigned_at')->with('employee');
                    }
                ])
                    ->whereIn('post_id', $visiblePostIds)
                    ->orderBy('id', 'desc')
                    ->get();
            } else {
                // No assignments = no projects visible
                $projects = collect();
            }
        }
        
        return view('company.add_project', compact('projects'));
    }

    

    public function destroy($id)
    {
        // Check if user has permission to delete projects
        if (!auth()->user()->hasPermission('delete_projects')) {
            return redirect()->back()->with('error', 'You do not have permission to delete projects.');
        }
        
        $project = AddProject::findOrFail($id);
        
        // Check if user is admin or the creator of the project
        if (!auth()->user()->isAdmin() && $project->created_by !== auth()->user()->id) {
            return redirect()->back()->with('error', 'You can only delete projects that you created.');
        }
        
        $project->delete();
        return back()->with('success', 'Project deleted successfully.');
    }


    public function store(Request $request)
{
    // Check if user has permission to access DD Menu
    if (!auth()->user()->hasPermission('create_projects')) {
        return redirect()->back()->with('error', 'You do not have permission to access DD Menu.');
    }
    
    // Check if user is admin
    $isAdmin = auth()->user()->isAdmin();
    
    // Step 1: Validate form inputs (excluding project_no since it will be auto-generated)
    // For admin users, wing_id and department_id are optional
    $validationRules = [
        'post_id' => 'required|exists:user_post,id',
        'post_name' => 'nullable|string',
        'location_id' => 'nullable|exists:locations,id',
        'company_name' => 'required',
        'gst_number' => 'required',
        'department' => 'required',
        'officer_name' => 'required',
        'project_name' => 'required',
        'start_date' => 'required|date',
        'end_date' => 'required|date',
        'value' => 'required|numeric',
        'select_date' => 'required|date',  // Used to determine financial year
        'file_name' => 'nullable|file|mimes:pdf,doc,docx,xlsx,jpg,jpeg,png|max:2048',
    ];
    
    // For non-admin users, wing_id and department_id are required
    if (!$isAdmin) {
        $validationRules['wing_id'] = 'required|exists:wings,id';
        $validationRules['department_id'] = 'required|exists:new_departments,id';
    } else {
        // For admin users, these fields are optional
        $validationRules['wing_id'] = 'nullable|exists:wings,id';
        $validationRules['department_id'] = 'nullable|exists:new_departments,id';
    }
    
    $request->validate($validationRules);

    // Step 2: Parse the select_date
    $date = Carbon::parse($request->select_date);

    // Step 3: Determine financial year start and end (e.g. 2025-2026)
    $fy_start = $date->month < 4 ? $date->year - 1 : $date->year;
    $fy_end = $fy_start + 1;
    $financial_year = $fy_start . '-' . $fy_end;

    // Step 4: Create short code for project_no (e.g. 2526)
    $fy_code = substr($fy_start, -2) . substr($fy_end, -2);

    // Step 5: Find last project_no for this financial year
    $latest = AddProject::where('project_no', 'like', "PN{$fy_code}-%")
        ->orderByDesc('id')
        ->first();

    // Step 6: Determine next project number
    $next_number = 1;
    if ($latest) {
        $last_no_part = (int) substr($latest->project_no, strpos($latest->project_no, '-') + 1);
        $next_number = $last_no_part + 1;
    }

    // Step 7: Generate project_no like PN2526-1
    $project_no = "PN{$fy_code}-{$next_number}";

    $fileName = null;
    if ($request->hasFile('file_name')) {
        $file = $request->file('file_name');
        $fileName = time() . '_' . $file->getClientOriginalName();
        $file->move(public_path('uploads/projects'), $fileName);
    }

    // Step 8: Store the project in the database
    // Convert empty strings to null for optional fields (for admin users)
    $wingId = !empty($request->wing_id) ? $request->wing_id : null;
    $departmentId = !empty($request->department_id) ? $request->department_id : null;
    
    $project = AddProject::create([
        'post_id' => $request->post_id,
        'post_name' => $request->post_name,
        'wing_id' => $wingId,
        'department_id' => $departmentId,
        'location_id' => $request->location_id,
        'client' => $request->company_name,
        'gst' => $request->gst_number,
        'department' => $request->department,
        'officer_name' => $request->officer_name,
        'department_name' => $request->department . ' - ' . $request->officer_name,
        'project_no' => $project_no,
        'project_name' => $request->project_name,
        'start_date' => $request->start_date,
        'end_date' => $request->end_date,
        'value' => $request->value,
        'selecte_date' => $request->select_date, // Note: database column is 'selecte_date'
        'financial_year' => $financial_year,
        'created_by' => Auth::user()->id,
        'file_name' => $fileName,
        'status' => 0, // Default status: 0 = Running, 1 = Completed
    ]);
    
    // Insert into total_item_consumption table
    \App\Models\TotalItemConsumption::create([
        'company_name' => $request->company_name,
        'gst_number' => $request->gst_number,
        'project_name' => $request->project_name,
        'project_no' => $project_no,
        'add_project_id' => $project->id,
    ]);

    // Step 9: Redirect back with success message
    return redirect()->back()->with('success', 'Project Added Successfully! Project No: ' . $project_no);
}

    public function autocompleteCompany(Request $request)
{
    $search = $request->query('term');

    $results = CompanyGst::where('company_name', 'LIKE', "%{$search}%")
        ->orWhere('gst_number', 'LIKE', "%{$search}%")
        ->get()
        ->map(function ($company) {
            return [
                'label' => $company->company_name . ' - ' . $company->gst_number,
                'value' => $company->company_name,
                'gst' => $company->gst_number,
            ];
        });

    return response()->json($results);
}

    /**
     * Return projects for a selected company (used by expense/project selection)
     */
    public function projectsByCompany(Request $request)
{
    $company = $request->query('company_name');

    if (!$company) {
        return response()->json([]);
    }

    $projects = AddProject::where('client', 'LIKE', "%{$company}%")
        ->orderBy('project_name')
        ->get(['project_name', 'project_no', 'gst'])
        ->map(function ($proj) {
            return [
                'project_name' => $proj->project_name,
                'project_no'   => $proj->project_no,
                'gst'          => $proj->gst,
            ];
        })
        ->unique('project_no')
        ->values()
        ->all();

    return response()->json($projects);
}


public function getDepartmentOfficers(Request $request)
{
    if (!$request->has('company_name') || !$request->has('gst_number')) {
        return response()->json([], 400); // Bad request
    }

    $companyName = $request->company_name;
    $gstNumber = $request->gst_number;

    $data = SubGst::where('company_name', $companyName)
        ->where('gst_number', $gstNumber)
        ->where('status', 1)
        ->get()
        ->map(function ($item) {
            return [
                'department' => $item->department,
                'officer_name' => $item->officer_name,
            ];
        });

    return response()->json($data);
}

    /**
     * Update project status
     */
    public function updateStatus(Request $request)
    {
        try {
            $request->validate([
                'project_id' => 'required|integer',
                'status' => 'required|in:0,1'
            ]);

            $project = AddProject::findOrFail($request->project_id);
            
            // Check if user has permission to update projects
            if (!auth()->user()->hasPermission('edit_projects')) {
                return response()->json([
                    'success' => false,
                    'message' => 'You do not have permission to update project status.'
                ], 403);
            }

            $project->status = $request->status;
            $project->save();

            return response()->json([
                'success' => true,
                'message' => 'Project status updated successfully.',
                'data' => [
                    'project_id' => $project->id,
                    'status' => $project->status,
                    'status_text' => $project->status == 1 ? 'Completed' : 'Running'
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating project status: ' . $e->getMessage()
            ], 500);
        }
    }

}

