import React from 'react';

class Detail extends React.Component{
	constructor(props){
		super(props);

	}
	render(){
		return (
			<div>
				<p>ID bệnh nhân: {this.props.params.patient_id}</p>
				<p>Thông tin bệnh nhân...</p>
				<p>Danh sách bệnh án của bệnh nhân</p>
			</div>
		);
	}
}

export default Detail;