<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AddSubCategory;
use App\Models\AddCategory; // If you're using category dropdown

class AddSubCategoryController extends Controller
{
    public function index()
    {
        // Check if user has permission to access DD Menu
        if (!auth()->user()->hasPermission('dd_menu')) {
            return redirect()->back()->with('error', 'You do not have permission to access DD Menu.');
        }
        
        $subCategories = AddSubCategory::latest()->get();
        $categories = AddCategory::pluck('category_name', 'id');

        return view('dd_menu.sub_category', compact('subCategories', 'categories'));

    }

    public function store(Request $request)
    {
        // Check if user has permission to access DD Menu
        if (!auth()->user()->hasPermission('dd_menu')) {
            return redirect()->back()->with('error', 'You do not have permission to access DD Menu.');
        }
        
        $validated = $request->validate([
            'category_name' => 'required',
            'sub_category' => 'required',
            'description' => 'required',
            'photo' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $path = $request->file('photo')->store('sub_category', 'public');

        AddSubCategory::create([
            'category_name' => $request->category_name,
            'sub_category' => $request->sub_category,
            'description' => $request->description,
            'photo' => $path,
        ]);

        return redirect()->back()->with('success', 'Sub Category Added');
    }

    public function update(Request $request, $id)
    {
        $sub = AddSubCategory::findOrFail($id);

        $sub->category_name = $request->category_name;
        $sub->sub_category = $request->sub_category;
        $sub->description = $request->description;

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('sub_category', 'public');
            $sub->photo = $path;
        }

        $sub->save();

        return response()->json(true);
    }

    public function destroy($id)
    {
        AddSubCategory::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'Deleted successfully');
    }
}

