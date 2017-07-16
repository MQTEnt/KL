<?php

namespace App\Http\Controllers\Staff;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Patient;
use App\Care;
use PDF;
class ExportController extends Controller
{
	public function exportCaring($patient_id){
		$patient = Patient::find($patient_id);
		$caring = Care::select('*')->where('patient_id', '=', $patient_id)->orderBy('ngay', 'ASC')->get();
		$pdf = PDF::loadView('staff/caring', ['patient' => $patient, 'caring' => $caring]);
		return $pdf->download('caring.pdf');
	}
}
