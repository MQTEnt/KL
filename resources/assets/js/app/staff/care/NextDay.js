import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import autoBind from 'react-autobind';

export default class NextDay extends React.Component{
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
			'y_thuc': this.state.y_thuc,
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