<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Caring</title>
	<style type="text/css">
	    div.page
	    {
	        page-break-after: always;
	        page-break-inside: avoid;
	    }
	</style>
	<style>
		body{
			padding: 0;
			margin: 0;
			font-family: DejaVu Sans, sans-serif;
		}
		.custom{
			border: solid;
	    	padding: 5% 10%;
	    }
	    .custom-full{
	    	padding: 0;
	    	margin: 0;
	    }
	    h2{
	    	text-align: center;
	    }
	    table{
	    	width: 100%;
	    	border: solid 0.1em;
	    	border-collapse: collapse;
	    }
	    th{
	    	text-align: center;
	    	border: solid 0.1em;
	    }
	    td{
		    border: solid 0.1em #000;
		}
		.td-day{
			width: 1%;
		}
	</style>
</head>
<body>
	<div class="page custom">
		<h2>Thông tin hành chính</h2>
		<?php
			$gender = ['Nam', 'Nữ', 'Khác'];
			$dob = explode('-', $patient->dob);
		?>
		<p>Mã bệnh nhân: <b>{{$patient->id}}</b></p>
		<p>Họ và tên: <b style='margin-right: 10%'>{{$patient->name}}</b>Giới tính: <b>{{$gender[$patient->gender-1]}}</b></p>
		<p>Ngày sinh: <b>{{$dob[2].'/'.$dob[1].'/'.$dob[0]}}</b></p>
		<p>Địa chỉ: <b>{{$patient->address}}</b></p>
		<p>Thành phố:<b>{{$patient->city}}</b></p>
		<p>Nghề nghiệp: <b>{{$patient->job}}</b></p>
		<p>Số CMND: <b>{{$patient->id_card}}</b></p>
		<p>Số thẻ BHYT: <b>{{$patient->insurance_card}}</b></p>
		<p>Số điện thoại: <b>{{$patient->number}}</b></p>
		<p>Email: <b>{{$patient->email}}</b></p>
		<p>Thông tin khác: <b>{{$patient->description}}</b></p>
	</div>
	<div class="page custom-full">
		<h2>Phiếu theo dõi và chăm sóc</h2>
		<table>
			<tr>
				<th>Ngày</th>
				<th>Diễn biến</th>
				<th>Thực hiện chăm sóc</th>
			</tr>
			@foreach($caring as $day)
			<?php
				$date = explode('-', $day->ngay);
				$dateStr = $date[2].'/'.$date[1].'/'.$date[0];
				$y_thuc = ['', 'Tỉnh', 'Lơ mơ', 'Hôn mê', 'Khác']
			?>
			<tr>
				<td class="td-day">{{$dateStr}}</td>
				<td>
					@if($day->isNgayDau == 1)
					<p>- Tiền sử dị ứng: <b>{{$day->tien_su_di_ung}}</b></p>
					<p>- Tiền sử bệnh: <b>{{$day->tien_su_benh}}</b></p>
					@endif
					<p>- Ý thức:
						@if($day->y_thuc != 0)
							&#9745; {{$y_thuc[$day->y_thuc]}}
						@endif
					</p>
					@if($day->isNgayDau == 1)
					<p>
						- P: <b>{{$day->p}}</b> kg
						  H: <b>{{$day->h}}</b> cm
						  BMI: <b>{{$day->bmi}}</b>
					</p>
					<p>- Da, niêm mạc: <b>{{$day->da}}</b></p>
					<p>
						@if($day->chan_an == 1)
							&#9745; Chán ăn,
						@endif
						@if($day->an_kem == 1)
							&#9745; Ăn kém,
						@endif
						@if($day->buon_non == 1)
							&#9745; Buồn nôn,
						@endif
						@if($day->non == 1)
							&#9745; Nôn,
						@endif
					</p>
					<p>
						@if($day->dau_bung == 1)
							&#9745; Đau bụng,
						@endif
						@if($day->tieu_chay == 1)
							&#9745; Tiêu chảy,
						@endif
						@if($day->tao_bon == 1)
							&#9745; Táo bón,
						@endif
						{{$day->tieu_hoa_khac}}
					</p>
					<p>
						- Nước tiểu: màu sắc <b>{{$day->nuoc_tieu}}</b>
						Tiểu buốt/Dắt  
						@if($day->tieu_buot == 1)
							&#9745;
						@endif
					</p>
					<p>- Số lượng: <b>{{$day->so_luong}}</b></p>
					<p>
						- Vết thương: <b>{{$day->vet_thuong}}</b>
						Vị trí: <b>{{$day->vi_tri_vet_thuong}}</b>
					</p>
					<p>
						@if($day->nhiem_trung == 1)
							&#9745; Nhiễm trùng,
						@endif
						@if($day->hoai_tu == 1)
							&#9745; Hoại tử,
						@endif
						Vị trí <b>{{$day->vi_tri_nhiem_trung}}</b>
					</p>
					@endif
					<p>- Dấu hiệu bất thường khác: <b>{{$day->dau_hieu_khac}}</b></p>
				</td>
				<td>
					@if($day->isNgayDau)
					<p>
						<b>- Thông báo nội quy
						@if($day->noi_quy == 1)
							&#9745;
						@endif
						</b>
					</p>
					@endif
					<p>
						<b>- Thực hiện y lệnh: </b>
						<b>
						@if($day->thuoc_uong == 1)
							Thuốc uống &#9745;, 
						@endif
						</b>
						<b>
						@if($day->thuoc_tiem == 1)
							Thuốc tiêm &#9745;
						@endif
						</b>
					</p>
					<p>- Truyền dịch:
						<br>
						Giờ truyền: <b>{{$day->bd_truyen_dich}}</b>
						<br>
						Giờ kế thúc: <b>{{$day->kt_truyen_dich}}</b>
					</p>
					<p>
						Truyền dịch an toàn: 
						@if($day->truyen_dich_an_toan == 1)
							&#9745;, 
						@endif
						Khác:
						<b>{{$day->truyen_dich_khac}}</b>
					</p>
					<p>
						XN:
						@if($day->HH == 1)
							&#9745;, 
						@endif
						@if($day->HS == 1)
							&#9745;, 
						@endif
						@if($day->VS == 1)
							&#9745;, 
						@endif
						Khác:
						<b>{{$day->xet_nghiem_khac}}</b>
					</p>
					<p>
						- Thay băng: <b>{{$day->thay_bang}}</b>
						Dinh dưỡng: <b>{{$day->dinh_duong}}</b>
					</p>
					<p>- Vệ sinh cá nhân: <b>{{$day->ve_sinh_ca_nhan}}</b></p>
					<p>- Chăm sóc khác: <b>{{$day->cham_soc_khac}}</b></p>
				</td>
			</tr>
			@endforeach
		</table>
	</div>

</body>
</html>