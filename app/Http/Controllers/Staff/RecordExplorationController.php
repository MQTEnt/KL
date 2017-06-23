<?php

namespace App\Http\Controllers\Staff;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Record_Exploration;
use DB;
use App\Record;
use Auth;
class RecordExplorationController extends Controller
{
    public function update($record_id, Request $request){
    	$record = Record::find($record_id);
		if($record->state==0||($record->state==1&&$record->examiner==Auth::user()->id))
		{
	    	$addArr = json_decode($request->addArr, true);
			$editArr = json_decode($request->editArr, true);
			$deleteArr = json_decode($request->deleteArr, true);
			//Add
			if(count($addArr) > 0)
			{
				foreach ($addArr as &$item){
					$item['record_id'] = $record_id;
					//Change key
					$item['exploration_id'] = $item['index_id'];
					unset($item['index_id']);
				}
				Record_Exploration::insert($addArr);
			}

			//Edit
			if(count($editArr) > 0)
			{
				$str1 = '';
				$str2 = '';
				foreach ($editArr as $key => $item){
					//$item['submitter'] = $user->id;
					$str1 = $str1.'WHEN id = '.$item['id'].' THEN "'.$item['value'].'" ';
					if($key == 0)
						$str2 = $str2.$item['id'];
					else
						$str2 = $str2.', '.$item['id'];
				}
				$statement = "UPDATE record_exploration"
							." SET record_exploration.value = CASE "
							.$str1
							.'END'
							.' WHERE id IN ('.$str2.')';
				DB::statement($statement);
			}

			//Delete
			if(count($deleteArr) > 0)
			{
				Record_Exploration::destroy($deleteArr);
			}
			
			//Get list exploration
			$explorations = DB::table('explorations')
			            ->leftJoin(DB::raw("(SELECT * FROM record_exploration WHERE record_id = $record_id) AS temp_tbl"), 'explorations.id', '=', 'temp_tbl.exploration_id')
			            ->select('explorations.id AS index_id', 'explorations.name', 'temp_tbl.value', 'temp_tbl.id AS id')
			            ->orderBy('index_id')
			            ->get();
	        return ['state' => 1, 'list' => $explorations, 'message' => 'Đã cập nhật thành công !'];
	    }
	    else
	    {
	    	$explorations = DB::table('explorations')
			            ->leftJoin(DB::raw("(SELECT * FROM record_exploration WHERE record_id = $record_id) AS temp_tbl"), 'explorations.id', '=', 'temp_tbl.exploration_id')
			            ->select('explorations.id AS index_id', 'explorations.name', 'temp_tbl.value', 'temp_tbl.id AS id')
			            ->orderBy('index_id')
			            ->get();
	        return ['state' => 0, 'list' => $explorations, 'message' => 'Bạn không đủ quyền để cập nhật bệnh án này'];
	    }
    }
}
