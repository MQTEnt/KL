import React from 'react';
import ExaminationTextInputs from '../partials/ExaminationTextInputs';

export default class Image extends React.Component{
	constructor(props){
		super(props);

	}
	submit(){
		this.examinationTextInputsComponent.submit();
	}
	render(){
		return (
			<div style={{textAlign: 'center'}}>
				<h4>Khám cận lâm sàng/Chẩn đoán hình ảnh</h4>
				<ExaminationTextInputs
					list={this.props.images}
					ref={(ref) => {this.examinationTextInputsComponent = ref}}
					api={this.props.api}
					setList={this.props.setList}
					displayNoti={this.props.displayNoti}
				/>
			</div>
		);
	}
}