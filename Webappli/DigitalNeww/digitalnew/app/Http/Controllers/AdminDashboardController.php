<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AdminDashboardService;
use App\Traits\AuthenticatedUser;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Models\State;
use App\Models\City;

class AdminDashboardController extends Controller
{
    use AuthenticatedUser;
    
    protected $dashboardService;

    public function __construct(AdminDashboardService $dashboardService)
    {
        $this->dashboardService = $dashboardService;
    }

    /**
     * Check if user is authenticated and has admin access
     */
    private function checkAdminAccess()
    {
        return $this->checkAuthAndAdmin();
    }

    /**
     * Display the main admin dashboard
     */
    public function index(Request $request)
    {
        $redirect = $this->checkAdminAccess();
        if ($redirect) return $redirect;

        // Get available financial years from database
        $availableFinancialYears = $this->dashboardService->getAvailableFinancialYears();
        $currentFinancialYear = $this->dashboardService->getCurrentFinancialYear();

        // Get filter parameters - don't set any default financial year
        $selectedFinancialYear = $request->get('financial_year');
        
        // Convert empty string to null for "All Years" option
        if ($selectedFinancialYear === '') {
            $selectedFinancialYear = null;
        }

        $filters = [
            'financial_year' => $selectedFinancialYear,
            'date_from' => $request->get('date_from'),
            'date_to' => $request->get('date_to'),
            'client' => $request->get('client'),
            'wing_id' => $request->get('wing_id'),
            'department_id' => $request->get('department_id'),
            'post_id' => $request->get('post_id'),
            'employee_id' => $request->get('employee_id'),
            'dr_employee_id' => $request->get('dr_employee_id'),
            'location_id' => $request->get('location_id'),
            'status' => $request->get('status'),
            'report_date' => $request->get('report_date'),
        ];

        // Get dashboard data
        $dashboardData = $this->dashboardService->getDashboardData($filters);

        $employees = \App\Models\Employee::with('user')->orderBy('name')->get();
        $locations = \App\Models\Location::orderBy('name')->get();

        return view('admin.dashboard', compact('dashboardData', 'filters', 'availableFinancialYears', 'currentFinancialYear', 'employees', 'locations'));
    }

    /**
     * Get client-wise reports
     */
    public function clientWiseReports(Request $request)
    {
        $redirect = $this->checkAdminAccess();
        if ($redirect) return $redirect;

        // Get available financial years from database
        $availableFinancialYears = $this->dashboardService->getAvailableFinancialYears();

        // Get filter options for dropdowns
        $filterOptions = $this->dashboardService->getClientWiseFilterOptions();

        $filters = [
            'financial_year' => $request->get('financial_year'),
            'date_from' => $request->get('date_from'),
            'date_to' => $request->get('date_to'),
            'client' => $request->get('client'),
            'wing_id' => $request->get('wing_id'),
            'department_id' => $request->get('department_id'),
            'post_id' => $request->get('post_id'),
        ];

        $clientReports = $this->dashboardService->getClientWiseReports($filters);

        return view('admin.reports.client-wise', compact('clientReports', 'filters', 'availableFinancialYears', 'filterOptions'));
    }

    /**
     * Get detailed projects data for AJAX popup
     */
    public function getDetailedProjectsData(Request $request)
    {
        $redirect = $this->checkAdminAccess();
        if ($redirect) return $redirect;

        $filters = [
            'financial_year' => $request->get('financial_year'),
            'date_from' => $request->get('date_from'),
            'date_to' => $request->get('date_to'),
            'client' => $request->get('client'),
            'wing_id' => $request->get('wing_id'),
            'department_id' => $request->get('department_id'),
            'post_id' => $request->get('post_id'),
        ];

        $projects = $this->dashboardService->getDetailedProjectsData($filters);

        return response()->json([
            'success' => true,
            'data' => $projects,
            'count' => $projects->count()
        ]);
    }

