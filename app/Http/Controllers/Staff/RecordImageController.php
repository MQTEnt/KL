<?php

namespace App\Http\Controllers\Staff;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Record_Image;
use DB;
use Auth;
use App\Record;
class RecordImageController extends Controller
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
					$item['image_id'] = $item['index_id'];
					unset($item['index_id']);
				}
				Record_Image::insert($addArr);
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
				$statement = "UPDATE record_image"
							." SET record_image.value = CASE "
							.$str1
							.'END'
							.' WHERE id IN ('.$str2.')';
				DB::statement($statement);
			}

			//Delete
			if(count($deleteArr) > 0)
			{
				Record_Image::destroy($deleteArr);
			}
			
			//Get list image
			$images = DB::table('images')
			            ->leftJoin(DB::raw("(SELECT * FROM record_image WHERE record_id = $record_id) AS temp_tbl"), 'images.id', '=', 'temp_tbl.image_id')
			            ->select('images.id AS index_id', 'images.name', 'temp_tbl.value', 'temp_tbl.id AS id')
			            ->orderBy('index_id')
			            ->get();
	        return ['state' => 1, 'list' => $images, 'message' => 'Đã cập nhật thành công!'];
	    }
	    else
	    {
	    	$images = DB::table('images')
			            ->leftJoin(DB::raw("(SELECT * FROM record_image WHERE record_id = $record_id) AS temp_tbl"), 'images.id', '=', 'temp_tbl.image_id')
			            ->select('images.id AS index_id', 'images.name', 'temp_tbl.value', 'temp_tbl.id AS id')
			            ->orderBy('index_id')
			            ->get();
	        return ['state' => 0, 'list' => $images, 'message' => 'Bạn không đủ quyền để cập nhật bệnh án này'];
	    }
    }
}
