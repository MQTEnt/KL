<?php

namespace App\Http\Controllers\Staff;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Record;
class RecordController extends Controller
{
	public function store(Request $request){
		$record = new Record();
		$record->patient_id = $request->patient_id;
		$record->save();
		return ['stat' => 1, 'record'=> $record];
	}
}
