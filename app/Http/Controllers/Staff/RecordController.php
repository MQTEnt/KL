<?php

namespace App\Http\Controllers\Staff;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Record;
use Auth;
class RecordController extends Controller
{
	public function store(Request $request){
		$record = new Record();
		$record->patient_id = $request->patient_id;
		$record->save();
		return ['stat' => 1, 'record'=> $record];
	}
	public function index(){
		$records = Record::with('patient')->orderBy('created_at', 'desc')->paginate(10);
		return $records;
	}
	public function update($record_id, Request $request){
		$record = Record::findOrFail($record_id);
		if($record->state==0||($record->state==1&&$record->examiner==Auth::user()->id))
		{
			$record->outcome = $request->outcome;
			$record->period = $request->period;
			$record->vascular_complication = $request->vascular_complication;
			$record->kidney_complication = $request->kidney_complication;
			$record->other = $request->other;
			$record->state = 1;
			$record->examiner = Auth::user()->id;
			$record->save();
			return ['state' => 1, 'message' => 'Đã cập nhật thành công!'];
		}
		else
		{
			return ['state' => 0, 'message' => 'Bạn không đủ quyền để cập nhật bệnh án này'];
		}
	}
	public function getSearch(Request $request)
	{
		$id = $request->q;
		if($id == '')
		{
			$records = Record::with('patient')->orderBy('created_at', 'desc')->paginate(10);
			return $records;
		}
		//else
        $record = Record::with('patient')->get()->find($id);
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
	public function getSearchByDate(Request $request){
		$minDate = $request->minDate;
		$maxDate = $request->maxDate;
		$maxDate = date('Y-m-d', strtotime($maxDate. ' + 1 days'));

		if(!is_null($minDate) && !is_null($maxDate))
		{
			$records = Record::with('patient')->where([
				['created_at', '<', $maxDate],
				['created_at', '>=', $minDate]
			])->orderBy('created_at', 'desc')->paginate(10);
			return $records;
		}
	}
}
