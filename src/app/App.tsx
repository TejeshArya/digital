import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/WebappliSidebar';
import { LoginScreen } from '../pages/auth/LoginScreen';
import { Dashboard } from '../pages/dashboard/Dashboard';
import { CompanyGST } from '../pages/dashboard/CompanyGST';
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { EmployeePortal } from '../pages/dashboard/EmployeePortal';
import { LeaveManagement } from '../pages/hr/LeaveManagement';
import { Projects } from '../pages/business/Projects';
import { Quotations } from '../pages/business/Quotations';
import { Purchase } from '../pages/business/Purchase';
import { Invoices } from '../pages/business/Invoices';
import { HRDashboard } from '../pages/hr/HRDashboard';
import { Attendance } from '../pages/hr/Attendance';
import { Employees } from '../pages/hr/Employees';
import { DeliveryDetails } from '../pages/dashboard/DeliveryDetails';
import { SubGST } from '../pages/dashboard/SubGST';
import { AddBank } from '../pages/dashboard/AddBank';
import { BankDetails } from '../pages/dashboard/BankDetails';
import { UploadDocuments } from '../pages/dashboard/UploadDocuments';
import { MyDocuments } from '../pages/dashboard/MyDocuments';
import { DesignationOfficer } from '../pages/dd-menus/DesignationOfficer';
import { ClientDepartment } from '../pages/dd-menus/ClientDepartment';

