import React from 'react';
import Main from './Main';
import CircularProgress from 'material-ui/CircularProgress';
class Patient extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			'patients': [],
			isLoading: true
		}
		this.handleAdd = this.handleAdd.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}
	handleAdd(newPatient){
		let newMovieList = this.state.patients;
		newMovieList.push(newPatient);
		this.setState({
			'patients': newMovieList
		});
	}
	handleUpdate(updatedPatient){
		let patients = this.state.patients;
		let objIndex = patients.findIndex((obj => obj.id === updatedPatient.id));
		
		//console.log("Before update: ", patients[objIndex])

		//Update object's property.
		patients[objIndex] = updatedPatient;

		this.setState({
			'movies': patients
		});
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
		setTimeout(function(){
			//Get data
			fetch('/patient')
			.then(function(response) {
				return response.json()
			}).then(function(obj) {
				//Data Response
				//console.log('Data Response: ', obj);
				this.setState({
				  		'patients': obj,
				  		isLoading: false
				});

			}.bind(this))
			.catch(function(ex) {
				//Log Error
				console.log('parsing failed', ex)
			});
		}.bind(this), 1500);
	}

	render(){
		return (
			<div>
				<Main
					patients={this.state.patients}
					handleAdd={this.handleAdd}
					handleUpdate={this.handleUpdate}
					handleDelete={this.handleDelete}
				/>
				{
					(this.state.isLoading)?
					<div style={{'margin': '0 auto', 'width': '0'}}>
						<CircularProgress size={80} thickness={5}/>
					</div>
					:''
				}
			</div>
		);
	}
}
export default Patient;