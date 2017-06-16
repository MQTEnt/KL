import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import ActionDateRange from 'material-ui/svg-icons/action/date-range';
import ContentContentCopy from 'material-ui/svg-icons/content/content-copy';

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
			records: null,
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
				  		'records': obj.records,
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
					<Link style={{ textDecoration: 'none' }} to={"/staff/plant/create/"+this.state.patient.id}>
						<RaisedButton 
							fullWidth={true} 
							label="Lập kế hoạch điều trị" 
							primary={true} 
							style={styles.button} 
							icon={<ActionDateRange/>}
						/>
					</Link>
    				<RaisedButton 
	    				fullWidth={true} 
	    				label="Danh sách kế hoạch điều trị" 
	    				secondary={true} 
	    				style={styles.button}
	    				icon={<ContentContentCopy/>} 
    				/>
				</div>
		);
	}
}

export default Detail;