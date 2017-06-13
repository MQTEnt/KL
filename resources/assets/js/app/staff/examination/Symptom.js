import React from 'react';
import RadioInputs from '../partials/RadioInputs'
export default class Symptom extends React.Component{
	constructor(props){
		super(props);

	}
	render(){
		return (
			<div>
				<h4>Khám cận lâm sàng/Triệu chứng cơ năng</h4>
				<p>Chọn các triệu chứng cơ năng phía dưới</p>
				<RadioInputs />
			</div>
		);
	}
}