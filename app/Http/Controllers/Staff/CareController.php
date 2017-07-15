<?php

namespace App\Http\Controllers\Staff;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Care;
use App\Patient;
use Auth;
class CareController extends Controller
{
	public function getLineChart($patient_id){
		$care = Care::select('mach', 'nhiet_do', 'ngay')->where('patient_id', '=', $patient_id)->get();
		return $care;
	}
	public function getAllById($patient_id){
		$patient = Patient::findOrFail($patient_id);
		$days = Care::with('staff')->select('*')->where('patient_id', '=', $patient_id)->orderBy('ngay', 'DESC')->paginate(2);
		return ['patient' => $patient, 'days' => $days];
	}
	public function getCaringByDate($patient_id, $date){
		$care = Care::select('*')->where([
									['patient_id', '=', $patient_id],
									['ngay', '=', $date]])
								->first();
		return ['care' => $care];
	}
	public function createFirstDay($patient_id, $date){
		$care = Care::select('*')->where([
									['patient_id', '=', $patient_id],
									['ngay', '=', $date]])
								->first();
		if(!is_null($care))
			return ['state' => 0, 'care' => $care];
		//else
		$care = new Care();
		$care->patient_id = $patient_id; //Check patient exist... later
		$care->staff_id = Auth::user()->id;
		$care->ngay = $date;
		$care->isNgayDau = 1;
		$care->bd_truyen_dich = '00:00:00';
		$care->kt_truyen_dich = '00:00:00';
		$care->y_thuc = 0;
		$care->save();
		return ['state' => 1, 'care' => $care];
	}
	public function createNextDay($patient_id, $date){
		$care = Care::select('*')->where([
									['patient_id', '=', $patient_id],
									['ngay', '=', $date]])
								->first();
		if(!is_null($care))
			return ['state' => 0, 'care' => $care];
		//else
		$care = new Care();
		$care->patient_id = $patient_id; //Check patient exist... later
		$care->staff_id = Auth::user()->id;
		$care->ngay = $date;
		$care->isNgayDau = 0;
		$care->bd_truyen_dich = '00:00:00';
		$care->kt_truyen_dich = '00:00:00';
		$care->y_thuc = 0;
		$care->save();
		return ['state' => 1, 'care' => $care];
	}
	public function update($id, Request $request){
		$care = Care::find($id);
		$data = json_decode($request->care, true);
		//Common
		$care->y_thuc = $data['y_thuc'];
		$care->dau_hieu_khac = $data['dau_hieu_khac'];

		$care->noi_quy = $data['noi_quy'];
		$care->thuoc_uong = $data['thuoc_uong'];
		$care->thuoc_tiem = $data['thuoc_tiem'];
		$care->bd_truyen_dich = $data['bd_truyen_dich'];
		$care->kt_truyen_dich = $data['kt_truyen_dich'];
		$care->truyen_dich_an_toan = $data['truyen_dich_an_toan'];
		$care->truyen_dich_khac = $data['truyen_dich_khac'];
		$care->thay_bang = $data['thay_bang'];
		$care->dinh_duong = $data['dinh_duong'];
		$care->hh = $data['hh'];
		$care->hs = $data['hs'];
		$care->vs = $data['vs'];
		$care->xet_nghiem_khac = $data['xet_nghiem_khac'];
		$care->ve_sinh_ca_nhan = $data['ve_sinh_ca_nhan'];
		$care->cham_soc_khac = $data['cham_soc_khac'];
		$care->mach = $data['mach'];
		$care->nhiet_do = $data['nhiet_do'];
		
		//Difference
		if($care->isNgayDau == 1){
			$care->tien_su_di_ung = $data['tien_su_di_ung'];
			$care->tien_su_benh = $data['tien_su_benh'];
			$care->p = $data['p'];
			$care->h = $data['h'];
			$care->bmi = $data['bmi'];
			$care->da = $data['da'];
			$care->chan_an = $data['chan_an'];
			$care->an_kem = $data['an_kem'];
			$care->buon_non = $data['buon_non'];
			$care->non = $data['non'];
			$care->dau_bung = $data['dau_bung'];
			$care->tieu_chay = $data['tieu_chay'];
			$care->tao_bon = $data['tao_bon'];
			$care->tieu_hoa_khac = $data['tieu_hoa_khac'];
			$care->nuoc_tieu = $data['nuoc_tieu'];
			$care->tieu_buot = $data['tieu_buot'];
			$care->so_luong = $data['so_luong'];
			$care->vet_thuong = $data['vet_thuong'];
			$care->vi_tri_vet_thuong = $data['vi_tri_vet_thuong'];
			$care->nhiem_trung = $data['nhiem_trung'];
			$care->hoai_tu = $data['hoai_tu'];
			$care->vi_tri_nhiem_trung = $data['vi_tri_nhiem_trung'];
		}
		$care->save();
		return ['state' => 1, 'care' => $care, 'message' => 'Đã cập nhật thành công!'];
	}
}
