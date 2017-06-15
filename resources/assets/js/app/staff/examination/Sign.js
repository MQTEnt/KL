import React from 'react';
import RadioInputs from '../partials/RadioInputs'
export default class Sign extends React.Component{
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
				<h4>Khám cận lâm sàng/Triệu chứng thực thể</h4>
				<p>Chọn các triệu chứng thực thể bên dưới</p>
				<RadioInputs 
					items={this.props.signs}
					ref={(ref)=>this.radioInputsComponent = ref}
					api={this.props.api}
					setList={this.props.setList}
				/>
			</div>
		);
	}
}