<?php

namespace App\Http\Controllers\Staff;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Plant;
use App\Plant_Activity;
use Auth;
class PlantController extends Controller
{
    public function store($patient_id, Request $request){
    	$plant = Plant::select('*')
    					->where([
	    					['fromDate', '<=', $request->fromDate],
	    					['toDate', '>=', $request->fromDate],
    					])
    					->orWhere([
    						['fromDate', '<=', $request->toDate],
	    					['toDate', '>=', $request->toDate],
    					])
                        ->orWhere([
                            ['fromDate', '>=', $request->fromDate],
                            ['toDate', '<=', $request->toDate],
                        ])
    					->first();
        if(!is_null($plant))
    	   return ['stat' => 0, 'noti' => 'Đã trùng với kế hoạch từ '.$plant->fromDate.' tới '.$plant->toDate];
        else
        {
            //Create plant
            $plant = new Plant();
            $plant->user_id = Auth::user()->id;
            $plant->patient_id = $patient_id;
            $plant->fromDate = $request->fromDate;
            $plant->toDate = $request->toDate;
            $plant->save();

            //Create plan detail
            $addedArrRaw = json_decode($request->addedArr, true);
            if(count($addedArrRaw) <= 0)
                return ['state' => 0, 'noti' => 'Khởi tạo thất bại'];
            $addedArr = [];
            foreach($addedArrRaw as $item){
                array_push($addedArr,[
                    'plant_id' => $plant->id,
                    'activity_id' => $item['id']
                ]);
            }
            Plant_Activity::insert($addedArr);
            return ['stat' => 1, 'noti' => 'Khởi tạo thành công'];
        }

    }
}
