import React from 'react';
import ExaminationTextInputs from '../partials/ExaminationTextInputs';
export default class Exploration extends React.Component{
	constructor(props){
		super(props);

	}
	render(){
		return (
			<div>
				<h4>Khám cận lâm sàng/Thăm dò chức năng</h4>
				<ExaminationTextInputs
					list={this.props.explorations}
				/>
			</div>
		);
	}
}