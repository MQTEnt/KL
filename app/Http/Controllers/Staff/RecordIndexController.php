<?php

namespace App\Http\Controllers\Staff;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Record_Index;
use DB;
use Auth;
class RecordIndexController extends Controller
{
	public function update($record_id, Request $request){
		$user = Auth::user();
		$addArr = json_decode($request->addArr, true);
		$editArr = json_decode($request->editArr, true);
		$deleteArr = json_decode($request->deleteArr, true);
		//Add
		if(count($addArr) > 0)
		{
			foreach ($addArr as &$item){
				$item['submitter'] = $user->id;
				$item['record_id'] = $record_id;
			}
			Record_Index::insert($addArr);
		}

		//Edit
		if(count($editArr) > 0)
		{
			$str1 = '';
			$str2 = '';
			$str3 = '';
			foreach ($editArr as $key => $item){
				//$item['submitter'] = $user->id;
				$str1 = $str1.'WHEN id = '.$item['id'].' THEN "'.$item['value'].'" ';
				$str2 = $str2.'WHEN id = '.$item['id'].' THEN '.$user->id.' ';
				if($key == 0)
					$str3 = $str3.$item['id'];
				else
					$str3 = $str3.', '.$item['id'];
			}
			$statement = "UPDATE record_index"
						." SET record_index.value = CASE "
						.$str1
						.'END,'
						." record_index.submitter = CASE "
						.$str2
						.'END'
						.' WHERE id IN ('.$str3.')';
			DB::statement($statement);
		}

		//Delete
		if(count($deleteArr) > 0)
		{
			Record_Index::destroy($deleteArr);
		}
		
		//Get list index
		$indexes = DB::table('indexes')
		            ->leftJoin(DB::raw("(SELECT * FROM record_index WHERE record_id = $record_id) AS temp_tbl"), 'indexes.id', '=', 'temp_tbl.index_id')
		            ->select('indexes.id AS index_id', 'indexes.name', 'temp_tbl.value', 'temp_tbl.id AS id')
		            ->orderBy('index_id')
		            ->get();
        return ['state' => 1, 'indexes' => $indexes];
	}
}
