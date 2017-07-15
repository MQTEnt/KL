import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import autoBind from 'react-autobind';

const items = [
	<MenuItem key={1} value={false} primaryText="Không có biến chứng" />,
	<MenuItem key={2} value={true} primaryText="Có biến chứng" />,
];
const states = [
	<MenuItem key={0} value={0} primaryText="" />,
	<MenuItem key={1} value={1} primaryText="Không tiến triển" />,
	<MenuItem key={2} value={2} primaryText="Tốt lên" />,
	<MenuItem key={3} value={3} primaryText="Khỏi" />,
	<MenuItem key={4} value={4} primaryText="Ra viện" />,
];
export default class Diagnosis extends React.Component{
	constructor(props){
		super(props)
		let diagnosis = this.props.diagnosis;
		this.state = {
			haveComplication: false,
			diagnosis: diagnosis,
			errorOutComeInput: (diagnosis.outcome==='')?'Không được để trống':'',
			errorPeriodInput: (diagnosis.period==='')?'Không được để trống':'',
			state: this.props.patient_state
		}
		this.onSubmit = false;
		autoBind(this);
	}
	handleChangeSelect(event, index, value){
		if(value)
			this.setState({
				haveComplication: value
			});
		else
			this.setState({
				haveComplication: value,
				diagnosis: {
					...this.state.diagnosis, 
					other: '',
					kidney_complication: '',
					vascular_complication: ''
				}
			});
	}
	handleChangeSelectState(event, index, value){
		this.setState({
			state: value
		});
	}
	componentDidMount(){
		let diagnosis = this.state.diagnosis;
		if(diagnosis.kidney_complication!=='' || diagnosis.vascular_complication!=='' || diagnosis.other!=='')
		{
			this.setState({
				haveComplication: true
			});
		}
	}
	validateOutComeInput(e){
		this.setState({onChangeOutComeInput: true});
		let str = e.target.value;
		if(str === '')
		{
			this.setState({errorOutComeInput: 'Không được để trống'});
			return;
		}
		else
		{
			this.setState({errorOutComeInput: ''});
		}
	}
	validatePeriodInput(e){
		this.setState({onChangePeriodInput: true});
		let str = e.target.value;
		if(str === '')
		{
			this.setState({errorPeriodInput: 'Không được để trống'});
			return;
		}
		else
		{
			this.setState({errorPeriodInput: ''});
		}
	}
	submit(){
		this.onSubmit = true;
		if(this.state.errorOutComeInput !== '' || this.state.errorPeriodInput !== ''){
			this.props.displayNoti(false, false, '');
			return;
		}
		var _token = document.getElementsByName("csrf-token")[0].getAttribute("content");
		var formData = new FormData();
		formData.append('_token', _token);
		formData.append('outcome', this.outcome.getValue());
		formData.append('period', this.period.getValue());
		formData.append('vascular_complication', (this.vascular_complication)?this.vascular_complication.getValue():'');
		formData.append('kidney_complication', (this.kidney_complication)?this.kidney_complication.getValue():'');
		formData.append('other', (this.other)?this.other.getValue():'');
		formData.append('state', this.state.state);
		
		let api = this.props.api
	    //POST (AJAX)
	    setTimeout(function(){
		    fetch(api, {
		      method: 'POST',
		      credentials: 'same-origin',
		      body: formData
		    })
		    .then(function(response) {
		      return response.json()
		    }).then(function(obj) {
		    	this.props.displayNoti(true, false, obj.message);
		    }.bind(this))
		    .catch(function(ex) {
		      //Log Error
		      console.log('parsing failed', ex)
		    });
		}.bind(this), 0);
	}
	render(){
		let diagnosis = this.state.diagnosis;
		return (
			<div>
				<h4 style={{textAlign: 'center'}}>Chẩn đoán</h4>
				<TextField
					fullWidth={true}
					hintText="Xác định bệnh"
					floatingLabelText="Xác định bệnh"
					defaultValue={(diagnosis.outcome)?diagnosis.outcome:''}
					ref={(input) => { this.outcome = input; }}
					onBlur={this.validateOutComeInput}
					errorText={(this.state.onChangeOutComeInput||this.onSubmit)?this.state.errorOutComeInput:''}
			    />
			    <br/>
			    <TextField
			    	fullWidth={true}
					hintText="Mức độ (Giai đoạn)"
					floatingLabelText="Mức độ (Giai đoạn)"
					defaultValue={(diagnosis.period)?diagnosis.period:''}
					ref={(input) => { this.period = input; }}
					onBlur={this.validatePeriodInput}
					errorText={(this.state.onChangePeriodInput||this.onSubmit)?this.state.errorPeriodInput:''}
			    />
			    <br/>
			    <SelectField
			    	fullWidth={true}
					value={this.state.haveComplication}
					onChange={this.handleChangeSelect}
					floatingLabelText="Biến chứng"
		        >
					{items}
		        </SelectField>
		        <br/>
		        {(this.state.haveComplication)?
		        	<div>
			        	<TextField
			        		fullWidth={true}
							hintText="Biến chứng thận"
							floatingLabelText="Biến chứng thận"
							defaultValue={(diagnosis.kidney_complication)?diagnosis.kidney_complication:''}
					    	ref={(input) => { this.kidney_complication = input; }}
					    />
					    <br/>
					    <TextField
					    	fullWidth={true}
							hintText="Biến chứng mạch máu"
							floatingLabelText="Biến chứng mạch máu"
							defaultValue={(diagnosis.vascular_complication)?diagnosis.vascular_complication:''}
							ref={(input) => { this.vascular_complication = input; }}
					    />
					    <br/>
					    <TextField
					    	fullWidth={true}
							hintText="Bệnh khác"
							floatingLabelText="Bệnh khác"
							defaultValue={(diagnosis.other)?diagnosis.other:''}
							ref={(input) => { this.other = input; }}
					    />
					    <br/>
				    </div>
				    :''
		        }
		        <SelectField
			    	fullWidth={true}
					value={this.state.state}
					onChange={this.handleChangeSelectState}
					floatingLabelText="Đánh giá"
		        >
		        	{states}
		        </SelectField>
			</div>
		);
	}
}