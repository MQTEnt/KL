import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import {List, ListItem} from 'material-ui/List';
import ActionEvent from 'material-ui/svg-icons/action/event';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import ContentCreate from 'material-ui/svg-icons/content/create';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import {Link} from 'react-router';

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
	renderDate(date){
		let dateStr = date.split(' ')[0].split('-');
		return dateStr[2]+'/'+dateStr[1]+'/'+dateStr[0];
	}
	renderListRecord(){
		let records = this.state.records;
		return (
			<List style={{'width': '100%'}}>
				<Subheader style={{fontSize: '80%', 'fontWeight': 'bold'}}>Danh sách các lần khám của bệnh nhân:</Subheader>
				{
					Object.keys(records).map(key => (
						<ListItem
							key={key}
							primaryText={'Tháng '+key.split("-")[1]+'/'+key.split("-")[0]}
							leftIcon={<ActionEvent />}
							initiallyOpen={false}
							primaryTogglesNestedList={true}
							nestedItems={
								records[key].map(record => (
									<ListItem
										key={record.id}
										primaryText={'Lần khám ngày '+this.renderDate(record.created_at)+' (Mã khám '+record.id+')'}
										leftIcon={<ActionAssignment />}
										rightIconButton={<IconButton><Link style={{ textDecoration: 'none' }} to={"/staff/examination/"+record.id}><ContentCreate/></Link></IconButton>}
									/>
								))
							}
						/>
					))
				}
			</List>
		)
	}
	renderGender(gender){
		switch(gender){
			case 1: return 'nam';
			case 2: return 'nữ';
			case 3: return 'khác';
		}
	}
	render(){
		let patient_state = [' ', 'Không tiến triển', 'Tốt lên', 'Khỏi', 'Ra viện'];
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
						<li>Tình trạng: <b>{patient_state[this.state.patient.state]}</b></li>
					</ul>
					{this.renderListRecord()}
				</div>
		);
	}
}

export default Detail;