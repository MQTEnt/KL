<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Care extends Model
{
	protected $table = 'chamsoc';
	protected $fillable = [	'tien_su_di_ung',
							'tient_su_benh',
							'y_thuc',
							'p',
							'h',
							'bmi',
							'da',
							'chan_an',
							'an_kem',
							'buon_non',
							'non',
							'dau_bung',
							'tieu_chay',
							'tao_bon',
							'tieu_hoa_khac',
							'nuoc_tieu',
							'tieu_buot',
							'so_luong',
							'vet_thuong',
							'vi_tri_vet_thuong',
							'nhiem_trung',
							'hoai_tu',
							'vi_tri_nhiem_trung',
							'dau_hieu_khac',
							'isNgayDau',
							'ngay',
							'patient_id'
						];
	public $timestamps = true;
}

