import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import autoBind from 'react-autobind';

export default class FirstDayForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			y_thuc: this.props.care.y_thuc
		}
		autoBind(this);
	}
	handleChangeYThuc(event, index, value){
		this.setState({y_thuc: value});
	}
	submit(){
		let care = {
			'tien_su_di_ung': this.tien_su_di_ung.getValue(),
			'tien_su_benh': this.tien_su_benh.getValue(),
			'y_thuc': this.state.y_thuc,
			'p': this.p.getValue(),
			'h': this.h.getValue(),
			'bmi': this.bmi.getValue(),
			'da': this.da.getValue(),
			'chan_an': (this.chan_an.state.switched)?1:0,
			'an_kem': (this.an_kem.state.switched)?1:0,
			'buon_non': (this.buon_non.state.switched)?1:0,
			'non': (this.non.state.switched)?1:0,
			'dau_bung': (this.dau_bung.state.switched)?1:0,
			'tieu_chay': (this.tieu_chay.state.switched)?1:0,
			'tao_bon': (this.tao_bon.state.switched)?1:0,
			'tieu_hoa_khac': this.tieu_hoa_khac.getValue(),
			'nuoc_tieu': this.nuoc_tieu.getValue(),
			'tieu_buot': (this.tieu_buot.state.switched)?1:0,
			'so_luong': this.so_luong.getValue(),
			'vet_thuong': this.vet_thuong.getValue(),
			'vi_tri_vet_thuong': this.vi_tri_vet_thuong.getValue(),
			'nhiem_trung': (this.nhiem_trung.state.switched)?1:0,
			'hoai_tu': (this.hoai_tu.state.switched)?1:0,
			'vi_tri_nhiem_trung': this.vi_tri_nhiem_trung.getValue(),
			'dau_hieu_khac': this.dau_hieu_khac.getValue(),
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
	componentDidUpdate(prevProps, prevState){
		if(prevProps.care.y_thuc !== this.props.care.y_thuc){
			this.setState({y_thuc: this.props.care.y_thuc});
		}
	}
	render(){
		let care = this.props.care;
		return(
			<div key={care.id}>
				<p><b>Diễn biến</b></p>
				<TextField
					hintText="Tiền sử dị ứng"
					floatingLabelText="Tiền sử dị ứng"
					fullWidth={true}
					defaultValue={care.tien_su_di_ung}
					ref={(input) => {this.tien_su_di_ung = input}}
			    /><br/>
			    <TextField
					hintText="Tiền sử bệnh"
					floatingLabelText="Tiền sử bệnh"
					fullWidth={true}
					defaultValue={care.tien_su_benh}
					ref={(input) => {this.tien_su_benh = input}}
			    /><br/>
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
					hintText="P"
					floatingLabelText="P"
					style={{width: '30%'}}
					defaultValue={care.p}
					ref={(input) => {this.p = input}}
			    /><span>kg</span><br/>
			    <TextField
					hintText="H"
					floatingLabelText="H"
					style={{width: '30%'}}
					defaultValue={care.h}
					ref={(input) => {this.h = input}}
			    /><span>cm</span><br/>
			    <TextField
					hintText="BMI"
					floatingLabelText="BMI"
					style={{width: '30%'}}
					defaultValue={care.bmi}
					ref={(input) => {this.bmi = input}}
			    />
			    <TextField
					hintText="Da, niêm mạc"
					floatingLabelText="Da, niêm mạc"
					defaultValue={care.da}
					ref={(input) => {this.da = input}}
			    />
			    <br/>
			  	<div>
			    	<Checkbox
				      label="Chán ăn"
				      defaultChecked={(care.chan_an)?true:false}
				      ref={(input) => {this.chan_an = input}}
				    />
				</div>
				<div>
			    	<Checkbox
				      label="Ăn kém"
				      defaultChecked={(care.an_kem)?true:false}
				      ref={(input) => {this.an_kem = input}}
				    />
				</div>
			    <div>
			    	<Checkbox
				      label="Buồn nôn"
				      defaultChecked={(care.buon_non)?true:false}
				      ref={(input) => {this.buon_non = input}}
				    />
				</div>
			    <div>
			    	<Checkbox
				      label="Nôn"
				      defaultChecked={(care.non)?true:false}
				      ref={(input) => {this.non = input}}
				    />
				</div>
				
		  		<div>
			    	<Checkbox
				      label="Đau bụng"
				      defaultChecked={(care.dau_bung)?true:false}
				      ref={(input) => {this.dau_bung = input}}
				    />
					</div>
				<div>
			    	<Checkbox
				      label="Tiêu chảy"
				      defaultChecked={(care.tieu_chay)?true:false}
				      ref={(input) => {this.tieu_chay = input}}
				    />
				</div>
			    <div>
			    	<Checkbox
				      label="Táo bón"
				      defaultChecked={(care.tao_bon)?true:false}
				      ref={(input) => {this.tao_bon = input}}
				    />
				</div>
				<TextField
					hintText="Khác"
					floatingLabelText="Khác"
					defaultValue={care.tieu_hoa_khac}
					ref={(input) => {this.tieu_hoa_khac = input}}
			    />
				<TextField
					hintText="Màu sắc"
					floatingLabelText="Nước tiểu"
					style={{width: '50%'}}
					defaultValue={care.nuoc_tieu}
					ref={(input) => {this.nuoc_tieu = input}}
			    />
			    <Checkbox
					label="Tiểu buốt/Dắt"
					defaultChecked={(care.tieu_buot)?true:false}
					ref={(input) => {this.tieu_buot = input}}
				/>
				<TextField
					hintText="Số lượng"
					floatingLabelText="Số lượng"
					style={{width: '100%'}}
					defaultValue={care.so_luong}
					ref={(input) => {this.so_luong = input}}
			    /><br/>
			    <div style={{marginBottom: 20}}>
			    	<TextField
					hintText="Vết thương"
					floatingLabelText="Vết thương"
					style={{width: '50%'}}
					defaultValue={care.vet_thuong}
					ref={(input) => {this.vet_thuong = input}}
				    />
				    <TextField
						hintText="Vị trí"
						floatingLabelText="Vị trí"
						style={{width: '50%'}}
						defaultValue={care.vi_tri_vet_thuong}
						ref={(input) => {this.vi_tri_vet_thuong = input}}
				    />
			    </div>
			    <div style={{display: 'flex', flexDirection: 'row'}}>
			  		<div>
				    	<Checkbox
					      label="Nhiễm trùng"
					      defaultChecked={(care.nhiem_trung)?true:false}
					      ref={(input) => {this.nhiem_trung = input}}
					    />
						</div>
					<div>
				    	<Checkbox
					      label="Hoại tử"
					      defaultChecked={(care.hoai_tu)?true:false}
					      ref={(input) => {this.hoai_tu = input}}
					    />
					</div>
				</div>
				<TextField
					hintText="Vị trí"
					floatingLabelText="Vị trí"
					style={{width: '100%'}}
					defaultValue={care.vi_tri_nhiem_trung}
					ref={(input) => {this.vi_tri_nhiem_trung = input}}
		    	/>
		    	<TextField
					hintText="Dấu hiệu bất thường khác"
					floatingLabelText="Dấu hiệu bất thường khác"
					style={{width: '100%'}}
					defaultValue={care.dau_hieu_khac}
					ref={(input) => {this.dau_hieu_khac = input}}
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