<?php

namespace App\Http\Controllers\Staff;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Patient;
use App\Record;
use DB;
use Carbon\Carbon;
use App\Http\Requests\PatientFormRequest;
use Auth;
class PatientController extends Controller
{
	public function index(){
		$patients = Patient::paginate(10);
		return $patients;
	}
	public function checkIdCard($id_card){
		$patient = Patient::select('*')->where('id_card', '=', $id_card)->first();
		if(!is_null($patient))
			return ['stat' => 0, 'message' => 'Số chứng mình thư đã có người dùng'];
		else
			return ['stat' => 1];
	}
	public function store(PatientFormRequest $request){
		$patient = new Patient();
		$patient->name = $request->name;
		$patient->gender = $request->gender;
		$patient->address = $request->address;
		$patient->city = $request->city;
		$patient->dob = $request->dob;
		$patient->id_card = $request->id_card;
		$patient->insurance_card = $request->insurance_card;
		$patient->job = $request->job;
		$patient->number = $request->number;
		$patient->email = $request->email;
		$patient->room_id = $request->room_id;
		$patient->description = $request->description;
		$patient->save();
		return ['stat' => 1, 'patient' => $patient];
	}
	public function update($id, PatientFormRequest $request){
		$patient = Patient::findOrFail($id);
		$patient->name = $request->name;
		$patient->gender = $request->gender;
		$patient->address = $request->address;
		$patient->city = $request->city;
		$patient->dob = $request->dob;
		$patient->id_card = $request->id_card;
		$patient->insurance_card = $request->insurance_card;
		$patient->job = $request->job;
		$patient->number = $request->number;
		$patient->email = $request->email;
		$patient->room_id = $request->room_id;
		$patient->description = $request->description;
		$patient->save();
		return ['stat' => 1, 'patient' => $patient];
	}
	public function destroy($id){
		$patient = Patient::findOrFail($id);
		$patient->delete();
		return ['stat' => 1];
	}
	public function getSearchName(){
		$patients = DB::table('patients')
						->select('name')
						->groupBy(DB::raw('name COLLATE utf8_vietnamese_ci'))
						->pluck('name');
        return $patients;
	}
	public function getSearch(Request $request)
	{
		$query = $request->q;
		if(ctype_digit($query))
		{
			//Search by ID
			$patient = Patient::find($query);
	        if(!is_null($patient))
		        return [
		        	'current_page' => 1,
					'last_page' => 1,
					'data' => [$patient]
		        ];
		    else
		    	return [
		    		'current_page' => 1,
		    		'last_page' => 0,
		    		'data' => []
		    	];
	    }
	    else
	    {
		    //Search by name
	        $patients = Patient::where([
	            ['name', 'LIKE', '%'.$query.'%']])->paginate(10);
	        return $patients;
	    }
	}
	public function getPatient($id){
		$patient = Patient::findOrFail($id);
		$dobArr = explode("-",$patient->dob);
		$patient->dob = $dobArr[2].'-'.$dobArr[1].'-'.$dobArr[0]; 
		$records = Record::select('*')->where('patient_id', $id)->get()
					->groupBy(function($val) {
            			return Carbon::parse($val->created_at)->format('Y-m');
     				});
		return ['patient' => $patient, 'records' => $records];
	}
	public function getPatientById($id){
		$patient = Patient::findOrFail($id);
		$dobArr = explode("-",$patient->dob);
		$patient->dob = $dobArr[2].'-'.$dobArr[1].'-'.$dobArr[0];
		return ['patient' => $patient];
	}
	public function getPatientByStaff(){
		$staff = Auth::user();
		if($staff->role == 1){
			$patients = DB::table('patients')
		         ->join(DB::raw(
		         	"(SELECT patient_id, examiner 
					FROM records WHERE records.examiner = ".$staff->id." ) AS temp_tbl"),
		         	'patients.id', '=', 'temp_tbl.patient_id')
		         ->select(DB::raw('patients.id, patients.name, temp_tbl.examiner AS staff_id'))
		    	 ->groupBy(['patients.id', 'patients.name'])
		    	 ->get();
		    return $patients;
		}
		else
			if($staff->role == 2){
				$patients = DB::table('patients')
			         ->join(DB::raw(
			         	"(SELECT patient_id, staff_id 
						FROM chamsoc WHERE chamsoc.staff_id = ".$staff->id." ) AS temp_tbl"),
			         	'patients.id', '=', 'temp_tbl.patient_id')
			         ->select(DB::raw('patients.id, patients.name, temp_tbl.staff_id AS staff_id'))
			    	 ->groupBy(['patients.id', 'patients.name'])
			    	 ->get();
			    return $patients;
			}
	}
}
