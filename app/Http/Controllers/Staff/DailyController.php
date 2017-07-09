<?php

namespace App\Http\Controllers\Staff;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Daily_Plant;
use App\Daily_Activity;
use DB;
use App\Plant;
use App\Patient;
class DailyController extends Controller
{
    public function getAll($patient_id){
        $days = Daily_Plant::with(['activities', 'activities.activity'])->where('patient_id', '=', $patient_id)->get();
        $patient = Patient::find($patient_id);
        return ['days' => $days, 'patient' => $patient];
    }
    public function getFollowingByDate($patient_id, $date){
    	$day = Daily_Plant::select('*')->where([
					    			['patient_id', '=', $patient_id],
					    			['date', '=', $date]
					    		])->first();
    	if(is_null($day))
    		return ['isFollow' => false];
    	else{
            $plant = Plant::select('*')->where([
                    ['patient_id', '=', $patient_id],
                    ['fromDate', '<=', $date],
                    ['toDate', '>=', $date]
                ])
                ->first();
            if(is_null($plant)){
                return ['isFollow' => true, 'day' => $day, 'activities' => []];
            }
            else{
                $activities = DB::table('activities')
                    ->join(DB::raw("
                        (
                            (SELECT * FROM plant_activity WHERE plant_id = $plant->id) AS temp_tbl
                            LEFT JOIN 
                            (SELECT * FROM daily_activity WHERE daily_plant_id = $day->id) AS temp_tbl2
                            ON (temp_tbl2.activity_id = temp_tbl.activity_id)
                        )
                    "),'activities.id', '=', 'temp_tbl.activity_id')
                    ->select('activities.id AS index_id', 'activities.name', 'temp_tbl2.id AS id')
                    ->orderBy('index_id')
                    ->get();
                return ['isFollow' => true, 'day' => $day, 'activities' => $activities];
            }
    	}
    }
    public function setFollow($patient_id, $date){
        //Check patient is existed... (update later)
        $day = new Daily_Plant;
        $day->patient_id = $patient_id;
        $day->date = $date;
        $day->save();
        $plant = Plant::select('*')->where([
                    ['patient_id', '=', $patient_id],
                    ['fromDate', '<=', $date],
                    ['toDate', '>=', $date]
                ])
                ->first();
        if(!is_null($plant)){
            $activities = DB::table('activities')
                        ->join(DB::raw("(SELECT * FROM plant_activity WHERE plant_id = $plant->id) AS temp_tbl"), 'activities.id', '=', 'temp_tbl.activity_id')
                        ->select('activities.id AS index_id', 'activities.name', 'temp_tbl.id AS id')
                        ->orderBy('index_id')
                        ->get();
            foreach($activities as $item){
                    $item->id = null;
            }
        }
        else
            $activities = [];
        return ['isFollow' => true, 'day' => $day, 'activities' => $activities];
    }
    public function checkActivities($patient_id, $date, Request $request){
        $addArrRaw = json_decode($request->addArr, true);
        $addArr = [];
        $deleteArr = json_decode($request->deleteArr, true);

        $day = Daily_Plant::select('*')->where([
                                    ['patient_id', '=', $patient_id],
                                    ['date', '=', $date]
                                ])->first();
        if(count($addArrRaw) > 0)
        {
            foreach($addArrRaw as $item)
                array_push($addArr, ['daily_plant_id' => $day->id, 'activity_id' => $item]);
            Daily_Activity::insert($addArr);
        }
        if(count($deleteArr) > 0)
            Daily_Activity::destroy($deleteArr);

        //Response
        $plant = Plant::select('*')->where([
                    ['patient_id', '=', $patient_id],
                    ['fromDate', '<=', $date],
                    ['toDate', '>=', $date]
                ])
                ->first();
        $activities = DB::table('activities')
                    ->join(DB::raw("
                        (
                            (SELECT * FROM plant_activity WHERE plant_id = $plant->id) AS temp_tbl
                            LEFT JOIN 
                            (SELECT * FROM daily_activity WHERE daily_plant_id = $day->id) AS temp_tbl2
                            ON (temp_tbl2.activity_id = temp_tbl.activity_id)
                        )
                    "),'activities.id', '=', 'temp_tbl.activity_id')
                    ->select('activities.id AS index_id', 'activities.name', 'temp_tbl2.id AS id')
                    ->orderBy('index_id')
                    ->get();
        return ['state' => 1, 'list' => $activities, 'message' => 'Đã cập nhật thành công!'];
    }
    public function rate($patient_id, $date, Request $request){
        $day = Daily_Plant::select('*')->where([
                                    ['patient_id', '=', $patient_id],
                                    ['date', '=', $date]
                                ])->first();
        if(!is_null($day)){
            $day->rate = $request->rate;
            $day->save();
            return ['state' => 1];
        }
        else
            return ['state' => 0];
    }
}
