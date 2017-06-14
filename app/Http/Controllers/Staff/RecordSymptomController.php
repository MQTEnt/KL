<?php

namespace App\Http\Controllers\Staff;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Record_Symptom;
use DB;
class RecordSymptomController extends Controller
{
	public function update($record_id, Request $request){
		$addArrRaw = json_decode($request->addArr, true);
		$addArr = [];
		$deleteArr = json_decode($request->deleteArr, true);
		if(count($addArrRaw) > 0)
		{
			foreach($addArrRaw as $item)
				array_push($addArr, ['record_id' => $record_id, 'symptom_id' => $item]);
			Record_Symptom::insert($addArr);
		}
		if(count($deleteArr) > 0)
			Record_Symptom::destroy($deleteArr);

		//Response
		$symptoms = DB::table('symptoms')
		            ->leftJoin(DB::raw("(SELECT * FROM record_symptom WHERE record_id = $record_id) AS temp_tbl"), 'symptoms.id', '=', 'temp_tbl.symptom_id')
		            ->select('symptoms.id AS index_id', 'symptoms.name', 'temp_tbl.id AS id')
		            ->orderBy('index_id')
		            ->get();
        return ['state' => 1, 'list' => $symptoms];
	}
}
