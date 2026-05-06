<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Employee;
use App\Models\Assignment;
use App\Models\Group;
use App\Models\Location;
use App\Models\CreatePost;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class AdminCreationController extends Controller
{
    /**
     * Show admin creation form
     */
    public function create()
    {
        return view('admin.create');
    }

    /**
     * Store admin user
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
        ]);

        DB::beginTransaction();
        
        try {
            // Step 1: Ensure prerequisites exist
            $group = Group::firstOrCreate(
                ['group_id' => '1'],
                ['name' => 'Admin', 'description' => 'Administrator Group']
            );

            $location = Location::firstOrCreate(
                ['name' => 'Head Office'],
                ['description' => 'Main Office Location']
            );

            $post = CreatePost::firstOrCreate(
                ['group_id' => '1', 'user' => 'Administrator'],
                ['description' => 'Admin Post', 'created_by' => 1]
            );

            // Step 2: Create admin user
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'approval_status' => 'approved',
                'is_active' => 1,
                'activated_at' => now(),
                'email_verified_at' => now(),
            ]);

            // Step 3: Create employee record
            $employee = Employee::create([
                'user_id' => $user->id,
                'employee_id' => 'ADMIN' . str_pad($user->id, 3, '0', STR_PAD_LEFT),
                'name' => $request->name,
                'email' => $request->email,
                'status' => 'active',
                'approval_status' => 'approved',
                'role_id' => '1',
                'location_id' => $location->id,
            ]);

            // Step 4: Create assignment
            Assignment::create([
                'group_id' => '1',
                'post_id' => $post->id,
                'location_id' => $location->id,
                'employee_id' => $user->id,
                'description' => 'System Administrator',
                'created_by' => $user->id,
            ]);

            // Step 5: Assign admin role (if exists)
            $adminRole = Role::where('name', 'admin')->first();
            if ($adminRole) {
                DB::table('user_roles')->updateOrInsert(
                    ['user_id' => $user->id, 'role_id' => $adminRole->id],
                    ['created_at' => now(), 'updated_at' => now()]
                );
            }

            DB::commit();

            return redirect()->route('login')->with('success', 'Admin user created successfully! You can now login.');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Error creating admin: ' . $e->getMessage())->withInput();
        }
    }
}

