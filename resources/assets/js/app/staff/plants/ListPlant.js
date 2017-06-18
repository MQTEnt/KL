import React from 'react';
import SnackBar from '../partials/SnackBar';

export default class ListPlant extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			openSnackBar: false,
			notiSnackBar: ''
		};
	}
	componentDidMount(){
		let urlParams = new URLSearchParams(this.props.location.search);
		if(urlParams.get('created'))
		{
			this.setState({
				openSnackBar: true,
				notiSnackBar: 'Thêm mới thành công kế hoạch điều trị'
			});
		}
	}
	render(){
		return (
			<div>
				<p>Trang danh sách kế hoạch của bệnh nhân mã {this.props.params.patient_id}</p>
				<SnackBar
					open={this.state.openSnackBar}
					noti={this.state.notiSnackBar}
					onRequestClose={() => this.setState({openSnackBar: false})}
				/>
			</div>
		);
	}
}