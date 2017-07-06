import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import TimePicker from 'material-ui/TimePicker';
import autoBind from 'react-autobind';

export default class NextDay extends React.Component{
	constructor(props){
		super(props);
		let care = this.props.care;
		this.state = {
			y_thuc: care.y_thuc
		}

		let bd_time = care.bd_truyen_dich.split(':');
		let kt_time = care.kt_truyen_dich.split(':');
		this.bd_truyen_dich = bd_time[0]+':'+bd_time[1];
		this.kt_truyen_dich = kt_time[0]+':'+kt_time[1];
		autoBind(this);
	}
	handleChangeYThuc(event, index, value){
		this.setState({y_thuc: value});
	}
	submit(){
		let care = {
			'y_thuc': this.state.y_thuc,
			'dau_hieu_khac': this.dau_hieu_khac.getValue(),

			'noi_quy': (this.noi_quy.state.switched)?1:0,
			'thuoc_uong': (this.thuoc_uong.state.switched)?1:0,
			'thuoc_tiem': (this.thuoc_tiem.state.switched)?1:0,
			'bd_truyen_dich': this.bd_truyen_dich,
			'kt_truyen_dich': this.kt_truyen_dich,
			'truyen_dich_an_toan': (this.truyen_dich_an_toan.state.switched)?1:0,
			'truyen_dich_khac': this.truyen_dich_khac.getValue(),
			'thay_bang': this.thay_bang.getValue(),
			'dinh_duong': this.dinh_duong.getValue(),
			'hh': (this.hh.state.switched)?1:0,
			'hs': (this.hs.state.switched)?1:0,
			'vs': (this.vs.state.switched)?1:0,
			'xet_nghiem_khac': this.xet_nghiem_khac.getValue(),
			've_sinh_ca_nhan': this.ve_sinh_ca_nhan.getValue(),
			'cham_soc_khac': this.cham_soc_khac.getValue(),

			'huyet_ap': this.huyet_ap.getValue(),
			'nhip_tho': this.nhip_tho.getValue()
		}
		//Request
		let json_care = JSON.stringify(care);
		/////Request
		var _token = document.getElementsByName("csrf-token")[0].getAttribute("content");
		var formData = new FormData();
	    formData.append('care', json_care);
		formData.append('_token', _token);

	    fetch('/care/'+this.props.care.id, {
	      method: 'POST',
	      credentials: 'same-origin',
	      body: formData
	    })
	    .then(function(response) {
	      return response.json()
	    }).then(function(obj) {
	      	this.props.showNoti(obj.message);
	    }.bind(this))
	    .catch(function(ex) {
	      console.log('parsing failed', ex)
	    });
	}
	changeTime(time, type){
		let hours = time.getHours();
		let minutes = time.getMinutes();
		if(type === 'bd_truyen_dich')
			this.bd_truyen_dich = hours+':'+minutes;
		if(type === 'kt_truyen_dich')
			this.kt_truyen_dich = hours+':'+minutes;
	}
	componentDidUpdate(prevProps, prevState){
		if(prevProps.care.y_thuc !== this.props.care.y_thuc){
			this.setState({y_thuc: this.props.care.y_thuc});
		}
	}
	render(){
		let care = this.props.care;
		let bd_hours = care.bd_truyen_dich.split(':')[0];
		let bd_mins = care.bd_truyen_dich.split(':')[1];
		let kt_hours = care.kt_truyen_dich.split(':')[0];
		let kt_mins = care.kt_truyen_dich.split(':')[1];
		return(
			<div key={care.id}>
				<p><b>Diễn biến</b></p>
			    <SelectField
					floatingLabelText="Ý thức"
					value={this.state.y_thuc}
					onChange={this.handleChangeYThuc}
		        >
		        	<MenuItem value={0} />
					<MenuItem value={1} primaryText="Tỉnh" />
					<MenuItem value={2} primaryText="Lơ mơ" />
					<MenuItem value={3} primaryText="Hôn mê" />
					<MenuItem value={4} primaryText="Khác" />
		        </SelectField>
		        <br/>
		    	<TextField
					hintText="Dấu hiệu bất thường khác"
					floatingLabelText="Dấu hiệu bất thường khác"
					style={{width: '100%'}}
					defaultValue={care.dau_hieu_khac}
					ref={(input) => {this.dau_hieu_khac = input}}
		    	/>
		    	<p><b>Thực hiện chăm sóc</b></p>
		    	<Checkbox
					label="Thông báo nội quy"
					defaultChecked={(care.noi_quy)?true:false}
					ref={(input) => {this.noi_quy = input}}
			    />
			    <p>Thực hiện y lệnh:</p>
			    <div style={{display: 'flex', flexDirection: 'row'}}>
			  		<div>
				    	<Checkbox
					      label="Thuốc uống"
					      defaultChecked={(care.thuoc_uong)?true:false}
					      ref={(input) => {this.thuoc_uong = input}}
					    />
						</div>
					<div>
				    	<Checkbox
					      label="Thuốc tiêm"
					      defaultChecked={(care.thuoc_tiem)?true:false}
					      ref={(input) => {this.thuoc_tiem = input}}
					    />
					</div>
				</div>
		    	<TimePicker
					format="24hr"
					hintText="Giờ truyền dịch"
					floatingLabelText="Giờ truyền dịch"
					defaultTime={new Date(2000,1,1,bd_hours,bd_mins,0)}
					onChange={(e, time)=>this.changeTime(time, 'bd_truyen_dich')}
			    />
			    <TimePicker
					format="24hr"
					hintText="Giờ kết thúc truyền dịch"
					floatingLabelText="Giờ kết thúc truyền dịch"
					defaultTime={new Date(2000,1,1,kt_hours,kt_mins,0)}
					onChange={(e, time)=>this.changeTime(time, 'kt_truyen_dich')}
			    />
			    <Checkbox
					label="Truyền dịch an toàn"
					defaultChecked={(care.truyen_dich_an_toan)?true:false}
					ref={(input) => {this.truyen_dich_an_toan = input}}
			    />
			    <TextField
					hintText="Khác"
					floatingLabelText="Khác"
					defaultValue={care.truyen_dich_khac}
					ref={(input) => {this.truyen_dich_khac = input}}
		    	/>
		    	<p>Xét nghiệm:</p>
		    	<Checkbox
					label="HH"
					defaultChecked={(care.hh)?true:false}
					ref={(input) => {this.hh = input}}
				/>
				<Checkbox
					label="HS"
					defaultChecked={(care.hs)?true:false}
					ref={(input) => {this.hs = input}}
				/>
				<Checkbox
					label="VS"
					defaultChecked={(care.vs)?true:false}
					ref={(input) => {this.vs = input}}
				/>
				<TextField
					hintText="Xét nghiệm khác"
					floatingLabelText="Xét nghiệm khác"
					defaultValue={care.xet_nghiem_khac}
					ref={(input) => {this.xet_nghiem_khac = input}}
		    	/>
		    	<TextField
					hintText="Thay băng"
					floatingLabelText="Thay băng"
					defaultValue={care.thay_bang}
					ref={(input) => {this.thay_bang = input}}
		    	/>
		    	<TextField
					hintText="Dinh dưỡng"
					floatingLabelText="Dinh dưỡng"
					defaultValue={care.dinh_duong}
					ref={(input) => {this.dinh_duong = input}}
		    	/>
		    	<TextField
					hintText="Vệ sinh cá nhân"
					floatingLabelText="Vệ sinh cá nhân"
					defaultValue={care.ve_sinh_ca_nhan}
					ref={(input) => {this.ve_sinh_ca_nhan = input}}
		    	/>
		    	<TextField
					hintText="Chăm sóc khác"
					floatingLabelText="Chăm sóc khác"
					defaultValue={care.cham_soc_khac}
					ref={(input) => {this.cham_soc_khac = input}}
		    	/>
		    	<TextField
					hintText="Huyết áp"
					floatingLabelText="Huyết áp"
					defaultValue={care.huyet_ap}
					ref={(input) => {this.huyet_ap = input}}
		    	/>
		    	<TextField
					hintText="Nhịp thở"
					floatingLabelText="Nhịp thở"
					defaultValue={care.nhip_tho}
					ref={(input) => {this.nhip_tho = input}}
		    	/>
		    	<RaisedButton 
		          fullWidth={true} 
		          label="Cập nhật" 
		          primary={true} 
		          onClick={this.submit}
		        />
			</div>

		);
	}
}