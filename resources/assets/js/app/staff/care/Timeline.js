import React from 'react';

export default class Timeline extends React.Component{
	constructor(props){
		super(props);

	}
	renderDate(date){
	    let dateStr = date.split('-');
	    let str = 'Ngày '+dateStr[2]+' tháng '+dateStr[1]+' năm '+dateStr[0];
	    return str;
	}
	renderYThuc(num){
		switch(num){
			case 1: return 'Tỉnh';
			case 2: return 'Lơ mơ';
			case 3: return 'Hôn mê';
			case 4: return 'Khác';
			default: return 'Không xác định'
		}
	}
	render(){
		let day = this.props.day;
		let index = this.props.index;
		return (
			<div key={day.id} className="timeline">
	            <div className="timeline-icon"></div>
	            <div style={{fontSize: '85%'}} className={(index%2===0)?'timeline-content':'timeline-content right'}>
	                <span className="date"><i className="fa fa-calendar-check-o"></i> {this.renderDate(day.ngay)}</span>
	                <p>Mạch: <b>{(day.mach!=='')?day.mach:<i></i>}</b> </p>
	                <p>Nhiệt độ: <b>{(day.nhiet_do!=='')?day.nhiet_do:<i></i>}</b> </p>
	                <p><b><i className="fa fa-stethoscope"></i> DIỄN BIẾN: </b></p>
	                {(day.isNgayDau === 1)?
	                	<div>
	                    	<p>Tiền sử dị ứng: <b>{(day.tien_su_di_ung!=='')?day.tien_su_di_ung:<i>Không có</i>}</b> </p>
	                        <p>Tiền sử bệnh: <b>{(day.tien_su_benh!=='')?day.tien_su_benh:<i>Không có</i>}</b> </p>
	                        <p>Ý thức: <b>{this.renderYThuc(day.y_thuc)}</b> </p>
	                        <p>P: <b>{(day.p!=='')?day.p:''}</b> kg, H: <b>{(day.h!=='')?day.h:''}</b> cm, BMI: <b>{(day.bmi!=='')?day.bmi:''}</b></p>
	                    	<p>Da, niêm mạc: <b>{(day.da!=='')?day.da:<i>Không xác định</i>}</b> </p>
	                    	<p>
		                    	<span>{(day.chan_an === 1)?<i className="fa fa-check-square-o"><b>Chán ăn</b></i>:''} </span>
		                    	<span>{(day.an_kem === 1)?<i className="fa fa-check-square-o"><b>Ăn kém</b></i>:''} </span>
		                    	<span>{(day.buon_non === 1)?<i className="fa fa-check-square-o"><b>Buồn nôn</b></i>:''} </span>
		                    	<span>{(day.non === 1)?<i className="fa fa-check-square-o"><b>Nôn</b></i>:''} </span>
	                    	</p>
	                    	<p>
		                    	<span>{(day.dau_bung === 1)?<i className="fa fa-check-square-o"><b>Đau bụng</b></i>:''} </span>
		                    	<span>{(day.tieu_chay === 1)?<i className="fa fa-check-square-o"><b>Tiêu chảy</b></i>:''} </span>
		                    	<span>{(day.tao_bon === 1)?<i className="fa fa-check-square-o"><b>Táo bón</b></i>:''} </span>
		                    	<span>{(day.non === 1)?<i className="fa fa-check-square-o"><b>Nôn</b></i>:''} </span>
		                    	<span>{(day.tieu_hoa_khac!=='')?<b>{day.tieu_hoa_khac}</b>:''} </span>
	                    	</p>
	                    	<p>
	                    		Nước tiêu: màu sắc <b>{(day.nuoc_tieu!=='')?day.nuoc_tieu:<i>Không xác định</i>} </b> 
	                    		<span>{(day.tieu_buot === 1)?<i className="fa fa-check-square-o"><b>Tiểu buốt</b></i>:''} </span>
	                    	</p>
	                    	<p>Số lượng: <b>{day.so_luong}</b> </p>
	                    	<p>
	                    		Vết thương: <b>{(day.vet_thuong!=='')?day.vet_thuong:<i>Không có</i>} </b>
	                    		 Vị trí: <b>{(day.vi_tri_vet_thuong!=='')?day.vi_tri_vet_thuong:<i>Không có</i>}</b>
	                    	</p>
	                    	<p>
		                    	<span>{(day.nhiem_trung === 1)?<i className="fa fa-check-square-o"><b>Nhiễm trùng</b></i>:''} </span>
		                    	<span>{(day.hoai_tu === 1)?<i className="fa fa-check-square-o"><b>Hoại tử</b></i>:''} </span>
		                    	{(day.vi_tri_nhiem_trung!=='')?<span>Vị trí: <b>{day.vi_tri_nhiem_trung}</b></span>:''}
	                    	</p>
	                    	<p>Dấu hiệu bất thường khác: <b>{(day.dau_hieu_khac!=='')?day.dau_hieu_khac:<i>Không có</i>}</b> </p>
	                    </div>
	                    :
	                    <div>
	                    	<p>Ý thức: <b>{this.renderYThuc(day.y_thuc)}</b> </p>
	                    	<p>Dấu hiệu bất thường khác: <b>{(day.dau_hieu_khac!=='')?day.dau_hieu_khac:<i>Không có</i>}</b> </p>
	                    </div>	
	                }
	            	<p><b><i className="fa fa-bed"></i> THỰC HIỆN CHĂM SÓC</b></p>
	            	{(day.isNgayDau === 1)?
	            		<span>{(day.noi_quy === 1)?<i className="fa fa-check-square-o"><b>Thông báo nội quy</b></i>:''} </span>
	            		:''
	            	}
	            	<p>
	            		Thực hiện y lênh: 
	            		<span>{(day.thuoc_uong === 1)?<i className="fa fa-check-square-o"><b>Thuốc uống</b></i>:''} </span>
	            		<span>{(day.thuoc_tiem === 1)?<i className="fa fa-check-square-o"><b>Thuốc tiêm</b></i>:''} </span> 
	            	</p>
	            	<p>
	            		<span>Truyền dịch: Giờ truyền: <b>{day.bd_truyen_dich}</b> / Giờ kết thúc <b>{day.kt_truyen_dich}</b></span>
	            	</p>
	            	<p>
	            		<span>{(day.truyen_dich_an_toan === 1)?<i className="fa fa-check-square-o"><b>Truyền dịch an toàn</b></i>:''} </span>
	            		Truyền dịch khác: <b>{(day.truyen_dich_khac!=='')?day.truyen_dich_khac:<i>Không có</i>}</b> 
	            	</p>
	            	<p>
	            		Xét nghiệm:
	            		<span>{(day.hh === 1)?<i className="fa fa-check-square-o"><b>HH</b></i>:''} </span>
	                	<span>{(day.hs === 1)?<i className="fa fa-check-square-o"><b>HS</b></i>:''} </span>
	                	<span>{(day.vs === 1)?<i className="fa fa-check-square-o"><b>VS</b></i>:''} </span>
	            	</p>
	            	<p>Xét nghiệm khác: <b>{(day.xet_nghiem_khac!=='')?day.xet_nghiem_khac:<i>Không có</i>}</b> </p>
	            	<p>Thay băng: <b>{(day.thay_bang!=='')?day.thay_bang:<i>Không có</i>}</b> </p>
	            	<p>Dinh dưỡng: <b>{(day.dinh_duong!=='')?day.dinh_duong:<i>Không có</i>}</b> </p>
	            	<p>Vệ sinh cá nhân: <b>{(day.ve_sinh_ca_nhan!=='')?day.ve_sinh_ca_nhan:<i>Không có</i>}</b> </p>
	            	<p>Chăm sóc khác: <b>{(day.cham_soc_khac!=='')?day.cham_soc_khac:<i>Không có</i>}</b> </p>
	            	<p><i className="fa fa-user-md"> Người theo dõi: {day.staff.name}</i></p>
	            </div>
	        </div>
		);
	}
}