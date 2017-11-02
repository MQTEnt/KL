<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use DB;
use App\Patient;
use Carbon\Carbon;
class ChartController extends Controller
{
	public function __construct() {
    	$this->middleware('admin');
    }
	public function index(){
		return view('admin/charts/index');
	}
	public function getData(){
		$signs = DB::table('signs')
		         ->join(DB::raw(
		         	"(SELECT record_sign.sign_id, records.patient_id 
					FROM record_sign JOIN records 
					ON (record_sign.record_id = records.id) 
					GROUP BY record_sign.sign_id, records.patient_id) AS temp_tbl"),
		         	'signs.id', '=', 'temp_tbl.sign_id')
		         ->select(DB::raw('signs.id, signs.name, COUNT(signs.id) AS value'))
		         ->groupBy(['signs.id', 'signs.name']);
		$signId = $signs->pluck('id');
		$signName = $signs->pluck('name');
		$signValue = $signs->pluck('value');
		$signTotal = array_sum($signs->pluck('value'));
		$signRatio = array_map( function($val) use ($signTotal){ return $val*100/$signTotal; }, $signValue);
		
		// $signPatient = DB::table('signs')
		//          ->join(DB::raw(
		//          	"(SELECT record_sign.sign_id, records.patient_id 
		// 			FROM record_sign JOIN records 
		// 			ON (record_sign.record_id = records.id) 
		// 			GROUP BY record_sign.sign_id, records.patient_id) AS temp_tbl"),
		//          	'signs.id', '=', 'temp_tbl.sign_id')
		//          ->select(DB::raw('temp_tbl.patient_id'))
		//          ->groupBy('temp_tbl.patient_id')
		//          ->get();

		$symptoms = DB::table('symptoms')
		         ->join(DB::raw(
		         	"(SELECT record_symptom.symptom_id, records.patient_id 
					FROM record_symptom JOIN records 
					ON (record_symptom.record_id = records.id) 
					GROUP BY record_symptom.symptom_id, records.patient_id) AS temp_tbl"),
		         	'symptoms.id', '=', 'temp_tbl.symptom_id')
		         ->select(DB::raw('symptoms.id, symptoms.name, COUNT(symptoms.id) AS value'))
		         ->groupBy(['symptoms.id', 'symptoms.name']);
		$symptomId = $symptoms->pluck('id');
		$symptomName = $symptoms->pluck('name');
		$symptomValue = $symptoms->pluck('value');
		$symptomTotal = array_sum($symptoms->pluck('value'));
		$symptomRatio = array_map( function($val) use ($symptomTotal){ return $val*100/$symptomTotal; }, $symptomValue);

		$activities = DB::table('activities')
		         ->join(DB::raw(
		         	"(SELECT daily_activity.activity_id, d_p.id 
					FROM daily_activity 
					JOIN 	(	SELECT daily_plant.* FROM daily_plant 
								JOIN 
								(SELECT id FROM patients WHERE state = 2) AS p
								ON (daily_plant.patient_id = p.id)
							) AS d_p
					ON (daily_activity.daily_plant_id = d_p.id) 
					GROUP BY daily_activity.activity_id, d_p.patient_id) AS temp_tbl"),
		         	'activities.id', '=', 'temp_tbl.activity_id')
		         ->select(DB::raw('activities.id, activities.name, COUNT(activities.id) AS value'))
		         ->groupBy('activities.id');
		$activityId = $activities->pluck('id');
		$activityName = $activities->pluck('name');
		$activityValue = $activities->pluck('value');
		$activityTotal = array_sum($activities->pluck('value'));
		$activityRatio = array_map( function($val) use ($activityTotal){ return $val*100/$activityTotal; }, $activityValue);

		$totalPatient = Patient::count();
		$malePatient = Patient::where('gender', 1)->count();
		$femalePatient = Patient::where('gender', 2)->count();
		$otherPatient = Patient::where('gender', 3)->count();
		//
		$yearData = Patient::select('dob')
					->orderBy('dob', 'desc')
					->get()
					->groupBy(function($val) {
            			return Carbon::parse($val->dob)->format('Y');
     				});
     	$agePatient = [];
     	$nowYear = date("Y");
     	foreach ($yearData as $key => $value) {
     		array_push($agePatient, [
     				'age' => $nowYear - $key,
     				'count' => count($value)
     			]);
     	}

		return [
			'signData' => [$signId, $signName, $signTotal, $signRatio],
			'symptomData' => [$symptomId, $symptomName, $symptomTotal, $symptomRatio],
			'activityData' => [$activityId, $activityName, $activityTotal, $activityRatio],
			'totalPatient' => $totalPatient,
			'malePatient' => $malePatient,
			'femalePatient' => $femalePatient,
			'otherPatient' => $otherPatient,
			'agePatient' => $agePatient
		];
	}
}
