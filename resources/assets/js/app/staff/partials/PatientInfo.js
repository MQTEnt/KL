import React from 'react';
import Paper from 'material-ui/Paper';

export default class PatientInfo extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			patient: {}
		}
	}
	componentDidMount(){
		setTimeout(function(){
	      //Get data
	      fetch('/patient/id/'+this.props.patient_id, {
	        credentials: 'same-origin'
	      })
	      .then(function(response) {
	        return response.json()
	      }).then(function(obj) {
	        //Data Response
	        //console.log('Data Response: ', obj);
	        this.setState({
	         	patient: obj.patient
	        })
	      }.bind(this))
	      .catch(function(ex) {
	        //Log Error
	        console.log('parsing failed', ex)
	      });
	    }.bind(this), 0);
	}
	render(){
		let patient = this.state.patient;
		return (
			<Paper zDepth={2}>
				<ul style={{margin: 20, padding: 10, textAlign: 'left'}}>
					<li>Tên bệnh nhân: <b>{patient.name}</b></li>
					<li>Ngày sinh: <b>{patient.dob}</b></li>
					<li>Địa chỉ: <b>{patient.address}</b></li>
					<li>Nghề nghiệp: <b>{patient.job}</b></li>
				</ul>
		    </Paper>
		);
	}
}