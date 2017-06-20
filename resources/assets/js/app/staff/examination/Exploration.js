import React from 'react';
import ExaminationTextInputs from '../partials/ExaminationTextInputs';
export default class Exploration extends React.Component{
	constructor(props){
		super(props);

	}
	submit(){
		this.examinationTextInputsComponent.submit();
	}
	render(){
		return (
			<div style={{textAlign: 'center'}}>
				<h4>Khám cận lâm sàng/Thăm dò chức năng</h4>
				<ExaminationTextInputs
					list={this.props.explorations}
					api={this.props.api}
					setList={this.props.setList}
					ref={(ref) => {this.examinationTextInputsComponent = ref}}
				/>
			</div>
		);
	}
}