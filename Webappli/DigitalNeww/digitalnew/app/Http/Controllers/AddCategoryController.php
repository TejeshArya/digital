<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AddCategory;
use Illuminate\Support\Facades\Storage;

class AddCategoryController extends Controller
{
    public function index()
    {
        // Check if user has permission to access DD Menu
        if (!auth()->user()->hasPermission('dd_menu')) {
            return redirect()->back()->with('error', 'You do not have permission to access DD Menu.');
        }
        
        $categories = AddCategory::latest()->get();
        return view('dd_menu.add_category', compact('categories'));
    }

    public function store(Request $request)
    {
        // Check if user has permission to access DD Menu
        if (!auth()->user()->hasPermission('dd_menu')) {
            return redirect()->back()->with('error', 'You do not have permission to access DD Menu.');
        }
        
        $request->validate([
            'category_name' => 'required|string',
            'description' => 'required|string',
            'photo' => 'required|image|mimes:jpg,png|max:2048',
        ]);

        $filename = $request->file('photo')->store('add_category', 'public');

        AddCategory::create([
            'category_name' => strtoupper($request->category_name),
            'description' => $request->description,
            'photo' => $filename,
        ]);

        return redirect()->route('add_category.index')->with('success', 'Category added!');
    }

    public function update(Request $request, $id)
    {
        $category = AddCategory::findOrFail($id);

        if ($request->hasFile('photo')) {
            Storage::delete('public/' . $category->photo);
            $filename = $request->file('photo')->store('add_category', 'public');
            $category->photo = $filename;
        }

        $category->category_name = strtoupper($request->category_name);
        $category->description = $request->description;
        $category->save();

        return response()->json(true);
    }

    public function destroy($id)
    {
        $category = AddCategory::findOrFail($id);
        Storage::delete('public/' . $category->photo);
        $category->delete();
        return redirect()->route('add_category.index')->with('success', 'Category deleted');
    }
}
