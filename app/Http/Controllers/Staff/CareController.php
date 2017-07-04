<?php

namespace App\Http\Controllers\Staff;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Care;
class CareController extends Controller
{
	public function getCaringByDate($patient_id, $date){
		$care = Care::select('*')->where([
									['patient_id', '=', $patient_id],
									['ngay', '=', $date]])
								->first();
		return ['care' => $care];
	}
}
