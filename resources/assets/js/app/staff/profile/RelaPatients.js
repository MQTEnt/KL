import React from 'react';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import IconPerson from 'material-ui/svg-icons/action/account-circle';
import { browserHistory } from "react-router";
export default class Profile extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			patients: [],
			role: 0
		};

		this.onClickPatient = this.onClickPatient.bind(this);
	}
	onClickPatient(patient_id){
		if(this.state.role === 1)
			browserHistory.push('/staff/patient/'+patient_id);
		else
			if(this.state.role === 2)
				browserHistory.push('/staff/caring/'+patient_id);
	}
	componentDidMount(){
		fetch('/patient/byStaff',{
			credentials: 'same-origin'
		})
		.then(function(response) {
			return response.json()
		}).then(function(obj) {
			//Data Response
			//console.log('Data Response: ', obj);
			this.setState({
			  		patients: obj.patients,
			  		role: obj.role
			});
		}.bind(this))
		.catch(function(ex) {
			//Log Error
			console.log('parsing failed', ex)
		});
	}
	renderPatientList(){
		let patients = this.state.patients;
		return (
			<List style={{'width': '100%'}}>
				{
					patients.map(patient => (
						<ListItem
							key={patient.id}
							primaryText={patient.name}
							onClick={()=>this.onClickPatient(patient.id)}
							leftIcon={<IconPerson/>}			
						/>
					))
				}
			</List>
		)
	}
	render(){
		return (
			<div style={{width: '80%', margin: '0 auto', padding: 20}}>
				<Paper style={{padding: 10, paddingLeft: 50, marginBottom: 20}} zDepth={2}>
					<h3>Danh sách bệnh nhân</h3>
					{this.renderPatientList()}
				</Paper>
			</div>
		);
	}
}