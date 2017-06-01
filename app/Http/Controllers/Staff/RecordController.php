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
	public function index(Request $request){
		$minDate = $request->minDate;
		$maxDate = $request->maxDate;
		if(!is_null($minDate) && !is_null($maxDate))
		{
			$records = Record::where([
				['created_at', '<=', $maxDate],
				['created_at', '>=', $minDate]
			])->orderBy('created_at', 'desc')->paginate(10);
		}
		else
			$records = Record::orderBy('created_at', 'desc')->paginate(10);
		return $records;
	}
	public function getSearch(Request $request)
	{
		$id = $request->q;
		if($id == '')
		{
			$records = Record::orderBy('created_at', 'desc')->paginate(10);
			return $records;
		}
        $record = Record::find($id);
        if(!is_null($record))
	        return [
	        	'current_page' => 1,
				'last_page' => 1,
				'data' => [$record]
	        ];
	    else
	    	return [
	    		'current_page' => 1,
	    		'last_page' => 0,
	    		'data' => null
	    	];
	}
}
