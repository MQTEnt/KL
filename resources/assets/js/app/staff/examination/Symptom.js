import React from 'react';
import RadioInputs from '../partials/RadioInputs'
export default class Symptom extends React.Component{
	constructor(props){
		super(props);
		this.submit = this.submit.bind(this);
	}
	submit(){
		this.radioInputsComponent.submit()
	}
	render(){
		return (
			<div>
				<h4>Khám lâm sàng/Triệu chứng cơ năng</h4>
				<p>Chọn các triệu chứng cơ năng phía dưới</p>
				<RadioInputs 
					items={this.props.symptoms}
					ref={(ref)=>this.radioInputsComponent = ref}
					api={this.props.api}
					setList={this.props.setList}
				/>
			</div>
		);
	}
}