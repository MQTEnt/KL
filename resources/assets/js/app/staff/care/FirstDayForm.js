import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import autoBind from 'react-autobind';

export default class FirstDayForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			y_thuc: 1
		}
		autoBind(this);
	}
	handleChangeYThuc(event, index, value){
		this.setState({y_thuc: value});
	}
	render(){
		return(
			<div>
				<p><b>Diễn biến</b></p>
				<TextField
					hintText="Tiền sử dị ứng"
					floatingLabelText="Tiền sử dị ứng"
					fullWidth={true}
			    /><br/>
			    <TextField
					hintText="Tiền sử bệnh"
					floatingLabelText="Tiền sử bệnh"
					fullWidth={true}
			    /><br/>
			    <SelectField
					floatingLabelText="Ý thức"
					value={this.state.y_thuc}
					onChange={this.handleChangeYThuc}
		        >
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
			    /><span>kg</span><br/>
			    <TextField
					hintText="H"
					floatingLabelText="H"
					style={{width: '30%'}}
			    /><span>cm</span><br/>
			    <TextField
					hintText="BMI"
					floatingLabelText="BMI"
					style={{width: '30%'}}
			    />
			    <br/>
			    <div style={{display: 'flex', flexDirection: 'row'}}>
			  		<div>
				    	<Checkbox
					      label="Chán ăn"
					    />
						</div>
					<div>
				    	<Checkbox
					      label="Ăn kém"
					    />
					</div>
				    <div>
				    	<Checkbox
					      label="Buồn nôn"
					    />
					</div>
				    <div>
				    	<Checkbox
					      label="Nôn"
					    />
					</div>
				</div>
				<div style={{display: 'flex', flexDirection: 'row'}}>
			  		<div>
				    	<Checkbox
					      label="Đau bụng"
					    />
						</div>
					<div>
				    	<Checkbox
					      label="Tiêu chảy"
					    />
					</div>
				    <div>
				    	<Checkbox
					      label="Táo bón"
					    />
					</div>
				</div>
				<TextField
					hintText="Màu sắc"
					floatingLabelText="Nước tiểu"
					style={{width: '50%'}}
			    />
			    <Checkbox
					label="Tiểu buốt/Dắt"
				/>
				<TextField
					hintText="Số lượng"
					floatingLabelText="Số lượng"
					style={{width: '100%'}}
			    /><br/>
			    <div style={{marginBottom: 20}}>
			    	<TextField
					hintText="Vết thương"
					floatingLabelText="Vết thương"
					style={{width: '50%'}}
				    />
				    <TextField
						hintText="Vị trí"
						floatingLabelText="Vị trí"
						style={{width: '50%'}}
				    />
			    </div>
			    <div style={{display: 'flex', flexDirection: 'row'}}>
			  		<div>
				    	<Checkbox
					      label="Nhiễm trùng"
					    />
						</div>
					<div>
				    	<Checkbox
					      label="Hoại tử"
					    />
					</div>
				</div>
				<TextField
					hintText="Vị trí"
					floatingLabelText="Vị trí"
					style={{width: '100%'}}
		    	/>
		    	<TextField
					hintText="Dấu hiệu bất thường khác"
					floatingLabelText="Dấu hiệu bất thường khác"
					style={{width: '100%'}}
		    	/>
			</div>
		);
	}
}