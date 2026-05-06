<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AddBank;

class AddBankController extends Controller
{
    public function index()
    {
        // Check if user has permission to access DD Menu
        if (!auth()->user()->hasPermission('dd_menu')) {
            return redirect()->back()->with('error', 'You do not have permission to access DD Menu.');
        }
        
        $banks = AddBank::orderByDesc('id')->get();
        return view('dd_menu.add_bank', compact('banks'));
    }

    public function store(Request $request)
    {
        // Check if user has permission to access DD Menu
        if (!auth()->user()->hasPermission('dd_menu')) {
            return redirect()->back()->with('error', 'You do not have permission to access DD Menu.');
        }
        
        $request->validate([
            'bank_name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
        ]);

        AddBank::create([
            'bank_name' => strtoupper($request->bank_name),
            'description' => $request->description,
        ]);

        return redirect()->back()->with('success', 'Bank added successfully.');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'bank_name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
        ]);

        $bank = AddBank::findOrFail($id);
        $bank->update([
            'bank_name' => strtoupper($request->bank_name),
            'description' => $request->description,
        ]);

        return response()->json(['success' => true]);
    }

    public function destroy($id)
    {
        AddBank::destroy($id);
        return redirect()->back()->with('success', 'Bank deleted successfully.');
    }
}