    /**
     * Get detailed quotations data for AJAX popup
     */
    public function getDetailedQuotationsData(Request $request)
    {
        try {
            $redirect = $this->checkAdminAccess();
            if ($redirect) return $redirect;

            \Log::info('Starting quotations data fetch...');

            // Test 1: Check if we can access the table at all
            try {
                $tableExists = DB::select("SHOW TABLES LIKE 'total_quotations'");
                \Log::info('Table exists check:', $tableExists);
            } catch (\Exception $e) {
                \Log::error('Table check failed: ' . $e->getMessage());
            }

            // Test 2: Try to get basic data
            try {
                $basicQuotations = DB::table('total_quotations')->limit(3)->get();
                \Log::info('Basic quotations count: ' . $basicQuotations->count());
                \Log::info('Basic quotations data:', $basicQuotations->toArray());
            } catch (\Exception $e) {
                \Log::error('Basic quotations query failed: ' . $e->getMessage());
                return response()->json([
                    'success' => false,
                    'error' => 'Basic quotations query failed',
                    'message' => $e->getMessage()
                ], 500);
            }

            // Test 3: Try simple service call
            try {
                $filters = [
                    'financial_year' => $request->get('financial_year'),
                    'client' => $request->get('client'),
                    'wing_id' => $request->get('wing_id'),
                    'department_id' => $request->get('department_id'),
                    'post_id' => $request->get('post_id'),
                    'date_from' => $request->get('date_from'),
                    'date_to' => $request->get('date_to'),
                    'quotation_type' => $request->get('quotation_type'),
                    'work_status' => $request->get('work_status'),
                ];
                
                \Log::info('Calling service with filters:', $filters);
                $quotations = $this->dashboardService->getDetailedQuotationsData($filters);
                \Log::info('Service returned quotations count: ' . $quotations->count());

                return response()->json([
                    'success' => true,
                    'data' => $quotations,
                    'count' => $quotations->count(),
                    'test_data' => $basicQuotations
                ]);
            } catch (\Exception $e) {
                \Log::error('Service call failed: ' . $e->getMessage());
                \Log::error('Service stack trace: ' . $e->getTraceAsString());
                
                // Return basic data if service fails
                return response()->json([
                    'success' => true,
                    'data' => $basicQuotations,
                    'count' => $basicQuotations->count(),
                    'message' => 'Service failed, returning basic data',
                    'error' => $e->getMessage()
                ]);
            }

        } catch (\Exception $e) {
            \Log::error('Critical error in getDetailedQuotationsData controller: ' . $e->getMessage());
            \Log::error('Critical stack trace: ' . $e->getTraceAsString());
            return response()->json([
                'success' => false,
                'error' => 'Critical error occurred',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get detailed invoices data for AJAX popup
     */
    public function getDetailedInvoicesData(Request $request)
    {
        try {
            $redirect = $this->checkAdminAccess();
            if ($redirect) return $redirect;

            \Log::info('Starting invoices data fetch...');

            // Test 1: Check if we can access the table at all
            try {
                $tableExists = DB::select("SHOW TABLES LIKE 'total_sell_invoice'");
                \Log::info('Invoices table exists check:', $tableExists);
            } catch (\Exception $e) {
                \Log::error('Invoices table check failed: ' . $e->getMessage());
            }

            // Test 2: Try to get basic data
            try {
                $basicInvoices = DB::table('total_sell_invoice')->limit(3)->get();
                \Log::info('Basic invoices count: ' . $basicInvoices->count());
                \Log::info('Basic invoices data:', $basicInvoices->toArray());
            } catch (\Exception $e) {
                \Log::error('Basic invoices query failed: ' . $e->getMessage());
                return response()->json([
                    'success' => false,
                    'error' => 'Basic invoices query failed',
                    'message' => $e->getMessage()
                ], 500);
            }

            // Test 3: Try simple service call
            try {
                $filters = [
                    'financial_year' => $request->get('financial_year'),
                    'client' => $request->get('client'),
                    'wing_id' => $request->get('wing_id'),
                    'department_id' => $request->get('department_id'),
                    'post_id' => $request->get('post_id'),
                    'date_from' => $request->get('date_from'),
                    'date_to' => $request->get('date_to'),
                ];
                
                \Log::info('Calling invoices service with filters:', $filters);
                $invoices = $this->dashboardService->getDetailedInvoicesData($filters);
                \Log::info('Service returned invoices count: ' . $invoices->count());

                return response()->json([
                    'success' => true,
                    'data' => $invoices,
                    'count' => $invoices->count(),
                    'test_data' => $basicInvoices
                ]);
            } catch (\Exception $e) {
                \Log::error('Invoices service call failed: ' . $e->getMessage());
                \Log::error('Invoices service stack trace: ' . $e->getTraceAsString());
                
                // Return basic data if service fails
                return response()->json([
                    'success' => true,
                    'data' => $basicInvoices,
                    'count' => $basicInvoices->count(),
                    'message' => 'Service failed, returning basic data',
                    'error' => $e->getMessage()
                ]);
            }

        } catch (\Exception $e) {
            \Log::error('Critical error in getDetailedInvoicesData controller: ' . $e->getMessage());
            \Log::error('Critical stack trace: ' . $e->getTraceAsString());
            return response()->json([
                'success' => false,
                'error' => 'Critical error occurred',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get wing-wise reports
     */
    public function wingWiseReports(Request $request)
    {
        $redirect = $this->checkAdminAccess();
        if ($redirect) return $redirect;

        // Get available financial years from database
        $availableFinancialYears = $this->dashboardService->getAvailableFinancialYears();

        $filters = [
            'financial_year' => $request->get('financial_year'),
            'date_from' => $request->get('date_from'),
            'date_to' => $request->get('date_to'),
        ];

        $wingReports = $this->dashboardService->getWingWiseReports($filters);

        return view('admin.reports.wing-wise', compact('wingReports', 'filters', 'availableFinancialYears'));
    }

    /**
     * Get department-wise reports
     */
    public function departmentWiseReports(Request $request)
    {
        $redirect = $this->checkAdminAccess();
        if ($redirect) return $redirect;

        // Get available financial years from database
        $availableFinancialYears = $this->dashboardService->getAvailableFinancialYears();

        $filters = [
            'financial_year' => $request->get('financial_year'),
            'date_from' => $request->get('date_from'),
            'date_to' => $request->get('date_to'),
        ];

        $departmentReports = $this->dashboardService->getDepartmentWiseReports($filters);

        return view('admin.reports.department-wise', compact('departmentReports', 'filters', 'availableFinancialYears'));
    }

    /**
     * Get project-wise reports
     */
    public function projectWiseReports(Request $request)
    {
        $redirect = $this->checkAdminAccess();
        if ($redirect) return $redirect;

        // Get available financial years from database
        $availableFinancialYears = $this->dashboardService->getAvailableFinancialYears();

        $filters = [
            'financial_year' => $request->get('financial_year'),
            'date_from' => $request->get('date_from'),
            'date_to' => $request->get('date_to'),
            'client' => $request->get('client'),
            'wing_id' => $request->get('wing_id'),
            'department_id' => $request->get('department_id'),
            'post_id' => $request->get('post_id'),
        ];

        $projectReports = $this->dashboardService->getProjectWiseReports($filters);

        return view('admin.reports.project-wise', compact('projectReports', 'filters', 'availableFinancialYears'));
    }

    /**
     * Get post-wise reports
     */
    public function postWiseReports(Request $request)
    {
        $redirect = $this->checkAdminAccess();
        if ($redirect) return $redirect;

        // Get available financial years from database
        $availableFinancialYears = $this->dashboardService->getAvailableFinancialYears();

        $filters = [
            'financial_year' => $request->get('financial_year'),
            'date_from' => $request->get('date_from'),
            'date_to' => $request->get('date_to'),
            'wing_id' => $request->get('wing_id'),
            'department_id' => $request->get('department_id'),
            'post_id' => $request->get('post_id'),
        ];

        $postReports = $this->dashboardService->getPostWiseReports($filters);

        // Get all posts with current assigned employee names
        $posts = \App\Models\CreatePost::orderBy('user')
            ->leftJoin('assignments as a', function($join) {
                $join->on('user_post.id', '=', 'a.post_id')
                     ->whereNull('a.unassigned_at');
            })
            ->leftJoin('users as u', 'a.employee_id', '=', 'u.id')
            ->select([
                'user_post.id',
                'user_post.user as post_name',
                'u.name as employee_name'
            ])
            ->get();

        // Get purchase invoice details with consumption for purchase/consumption view
        $purchaseInvoiceDetails = $this->dashboardService->getPostWisePurchaseInvoiceDetails($filters);

        return view('admin.reports.post-wise', compact('postReports', 'filters', 'availableFinancialYears', 'posts', 'purchaseInvoiceDetails'));
    }

    /**
     * Get purchase reports
     */
    public function purchaseReports(Request $request)
    {
        $redirect = $this->checkAdminAccess();
        if ($redirect) return $redirect;

        // Get available financial years from database
        $availableFinancialYears = $this->dashboardService->getAvailableFinancialYears();

        // Get filter options for dropdowns
        $filterOptions = $this->dashboardService->getPurchaseFilterOptions();

        $filters = [
            'financial_year' => $request->get('financial_year'),
            'date_from' => $request->get('date_from'),
            'date_to' => $request->get('date_to'),
            'location_id' => $request->get('location_id'),
            'post_id' => $request->get('post_id'),
        ];

        $purchaseReports = $this->dashboardService->getPurchaseReports($filters);

        return view('admin.reports.purchase', compact('purchaseReports', 'filters', 'availableFinancialYears', 'filterOptions'));
    }

    /**
     * Export reports to PDF
     */
    public function exportPdf(Request $request, $type)
    {
        $redirect = $this->checkAdminAccess();
        if ($redirect) return $redirect;

        $filters = [
            'financial_year' => $request->get('financial_year'),
            'date_from' => $request->get('date_from'),
            'date_to' => $request->get('date_to'),
            'client' => $request->get('client'),
            'wing_id' => $request->get('wing_id'),
            'department_id' => $request->get('department_id'),
            'post_id' => $request->get('post_id'),
        ];

        return $this->dashboardService->exportReportToPdf($type, $filters);
    }

    /**
     * Export reports to Excel
     */
    public function exportExcel(Request $request, $type)
    {
        $redirect = $this->checkAdminAccess();
        if ($redirect) return $redirect;

        $filters = [
            'financial_year' => $request->get('financial_year'),
            'date_from' => $request->get('date_from'),
            'date_to' => $request->get('date_to'),
            'client' => $request->get('client'),
            'wing_id' => $request->get('wing_id'),
            'department_id' => $request->get('department_id'),
            'post_id' => $request->get('post_id'),
        ];

        return $this->dashboardService->exportReportToExcel($type, $filters);
    }

    /**
     * Get detailed line items and consumption for an invoice (AJAX)
     */
    public function getPurchaseInvoiceDetailedData(Request $request, $id)
    {
        $redirect = $this->checkAdminAccess();
        if ($redirect) return $redirect;

        try {
            $data = $this->dashboardService->getPurchaseInvoiceDetailsForModal($id);
            return response()->json([
                'success' => true,
                'data' => $data
            ]);
        } catch (\Exception $e) {
            \Log::error('Error fetching purchase invoice detailed data: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to load details'
            ], 500);
        }
    }

    /**
     * Get chart data for AJAX requests
     */
    public function getChartData(Request $request)
    {
        $redirect = $this->checkAuthAndPermissionForApi('admin_access');
        if ($redirect) return $redirect;

        $chartType = $request->get('chart_type');
        $filters = [
            'financial_year' => $request->get('financial_year'),
            'date_from' => $request->get('date_from'),
            'date_to' => $request->get('date_to'),
        ];

        $chartData = $this->dashboardService->getChartData($chartType, $filters);

        return response()->json($chartData);
    }

    /**
     * Get project status data (running and completed projects)
     */
    public function getProjectStatusData(Request $request)
    {
        $redirect = $this->checkAuthAndPermissionForApi('admin_access');
        if ($redirect) return $redirect;

        try {
            $filters = [
                'financial_year' => $request->get('financial_year'),
                'date_from' => $request->get('date_from'),
                'date_to' => $request->get('date_to'),
                'client' => $request->get('client'),
                'wing_id' => $request->get('wing_id'),
                'department_id' => $request->get('department_id'),
                'post_id' => $request->get('post_id'),
                'state' => $request->get('state'),
                'city' => $request->get('city'),
            ];

            $runningProjects = $this->dashboardService->getRunningProjects($filters);
            $completedProjects = $this->dashboardService->getCompletedProjects($filters);

            return response()->json([
                'running' => $runningProjects,
                'completed' => $completedProjects,
                'running_count' => $runningProjects->count(),
                'completed_count' => $completedProjects->count()
            ]);
        } catch (\Exception $e) {
            \Log::error('Error in getProjectStatusData: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to load project data',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get location filters (states from states table)
     */
    public function getLocationFilters(Request $request)
    {
        $redirect = $this->checkAuthAndPermissionForApi('admin_access');
        if ($redirect) return $redirect;

        try {
            // Get states from states table
            $states = State::orderBy('state_name')
                ->pluck('state_name')
                ->values();

            return response()->json([
                'states' => $states,
                'cities' => [] // Cities will be loaded dynamically based on state selection
            ]);
        } catch (\Exception $e) {
            \Log::error('Error in getLocationFilters: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to load location filters',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get cities by state name
     */
    public function getCitiesByState(Request $request)
    {
        $redirect = $this->checkAuthAndPermissionForApi('admin_access');
        if ($redirect) return $redirect;

        try {
            $stateName = $request->get('state_name');
            
            if (!$stateName) {
                return response()->json([]);
            }

            // Find state by state_name
            $state = State::where('state_name', $stateName)->first();
            
            if (!$state) {
                return response()->json([]);
            }

            // Get cities for this state
            $cities = City::where('state_id', $state->id)
                ->orderBy('city_name')
                ->get(['id', 'city_name']);

            return response()->json($cities);
        } catch (\Exception $e) {
            \Log::error('Error in getCitiesByState: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to load cities',
                'message' => $e->getMessage()
            ], 500);
        }
    }


    /**
     * Debug project data
     */
    public function debugProjectData()
    {
        $redirect = $this->checkAuthAndPermissionForApi('admin_access');
        if ($redirect) return $redirect;

        $debugData = $this->dashboardService->debugProjectData();
        return response()->json($debugData);
    }

    /**
     * Debug financial year data
     */
    public function debugFinancialYearData()
    {
        $redirect = $this->checkAuthAndPermissionForApi('admin_access');
        if ($redirect) return $redirect;

        $debugData = $this->dashboardService->debugFinancialYearData();
        return response()->json($debugData);
    }

    /**
     * Get project quotations and invoices
     */
    public function getProjectQuotationsAndInvoices(Request $request, $projectNo)
    {
        $redirect = $this->checkAuthAndPermissionForApi('admin_access');
        if ($redirect) return $redirect;

        try {
            \Log::info('Getting quotations and invoices for project: ' . $projectNo);
            
            $filters = [
                'financial_year' => $request->get('financial_year'),
                'date_from' => $request->get('date_from'),
                'date_to' => $request->get('date_to'),
            ];

            \Log::info('Filters: ', $filters);

            $projectData = $this->dashboardService->getProjectQuotationsAndInvoices($projectNo, $filters);

            \Log::info('Project data result: ' . json_encode($projectData));

            if (!$projectData) {
                \Log::warning('No data found for project: ' . $projectNo);
                return response()->json(['error' => 'Project not found'], 404);
            }

            return response()->json($projectData);
        } catch (\Exception $e) {
            \Log::error('Error in getProjectQuotationsAndInvoices: ' . $e->getMessage());
            \Log::error('Stack trace: ' . $e->getTraceAsString());
            return response()->json([
                'error' => 'Failed to load project data',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get detailed project information
     */
    public function getProjectDetails(Request $request, $projectNo)
    {
        $redirect = $this->checkAuthAndPermissionForApi('admin_access');
        if ($redirect) return $redirect;

        $filters = [
            'financial_year' => $request->get('financial_year'),
            'date_from' => $request->get('date_from'),
            'date_to' => $request->get('date_to'),
        ];

        $projectDetails = $this->dashboardService->getProjectDetails($projectNo, $filters);

        if (!$projectDetails) {
            return response()->json(['error' => 'Project not found'], 404);
        }

        return response()->json($projectDetails);
    }

    /**
     * Get DC details for a specific project
     */
    public function getProjectDcDetails(Request $request, $projectNo)
    {
        $redirect = $this->checkAuthAndPermissionForApi('admin_access');
        if ($redirect) return $redirect;

        try {
            \Log::info('Getting DC details for project: ' . $projectNo);
            
            $filters = [
                'financial_year' => $request->get('financial_year'),
                'date_from' => $request->get('date_from'),
                'date_to' => $request->get('date_to'),
            ];

            \Log::info('DC Details Filters: ', $filters);

            $dcDetails = $this->dashboardService->getProjectDcDetails($projectNo, $filters);

            \Log::info('DC Details result count: ' . $dcDetails->count());

            return response()->json([
                'project_no' => $projectNo,
                'dc_details' => $dcDetails,
                'count' => $dcDetails->count()
            ]);
        } catch (\Exception $e) {
            \Log::error('Error in getProjectDcDetails: ' . $e->getMessage());
            \Log::error('Stack trace: ' . $e->getTraceAsString());
            return response()->json([
                'error' => 'Failed to load DC details',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get purchase invoice details based on expense type and field type
     */
    public function getPurchaseInvoiceDetails(Request $request)
    {
        $redirect = $this->checkAuthAndPermissionForApi('admin_access');
        if ($redirect) return $redirect;

        try {
            $filters = [
                'financial_year' => $request->get('financial_year'),
                'date_from' => $request->get('date_from'),
                'date_to' => $request->get('date_to'),
                'expense_type' => $request->get('expense_type', 'total'),
                'field_type' => $request->get('field_type', 'invoices'),
            ];

            $purchaseInvoices = $this->dashboardService->getPurchaseInvoiceDetails($filters);

            return response()->json([
                'invoices' => $purchaseInvoices,
                'expense_type' => $filters['expense_type'],
                'field_type' => $filters['field_type'],
                'count' => $purchaseInvoices->count()
            ]);
        } catch (\Exception $e) {
            \Log::error('Error in getPurchaseInvoiceDetails: ' . $e->getMessage());
            \Log::error('Stack trace: ' . $e->getTraceAsString());
            return response()->json([
                'error' => 'Failed to load purchase invoice details',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get consumed projects detailed data for AJAX popup
     */
    public function getConsumedProjectsDetailedData(Request $request)
    {
        $redirect = $this->checkAuthAndPermissionForApi('admin_access');
        if ($redirect) return $redirect;

        try {
            $filters = [
                'financial_year' => $request->get('financial_year'),
                'date_from' => $request->get('date_from'),
                'date_to' => $request->get('date_to'),
                'client' => $request->get('client'),
                'wing_id' => $request->get('wing_id'),
                'department_id' => $request->get('department_id'),
                'post_id' => $request->get('post_id'),
                'state' => $request->get('state'),
                'city' => $request->get('city'),
            ];

            $projects = $this->dashboardService->getConsumedProjectsSummary($filters);

            return response()->json([
                'success' => true,
                'data' => $projects,
                'count' => $projects->count()
            ]);
        } catch (\Exception $e) {
            \Log::error('Error in getConsumedProjectsDetailedData: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'error' => 'Failed to load consumed projects data',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get detailed consumption for a specific project
     */
    public function getProjectConsumptionDetails(Request $request, $project_no)
    {
        $redirect = $this->checkAuthAndPermissionForApi('admin_access');
        if ($redirect) return $redirect;

        try {
            $filters = [
                'financial_year' => $request->get('financial_year'),
                'date_from' => $request->get('date_from'),
                'date_to' => $request->get('date_to'),
            ];

            $details = $this->dashboardService->getProjectDetailedConsumption($project_no, $filters);

            return response()->json([
                'success' => true,
                'data' => $details,
                'project_no' => $project_no
            ]);
        } catch (\Exception $e) {
            \Log::error('Error in getProjectConsumptionDetails: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'error' => 'Failed to load consumption details',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get post-wise purchase entry and consumption data
     */
    public function getPostWisePurchaseAndConsumption(Request $request)
    {
        $redirect = $this->checkAuthAndPermissionForApi('admin_access');
        if ($redirect) return $redirect;

        try {
            $filters = [
                'financial_year' => $request->get('financial_year'),
                'date_from' => $request->get('date_from'),
                'date_to' => $request->get('date_to'),
            ];

            $postWiseData = $this->dashboardService->getPostWisePurchaseAndConsumption($filters);

            return response()->json([
                'success' => true,
                'data' => $postWiseData,
                'count' => $postWiseData->count()
            ]);
        } catch (\Exception $e) {
            \Log::error('Error in getPostWisePurchaseAndConsumption: ' . $e->getMessage());
            \Log::error('Stack trace: ' . $e->getTraceAsString());
            return response()->json([
                'success' => false,
                'error' => 'Failed to load post-wise purchase and consumption data',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get post holder details (current holder, location, manager)
     */
    public function getPostHolderDetails(Request $request)
    {
        $redirect = $this->checkAuthAndPermissionForApi('admin_access');
        if ($redirect) return $redirect;

        try {
            $postId = $request->get('post_id');
            
            if (!$postId) {
                return response()->json([
                    'success' => false,
                    'message' => 'Post ID is required'
                ], 400);
            }

            // Get current active assignment for this post
            $assignment = \App\Models\Assignment::where('post_id', $postId)
                ->whereNull('unassigned_at')
                ->with([
                    'employee',
                    'employee.employee', // load employee profile for mobile
                    'location',
                    'post'
                ])
                ->latest()
                ->first();

            if (!$assignment) {
                return response()->json([
                    'success' => false,
                    'message' => 'No active assignment found for this post'
                ]);
            }

            $employee = $assignment->employee;
            $location = $assignment->location;
            $post = $assignment->post;

            // Get manager from manager_assignments table
            $managerAssignment = \App\Models\ManagerAssignment::where('employee_id', $employee->id)
                ->whereNull('unassigned_at')
                ->with(['manager', 'manager.employee'])
                ->latest()
                ->first();

            $manager = null;
            if ($managerAssignment && $managerAssignment->manager) {
                $managerProfile = $managerAssignment->manager->employee;
                $managerMobile = data_get($managerProfile, 'mobile_regular')
                    ?? data_get($managerProfile, 'phone')
                    ?? data_get($managerAssignment->manager, 'mobile_no')
                    ?? data_get($managerAssignment->manager, 'mobile');
                $manager = [
                    'id' => $managerAssignment->manager->id,
                    'name' => $managerAssignment->manager->name,
                    'email' => $managerAssignment->manager->email,
                    'mobile' => $managerMobile,
                ];
            }

            $employeeProfile = $employee->employee;
            $holderMobile = data_get($employeeProfile, 'mobile_regular')
                ?? data_get($employeeProfile, 'phone')
                ?? data_get($employee, 'mobile_no')
                ?? data_get($employee, 'mobile');

            return response()->json([
                'success' => true,
                'data' => [
                    'post' => [
                        'id' => $post->id,
                        'name' => $post->user,
                        'description' => $post->description,
                    ],
                    'current_holder' => [
                        'id' => $employee->id,
                        'name' => $employee->name,
                        'email' => $employee->email,
                        'mobile' => $holderMobile,
                    ],
                    'location' => $location ? [
                        'id' => $location->id,
                        'name' => $location->name,
                    ] : null,
                    'manager' => $manager,
                    'assignment_date' => $assignment->created_at->format('Y-m-d'),
                ]
            ]);
        } catch (\Exception $e) {
            \Log::error('Error in getPostHolderDetails: ' . $e->getMessage());
            \Log::error('Stack trace: ' . $e->getTraceAsString());
            return response()->json([
                'success' => false,
                'error' => 'Failed to load post holder details',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get summary details for dashboard cards
     */
    public function getSummaryDetails(Request $request)
    {
        $redirect = $this->checkAuthAndPermissionForApi('admin_access');
        if ($redirect) return $redirect;

        try {
            $type = $request->get('type', 'quotations');
            $filters = [
                'financial_year' => $request->get('financial_year'),
                'date_from' => $request->get('date_from'),
                'date_to' => $request->get('date_to'),
                'state' => $request->get('state'),
                'city' => $request->get('city'),
            ];

            $details = $this->dashboardService->getSummaryDetails($type, $filters);
            return response()->json($details);
        } catch (\Exception $e) {
            \Log::error('Error in getSummaryDetails: ' . $e->getMessage());
            \Log::error('Stack trace: ' . $e->getTraceAsString());
            return response()->json([
                'error' => 'Failed to load summary details',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display Profit & Loss report
     */
    public function profitAndLossReport(Request $request)
    {
        $redirect = $this->checkAdminAccess();
        if ($redirect) return $redirect;

        // Get available financial years from database
        $availableFinancialYears = $this->dashboardService->getAvailableFinancialYears();

        // Get filter parameters
        $selectedFinancialYear = $request->get('financial_year');
        
        // Convert empty string to null for "All Years" option
        if ($selectedFinancialYear === '') {
            $selectedFinancialYear = null;
        }

        $filters = [
            'financial_year' => $selectedFinancialYear,
            'date_from' => $request->get('date_from'),
            'date_to' => $request->get('date_to'),
            'wing_id' => $request->get('wing_id'),
            'department_id' => $request->get('department_id'),
            'post_id' => $request->get('post_id'),
        ];

        // Get P&L data from service
        $profitLossData = $this->dashboardService->getProfitAndLossData($filters);

        return view('admin.reports.profit-loss', compact('profitLossData', 'filters', 'availableFinancialYears'));
    }
}
