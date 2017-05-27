<?php

namespace App\Http\Controllers\Staff;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Patient;
class PatientController extends Controller
{
	public function index(){
		$patients = Patient::paginate(10);
		return $patients;
	}
	public function store(Request $request){
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
	public function update($id, Request $request){
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
	public function getSearchName(Request $request){
		$query = $request->q;
        $patients = Patient::where([
            ['name', 'LIKE', '%'.$query.'%']])->groupBy('name')->pluck('name')->toArray();
        return $patients;
	}
	public function getSearch(Request $request)
	{
		$query = $request->q;
        $patients = Patient::where([
            ['name', 'LIKE', '%'.$query.'%']])->paginate(10);
        return $patients;
	}
}
