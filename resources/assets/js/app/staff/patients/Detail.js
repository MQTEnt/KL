import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import {List, ListItem} from 'material-ui/List';
import ActionEvent from 'material-ui/svg-icons/action/event';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import Subheader from 'material-ui/Subheader';

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
			fetch('/patient/'+this.props.params.patient_id, {
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
	renderListRecord(){
		let records = this.state.records;
		return (
			<List style={{'margin': '0 auto', 'width': '90%'}}>
			<Subheader style={{fontSize: '120%'}}>Danh sách bệnh án của bệnh nhân:</Subheader>
			{
				Object.keys(records).map(key => (
					<ListItem
						key={key}
						primaryText={'Tháng '+key.split("-")[1]+' năm '+key.split("-")[0]}
						leftIcon={<ActionEvent />}
						initiallyOpen={false}
						primaryTogglesNestedList={true}
						nestedItems={
							records[key].map(record => (
								<ListItem
									key={record.id}
									primaryText={'Bệnh án mã '+record.id+' tạo vào '+record.created_at}
									leftIcon={<ActionAssignment />}
								/>
							))
						}
					/>
				))
			}
			</List>
		)
	}
	render(){
		return (
			(this.state.isLoading)?
				<div style={{'margin': '20% auto', 'width': '0'}}>
					<CircularProgress size={80} thickness={5}/>
				</div>
				:
				<div style={{'margin': '5% auto', 'width': '80%'}}>
					<p>ID bệnh nhân: {this.props.params.patient_id}</p>
					<p>Thông tin bệnh nhân...</p>

					{this.renderListRecord()}


				</div>
		);
	}
}

export default Detail;