// New Screens
import { NewQuotation } from '../pages/business/NewQuotation';
import { ManagePurchase } from '../pages/business/ManagePurchase';
import { SingleItemSelling } from '../pages/business/SingleItemSelling';
import { PurchaseDC } from '../pages/business/PurchaseDC';
import { AllCreatedDC } from '../pages/business/AllCreatedDC';
import { ItemConsumption } from '../pages/business/ItemConsumption';
import { QuotationWorkManage } from '../pages/business/QuotationWorkManage';
import { QuotationPreview } from '../pages/business/QuotationPreview';
import { InvoiceView } from '../pages/business/InvoiceView';
import { PrepareGSTR } from '../pages/accounts/PrepareGSTR';
import { AllPreparedGSTR } from '../pages/accounts/AllPreparedGSTR';
import { InputGST } from '../pages/accounts/InputGST';
import { AddEmployee } from '../pages/hr/AddEmployee';
import { ProfileUpdates } from '../pages/hr/ProfileUpdates';
import { EmployeeApproval } from '../pages/hr/EmployeeApproval';
import { Wings } from '../pages/hr/Wings';
import { CreateGroupID } from '../pages/hr/CreateGroupID';
import { LocationManagement } from '../pages/hr/LocationManagement';
import { SubLocation } from '../pages/hr/SubLocation';
import { NewDepartment } from '../pages/hr/NewDepartment';
import { RoleAssignment } from '../pages/hr/RoleAssignment';
import { CreatePost } from '../pages/hr/CreatePost';
import { LocationHead } from '../pages/hr/LocationHead';
import { ManagerAssignment } from '../pages/hr/ManagerAssignment';
import { EmployeeFundTracking } from '../pages/hr/EmployeeFundTracking';
import { PostGrouping } from '../pages/hr/PostGrouping';
import { DailyAttendance } from '../pages/hr/DailyAttendance';
import { ManageShifts } from '../pages/hr/ManageShifts';
import { AttendanceView } from '../pages/hr/AttendanceView';
import { BulkAttendance } from '../pages/hr/BulkAttendance';
import { ManualAttendance } from '../pages/hr/ManualAttendance';
import { AttendanceApproval } from '../pages/hr/AttendanceApproval';
import { OTApprovals } from '../pages/hr/OTApprovals';
import { EmployeeOT } from '../pages/hr/EmployeeOT';
import { SalaryTypes } from '../pages/hr/SalaryTypes';
import { EmployeeSalaries } from '../pages/hr/EmployeeSalaries';
import { SalaryRuns } from '../pages/hr/SalaryRuns';
import { SalaryDraft } from '../pages/hr/SalaryDraft';
import { LeaveAssignments } from '../pages/hr/LeaveAssignments';
import { LeaveTypes } from '../pages/hr/LeaveTypes';
import { LeaveApproval } from '../pages/hr/LeaveApproval';
import { HolidayList } from '../pages/hr/HolidayList';
import { ApplyLeave } from '../pages/hr/ApplyLeave';
import { EmployeeHolidays } from '../pages/hr/EmployeeHolidays';
import { HolidayCalendar } from '../pages/hr/HolidayCalendar';
import { ITDashboard } from '../pages/it/ITDashboard';
import { ITEmployeeApproval } from '../pages/it/ITEmployeeApproval';
import { ITUserManagement } from '../pages/it/ITUserManagement';
import { ITRoleManagement } from '../pages/it/ITRoleManagement';
import { UpdatePassword } from '../pages/it/UpdatePassword';
import { MasterDataManagement } from '../pages/dd-menus/MasterDataManagement';
import { UpdateProfile } from '../pages/dashboard/UpdateProfile';
import { ViewProfile } from '../pages/dashboard/ViewProfile';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentPath, setCurrentPath] = useState('/dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [selectedQuotation, setSelectedQuotation] = useState<any>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = () => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const renderContent = () => {
    // Dashboards
    if (currentPath === '/dashboard') return <Dashboard onNavigate={setCurrentPath} />;
    if (currentPath === '/company-gst') return <CompanyGST />;
    if (currentPath === '/delivery-details') return <DeliveryDetails />;
    if (currentPath === '/sub-gst') return <SubGST isMasterPage={false} />;
    if (currentPath === '/add-bank') return <AddBank />;
    if (currentPath === '/bank-details') return <BankDetails />;
    if (currentPath === '/upload-documents') return <UploadDocuments onNavigate={setCurrentPath} />;
    if (currentPath === '/my-documents') return <MyDocuments onNavigate={setCurrentPath} />;
    if (currentPath === '/admin/dashboard') return <AdminDashboard />;

    // Business
    if (currentPath === '/projects') return <Projects />;
    if (currentPath === '/quotations/new') return <NewQuotation onNavigate={setCurrentPath} />;
    if (currentPath === '/quotations/all') return <Quotations onNavigate={setCurrentPath} onSelectQuotation={(q: any) => setSelectedQuotation(q)} />;
    if (currentPath === '/quotations/work-manage') return <QuotationWorkManage onNavigate={setCurrentPath} quotation={selectedQuotation} />;
    if (currentPath === '/quotations/preview') return <QuotationPreview onNavigate={setCurrentPath} quotation={selectedQuotation} />;
    if (currentPath === '/purchase') return <Purchase />;
    if (currentPath === '/purchase/manage') return <ManagePurchase />;
    if (currentPath === '/purchase/single-item') return <SingleItemSelling />;
    if (currentPath === '/purchase/dc') return <PurchaseDC />;
    if (currentPath === '/purchase/all-dc') return <AllCreatedDC />;
    if (currentPath === '/invoices/consumption') return <ItemConsumption />;
    if (currentPath === '/invoices/all') return <Invoices onNavigate={setCurrentPath} onSelectInvoice={(inv: any) => setSelectedInvoice(inv)} />;
    if (currentPath === '/invoices/view') return <InvoiceView onNavigate={setCurrentPath} invoice={selectedInvoice} />;

    // Accounts
    if (currentPath === '/accounts/prepare-gstr') return <PrepareGSTR />;
    if (currentPath === '/accounts/all-prepared-gstr') return <AllPreparedGSTR />;
    if (currentPath === '/accounts/input-gst') return <InputGST />;

    // HR
    if (currentPath === '/hr/dashboard') return <HRDashboard />;
    if (currentPath === '/hr/profile-updates') return <ProfileUpdates />;
    if (currentPath === '/hr/employees') return <Employees onNavigate={setCurrentPath} />;
    if (currentPath === '/hr/add-employee') return <AddEmployee onNavigate={setCurrentPath} />;
    if (currentPath === '/hr/group-id') return <CreateGroupID />;
    if (currentPath === '/hr/wing') return <Wings />;
    if (currentPath === '/hr/department') return <NewDepartment />;
    if (currentPath === '/hr/location') return <LocationManagement />;
    if (currentPath === '/hr/sub-location') return <SubLocation />;
    if (currentPath === '/hr/post') return <CreatePost onNavigate={setCurrentPath} />;
    if (currentPath === '/hr/role-assign') return <RoleAssignment />;
    if (currentPath === '/hr/manager-assign') return <ManagerAssignment />;
    if (currentPath === '/hr/location-head') return <LocationHead />;
    if (currentPath === '/hr/post-grouping') return <PostGrouping />;
    if (currentPath === '/hr/employee-funds') return <EmployeeFundTracking />;
    if (currentPath === '/hr/shifts') return <ManageShifts />;
    if (currentPath === '/hr/attendance/daily') return <DailyAttendance />;
    if (currentPath === '/hr/attendance/bulk') return <BulkAttendance />;
    if (currentPath === '/hr/attendance/view') return <AttendanceView />;
    if (currentPath === '/hr/attendance/approval') return <AttendanceApproval />;
    if (currentPath === '/hr/attendance/manual') return <ManualAttendance />;
    if (currentPath === '/hr/ot') return <EmployeeOT />;
    if (currentPath === '/hr/ot-approvals') return <OTApprovals />;
    if (currentPath === '/hr/salaries') return <EmployeeSalaries />;
    if (currentPath === '/hr/salary-types') return <SalaryTypes />;
    if (currentPath === '/hr/salary/draft') return <SalaryDraft />;
    if (currentPath === '/hr/salary/runs') return <SalaryRuns />;
    if (currentPath === '/hr/leave-types') return <LeaveTypes />;
    if (currentPath === '/hr/leave/assign') return <LeaveAssignments />;
    if (currentPath === '/hr/leave/apply') return <ApplyLeave />;
    if (currentPath === '/hr/leave/approval') return <LeaveApproval />;
    if (currentPath === '/hr/holiday-list') return <HolidayList />;
    if (currentPath === '/hr/holiday-calendar') return <HolidayCalendar />;
    if (currentPath === '/hr/employee-holidays') return <EmployeeHolidays />;

    // IT
    if (currentPath === '/it/dashboard') return <ITDashboard />;
    if (currentPath === '/it/employee-approval') return <ITEmployeeApproval />;
    if (currentPath === '/it/update-password') return <UpdatePassword />;
    if (currentPath === '/it/manage-users') return <ITUserManagement />;
    if (currentPath === '/it/manage-roles') return <ITRoleManagement />;

    // DD MENUS
    if (currentPath === '/dd/payment-mode') return <MasterDataManagement category="Payment Mode" title="Add Payment Mode" fieldLabel="Payment Mode" />;
    if (currentPath === '/dd/categories') return <MasterDataManagement category="Category" title="Add Category" fieldLabel="Category Name" showPhoto={true} />;
    if (currentPath === '/dd/brands') return <MasterDataManagement category="Brand" title="Add Brand" fieldLabel="Brand Name" showPhoto={true} />;
    if (currentPath === '/dd/sub-categories') return <MasterDataManagement category="Sub Category" title="Add Sub Category" fieldLabel="Sub Category Name" parentCategory="Category" showPhoto={true} />;
    if (currentPath === '/dd/sub-sub-categories') return <MasterDataManagement category="Sub Sub Category" title="Add Sub Sub Category" fieldLabel="Sub Sub Category Name" parentCategory="Sub Category" showPhoto={true} />;
    if (currentPath === '/dd/client-department') return <ClientDepartment />;
    if (currentPath === '/dd/department-officer' || currentPath === '/dd/department-designation-officer') return <SubGST isMasterPage={true} />;
    if (currentPath === '/dd/designation-officer') return <DesignationOfficer />;
    if (currentPath === '/dd/hsn') return <MasterDataManagement category="HSN" title="Add HSN" fieldLabel="HSN Code" />;
    if (currentPath === '/dd/gst-percent') return <MasterDataManagement category="GST %" title="Add GST %" fieldLabel="GST %" />;
    if (currentPath === '/dd/gst-type') return <MasterDataManagement category="GST Type" title="Add GST Type" fieldLabel="GST Type" />;
    if (currentPath === '/dd/denom') return <MasterDataManagement category="Denom" title="Add Denom" fieldLabel="Denom Name" showShortName={true} />;
    if (currentPath === '/dd/state') return <MasterDataManagement category="State" title="State" fieldLabel="State Name" showShortName={true} shortNameLabel="State GST Code" showGstStateCode={true} showLocation={true} locationLabel="Location" descriptionLabel="Remarks" />;
    if (currentPath === '/dd/city') return <MasterDataManagement category="City" title="Add City" fieldLabel="City Name" parentCategory="State" />;
    if (currentPath === '/dd/expense') return <MasterDataManagement category="Expense" title="Expense" fieldLabel="Expense Name" types={["Direct Expense", "Indirect Expense"]} />;
    if (currentPath === '/dd/amount-type') return <MasterDataManagement category="Amount Type" title="Add Amount Type" fieldLabel="Amount Type" tableHeaderColor="bg-[#1cc88a]" tableTitle="Amount Types List" showId={true} showCreatedBy={true} isDescriptionTextArea={true} />;
    if (currentPath === '/dd/state-location') return <MasterDataManagement category="State Location" title="Add State Location" fieldLabel="Location Name" parentCategory="State" />;
    if (currentPath === '/dd/amount') return <MasterDataManagement category="Amount" title="Add Amount" fieldLabel="Amount" />;
    if (currentPath === '/dd/add-project') return <MasterDataManagement category="Project" title="Add Project" fieldLabel="Project Name" />;
    if (currentPath === '/dd/core-qualification') return <MasterDataManagement category="Qualification" title="Add Core Qualification" fieldLabel="Qualification" />;
    if (currentPath === '/dd/document-categories') return <MasterDataManagement category="Document Category" title="Add Document Category" fieldLabel="Category" />;
    if (currentPath === '/dd/sub-document-categories') return <MasterDataManagement category="Sub Document Category" title="Add Sub Document Category" fieldLabel="Sub Category" parentCategory="Document Category" />;
    if (currentPath === '/dd/sub-sub-document-categories') return <MasterDataManagement category="Sub Sub Document Category" title="Add Sub Sub Document Category" fieldLabel="Sub Sub Category" parentCategory="Sub Document Category" />;
    if (currentPath === '/hr/attendance/daily') return <Attendance />;
    if (currentPath === '/hr/leave/apply' || currentPath === '/hr/leave/approval') return <LeaveManagement />;
    if (currentPath === '/hr/employee-approval') return <EmployeeApproval onNavigate={setCurrentPath} />;

    // Employee Portal
    if (currentPath === '/portal') return <EmployeePortal onNavigate={setCurrentPath} />;
    if (currentPath === '/portal/profile') return <UpdateProfile onNavigate={setCurrentPath} />;
    if (currentPath === '/portal/view-profile') return <ViewProfile onNavigate={setCurrentPath} />;


    // Generic fallback for other routes

    // Generic fallback for other routes
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {currentPath.split('/').filter(Boolean).pop()?.replace(/-/g, ' ').toUpperCase() || 'Page'}
        </h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 mb-3">
            This screen is under development.
          </p>
          <p className="text-sm text-gray-500">
            Current Path: <span className="font-semibold text-blue-600">{currentPath}</span>
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Navbar 
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        user={user || { name: 'User', email: '', avatar: '' }} 
        onLogout={handleLogout}
        onNavigate={setCurrentPath}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} currentPath={currentPath} onNavigate={setCurrentPath} user={user} />

        <main className="flex-1 overflow-y-auto bg-gray-50">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}