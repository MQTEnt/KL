import React from 'react';
import queryString from 'query-string';

export default class ListPlant extends React.Component{
	constructor(props){
		super(props);
		
	}
	render(){
		return 	<p>
					Trang danh sách kế hoạch của bệnh nhân mã 
					{this.props.params.patient_id}
				</p>
	}
}