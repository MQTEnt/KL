import React from 'react';
import Main from './Main';
import autoBind from 'react-autobind';

class Patient extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			patients: [],
			isLoading: true,
			current_page: 0,
			last_page: 0,
			searchKey: ''
		}
		autoBind(this);
	}
	setSearchKey(key){
		this.setState({searchKey: key});
	}
	getPatients(url){
		//Reset data
		this.setState({
			patients: [],
			isLoading: true
		});
		//Get data
		setTimeout(function(){
			//Get data
			fetch(url, {
				credentials: 'same-origin'
			})
			.then(function(response) {
				return response.json()
			}).then(function(obj) {
				//Data Response
				//console.log('Data Response: ', obj);
				this.setState({
				  		'patients': obj.data,
				  		'last_page': obj.last_page,
				  		'current_page': obj.current_page,
				  		'isLoading': false
				});
			}.bind(this))
			.catch(function(ex) {
				//Log Error
				console.log('parsing failed', ex)
			});
		}.bind(this), 1500);
	}
	handleAdd(newPatient){
		let newPatientList = this.state.patients;
		newPatientList.push(newPatient);
		this.setState({
			'patients': newPatientList
		});
	}
	handleUpdate(updatedPatient){
		let patients = this.state.patients;
		let objIndex = patients.findIndex((obj => obj.id === updatedPatient.id));
		
		//console.log("Before update: ", patients[objIndex])

		//Update object's property.
		patients[objIndex] = updatedPatient;

		// this.setState({
		// 	'movies': patients
		// });
	}
	handleDelete(patientId){
		let patients = this.state.patients;
		let objIndex = patients.findIndex((obj => obj.id === patientId));
		
		//console.log("Before update: ", patients[objIndex])

		//Update object's property.
		patients.splice(objIndex, 1);

		this.setState({
			'patients': patients
		});
	}
	componentDidMount(){
		this.getPatients('/patient');
	}

	render(){
		return (
			<div>
				<Main
					patients={this.state.patients}
					handleAdd={this.handleAdd}
					handleUpdate={this.handleUpdate}
					handleDelete={this.handleDelete}
					getPatients={this.getPatients}
					current_page={this.state.current_page}
					last_page={this.state.last_page}
					searchKey={this.state.searchKey}
					setSearchKey={this.setSearchKey}
					isLoading={this.state.isLoading}
				/>
			</div>
		);
	}
}
export default Patient;