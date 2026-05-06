<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AddressController extends Controller
{
    public function getAddresses(Request $request)
    {
        $companyName = $request->get('company_name');
        
        if ($companyName) {
            $addresses = DB::table('delivery_details')
                ->where('company_name', $companyName)
                ->select('id', 'company_name', 'company_address', 'location', 'mobile_no', 'email', 'pin_code', 'state')
                ->get();
            
            return response()->json($addresses);
        }

        return response()->json([]);
    }
}
