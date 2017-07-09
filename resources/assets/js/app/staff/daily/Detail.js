import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import ActionVisibility from 'material-ui/svg-icons/action/visibility';
import ActionSchedule from 'material-ui/svg-icons/action/schedule';
import {Link} from "react-router";

const styles = {
  button: {
  	margin: 5
  }
};

class Detail extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			patient: null,
			isLoading: true
		};
	}
	getPatient(){
		this.setState({
			isLoading: true
		});
		setTimeout(function(){
			fetch('/patient/'+this.props.patientId, {
				credentials: 'same-origin'
			})
			.then(function(response) {
				return response.json()
			}).then(function(obj) {
				//Data Response
				//console.log('Data Response: ', obj);
				this.setState({
				  		'patient': obj.patient,
				  		isLoading: false
				});
			}.bind(this))
			.catch(function(ex) {
				//Log Error
				console.log('parsing failed', ex)
			});
		}.bind(this), 1500);
	}
	componentDidMount(){
		this.getPatient();
	}
	renderGender(gender){
		switch(gender){
			case 1: return 'nam';
			case 2: return 'nữ';
			case 3: return 'khác';
		}
	}
	render(){
		return (
			(this.state.isLoading)?
				<div style={{'margin': '20% auto', 'width': '0'}}>
					<CircularProgress size={50} thickness={5}/>
				</div>
				:
				<div style={{'width': '100%'}}>
					<ul>
						<li>Mã bệnh nhân: <b>{this.state.patient.id}</b></li>
						<li>Tên bệnh nhân: <b>{this.state.patient.name}</b></li>
						<li>Ngày sinh: <b>{this.state.patient.dob}</b></li>
						<li>Giới tính: <b>{this.renderGender(parseInt(this.state.patient.gender))}</b></li>
						<li>Địa chỉ: <b>{this.state.patient.address}</b></li>
						<li>Số CMND: <b>{this.state.patient.id_card}</b></li>
					</ul>
					<Link style={{ textDecoration: 'none' }} to={"/staff/follow/"+this.state.patient.id}>
						<RaisedButton 
							fullWidth={true} 
							label="Theo dõi điều trị" 
							primary={true} 
							style={styles.button} 
							icon={<ActionVisibility/>}
						/>
					</Link>
					<Link style={{ textDecoration: 'none' }} to={"/staff/daily/"+this.state.patient.id}>
						<RaisedButton 
							fullWidth={true} 
							label="Lịch sử theo dõi điều trị" 
							secondary={true} 
							style={styles.button} 
							icon={<ActionSchedule/>}
						/>
					</Link>
				</div>
		);
	}
}

export default Detail;