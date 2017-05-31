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
			qSearch: ''
		}
		autoBind(this);
	}
	getPatients(url, qSearch){
		//Reset data
		this.setState({
			patients: [],
			isLoading: true,
			qSearch: qSearch
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
	componentDidMount(){
		this.getPatients('/patient','');
	}

	render(){
		return (
			<div>
				<Main
					patients={this.state.patients}
					getPatients={this.getPatients}
					current_page={this.state.current_page}
					last_page={this.state.last_page}
					qSearch={this.state.qSearch}
					isLoadingPatients={this.state.isLoading}
				/>
			</div>
		);
	}
}
export default Patient;