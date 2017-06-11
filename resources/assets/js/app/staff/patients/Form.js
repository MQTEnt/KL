import React from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import autoBind from 'react-autobind';

class Form extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			id: (this.props.editing)?this.props.selectedPatient.id:null,
      		inputGender: (this.props.editing)?this.props.selectedPatient.gender:3,
      		inputRoom: (this.props.editing)?this.props.selectedPatient.room_id:1,
      		inputDob: (this.props.editing)?this.props.selectedPatient.dob:'1990-01-01',
      		errorInputName: (this.props.editing)?'':'Không được để trống',
      		errorInputAddress: (this.props.editing)?'':'Không được để trống',
      		errorInputCity: (this.props.editing)?'':'Không được để trống',
      		errorInputIdCard: (this.props.editing)?'':'Không được để trống',
      		errorInputEmail: ''
		}
		//
		autoBind(this);
	}
	handleSubmit(){
		this.setState({onSubmit: true});
		let state = this.state;
		//console.log(state);
		if(state.errorInputName==''&&state.errorInputCity==''&&state.errorInputAddress==''
			&&state.errorInputIdCard==''&&state.errorInputEmail=='')
		{
			let obj = {
				'id': this.state.id,
				'name': this.name.getValue(),
				'address': this.address.getValue(),
				'city': this.city.getValue(),
				'id_card': this.id_card.getValue(),
				'insurance_card': this.insurance_card.getValue(),
				'email': this.email.getValue(),
				'number': this.number.getValue(),
				'job': this.job.getValue(),
				'description': this.description.getValue(),
				'dob': this.state.inputDob,
				'gender': this.state.inputGender,
				'room_id': this.state.inputRoom
			};
			if(this.props.editing)
				this.props.updatePatient(obj);
			else
				this.props.addPatient(obj);
		}
	}
	validateInputName(event){
		this.setState({onChangeInputName: true});
		let value = event.target.value;
		if(value.length<3)
		{
			this.setState({errorInputName: 'Nội dung cần ít nhất 3 kí tự'});
			return;
		}
		else
		{
			this.setState({errorInputName: ''});
		}
	}
	validateInputAddress(event){
		this.setState({onChangeInputAddress: true});
		let value = event.target.value;
		if(value.length<5)
		{
			this.setState({errorInputAddress: 'Nội dung cần ít nhất 5 kí tự'});
			return;
		}
		else
		{
			this.setState({errorInputAddress: ''});
		}
	}
	validateInputCity(event){
		this.setState({onChangeInputCity: true});
		let value = event.target.value;
		if(value.length<3)
		{
			this.setState({errorInputCity: 'Nội dung cần ít nhất 3 kí tự'});
			return;
		}
		else
		{
			this.setState({errorInputCity: ''});
		}
	}
	validateInputIdCard(event){
		this.setState({onChangeInputIdCard: true});
		let value = event.target.value;

		let pattern = /^(0|([1-9]\d*))$/;
		if(!pattern.test(value))
		{
			this.setState({errorInputIdCard: 'Số chứng minh nhân dân chỉ bao gôm chữ số'});
			return;
		}
		else
		{
			this.setState({errorInputIdCard: ''});
		}

		if(value.length<9)
		{
			this.setState({errorInputIdCard: 'Nội dung cần ít nhất 9 kí tự'});
			return;
		}
		else
		{
			this.setState({errorInputIdCard: ''});
		}
	}
	validateInputEmail(event){
		let value = event.target.value;
		if(value.length == 0){
			this.setState({errorInputEmail: ''});
			return;
		}
		let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if(!pattern.test(value))
		{
			this.setState({errorInputEmail: 'Nhập đúng định dạng Email'});
			return;
		}
		else
		{
			this.setState({errorInputEmail: ''});
		}
	}
	handleChangeInputDate(x, obj){
		let date = obj.getFullYear()+'/'+(obj.getMonth()+ 1)+'/'+obj.getDate();
		this.setState({inputDob: date});
	}
	handleChangeInputGender(event, index, value){
		this.setState({inputGender: value});
	}
	handleChangeInputRoom(event, index, value){
		this.setState({inputRoom: value});
	}
	displayPatientId(){
		if(this.props.editing)
			return (
				<TextField
						fullWidth={true}
						disabled={true}
						floatingLabelText="ID"
						defaultValue={this.props.selectedPatient.id}
				/>
			);
	}
	componentDidMount(){
		//Get data
		fetch('/room', {
			credentials: 'same-origin'
		})
		.then(function(response) {
			return response.json()
		}).then(function(obj) {
			//Data Response
			//console.log('Data Response: ', obj);
			this.setState({
			  		'rooms': obj
			});
		}.bind(this))
		.catch(function(ex) {
			//Log Error
			console.log('parsing failed', ex)
		});
	}
	displayRoomList(){
		if(this.state.rooms)
			return (
			    <SelectField
					floatingLabelText="Phòng khám"
					value={parseInt(this.state.inputRoom)}
					onChange={this.handleChangeInputRoom}
				>
			        {
			        	this.state.rooms.map( (room) => (
			            	<MenuItem key={room.id} value={parseInt(room.id)} primaryText={room.name} />
			            )
			          )
			        }
			    </SelectField>
	    	)
	}
	clearForm(){
		this.setState({
			inputGender: 3,
      		inputRoom: 1,
      		errorInputName: 'Không được để trống',
      		errorInputAddress: 'Không được để trống',
      		errorInputCity: 'Không được để trống',
      		errorInputIdCard: 'Không được để trống',
      		errorInputEmail: '',
      		onChangeInputName: false,
      		onChangeInputAddress: false,
      		onChangeInputCity: false,
      		onChangeInputIdCard: false,
      		onSubmit: false
		});
		this.name.input.value='';
		this.address.input.value='';
		this.city.input.value='';
		this.id_card.input.value='';
		this.insurance_card.input.value='';
		this.job.input.value='';
		this.number.input.value='';
		this.email.input.value='';
		this.description.input.value='';
	}
	render(){
		return (
			<div>
				{this.displayPatientId()}
				<br/>
				<TextField
					hintText="Điền tên của bệnh nhân"
					fullWidth={true}
					ref={(input) => { this.name = input; }}
					floatingLabelText="Tên"
					defaultValue={(this.props.editing)?this.props.selectedPatient.name:''}
					onBlur={this.validateInputName}
					errorText={(this.state.onChangeInputName||this.state.onSubmit)?this.state.errorInputName:''}
				/>
				<br/>
				<DatePicker
					autoOk={true}
					floatingLabelText="Ngày sinh"
					defaultDate={(this.props.editing)?this.props.selectedPatient.dob:new Date(this.state.inputDob)}
					onChange={this.handleChangeInputDate}
				/>
				<br/>
				<SelectField
					floatingLabelText="Giới tính"
					value={parseInt(this.state.inputGender)}
					onChange={this.handleChangeInputGender}
				>
					<MenuItem value={1} primaryText="Nam" />
					<MenuItem value={2} primaryText="Nữ" />
					<MenuItem value={3} primaryText="Khác" />
				</SelectField>
				<br/>
				<TextField
					hintText="Điền địa chỉ của bệnh nhân"
					fullWidth={true}
					ref={(input) => { this.address = input; }}
					floatingLabelText="Địa chỉ"
					defaultValue={(this.props.editing)?this.props.selectedPatient.address:''}
					onBlur={this.validateInputAddress}
					errorText={(this.state.onChangeInputAddress||this.state.onSubmit)?this.state.errorInputAddress:''}
				/>
				<br/>
				<TextField
					hintText="Điền thành phố"
					fullWidth={true}
					ref={(input) => { this.city = input; }}
					floatingLabelText="Thành phố"
					defaultValue={(this.props.editing)?this.props.selectedPatient.city:''}
					onBlur={this.validateInputCity}
					errorText={(this.state.onChangeInputCity||this.state.onSubmit)?this.state.errorInputCity:''}
				/>
				<br/>
				<TextField
					hintText="Điền số Chứng minh thư nhân dân"
					fullWidth={true}
					ref={(input) => { this.id_card = input; }}
					floatingLabelText="CMND"
					defaultValue={(this.props.editing)?this.props.selectedPatient.id_card:''}
					onBlur={this.validateInputIdCard}
					errorText={(this.state.onChangeInputIdCard||this.state.onSubmit)?this.state.errorInputIdCard:''}
				/>
				<br/>
				<TextField
					hintText="Điền số Thẻ bảo hiểm y tế"
					fullWidth={true}
					ref={(input) => { this.insurance_card = input; }}
					floatingLabelText="Thẻ BHYT"
					defaultValue={(this.props.editing)?this.props.selectedPatient.insurance_card:''}
				/>
				<br/>
				<TextField
					hintText="Điền nghề nghiệp của bệnh nhân"
					fullWidth={true}
					ref={(input) => { this.job = input; }}
					floatingLabelText="Nghề nghiệp"
					defaultValue={(this.props.editing)?this.props.selectedPatient.job:''}
				/>
				<br/>
				<TextField
					hintText="Điền số điện thoại của bệnh nhân"
					fullWidth={true}
					ref={(input) => { this.number = input; }}
					floatingLabelText="Số điện thoại"
					defaultValue={(this.props.editing)?this.props.selectedPatient.number:''}
				/>
				<br/>
				<TextField
					hintText="Điền Email của bệnh nhân"
					fullWidth={true}
					ref={(input) => { this.email = input; }}
					floatingLabelText="Email"
					defaultValue={(this.props.editing)?this.props.selectedPatient.email:''}
					onBlur={this.validateInputEmail}
					errorText={this.state.errorInputEmail}
				/>
				<br/>

				{this.displayRoomList()}
				<br/>
				<TextField
					hintText="Ghi chú"
					fullWidth={true}
					ref={(input) => { this.description = input; }}
					floatingLabelText="Điền ghi chú"
					defaultValue={(this.props.editing)?this.props.selectedPatient.description:''}
				/>
				<br/>
			</div>
		);
	}
}

export default Form;