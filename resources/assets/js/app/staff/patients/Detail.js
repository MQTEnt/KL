import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import ActionEvent from 'material-ui/svg-icons/action/event';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import Subheader from 'material-ui/Subheader';
import { browserHistory } from "react-router";
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import FlatButton from 'material-ui/FlatButton';

class Detail extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			patient: null,
			records: null,
			isLoading: true
		};
	}
	onNavigateList() {
        browserHistory.push("/staff/record");
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
										onClick={()=>{browserHistory.push('/staff/examination/'+record.id)}}
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
		return (
			(this.state.isLoading)?
				<div style={{'margin': '20% auto', 'width': '0'}}>
					<CircularProgress size={80} thickness={5}/>
				</div>
				:
				<div style={{'margin': '5% auto', 'width': '80%'}}>
					<FlatButton
				      label="Trở lại danh sách"
				      secondary={true}
				      icon={<HardwareKeyboardArrowLeft/>}
				      onClick={this.onNavigateList}
				    />
				    <Paper style={{padding: 10, marginBottom: 10}} zDepth={2}>
						<ul>
							<li>Mã bệnh nhân: <b>{this.state.patient.id}</b></li>
							<li>Tên bệnh nhân: <b>{this.state.patient.name}</b></li>
							<li>Ngày sinh: <b>{this.state.patient.dob}</b></li>
							<li>Giới tính: <b>{this.renderGender(parseInt(this.state.patient.gender))}</b></li>
							<li>Địa chỉ: <b>{this.state.patient.address}</b></li>
							<li>Số CMND: <b>{this.state.patient.id_card}</b></li>
							<li>Số thẻ BHYT: <b>{this.state.patient.insurance_card}</b></li>
							<li>Nghề nghiệp: <b>{this.state.patient.job}</b></li>
							<li>Email: <b>{this.state.patient.email}</b></li>
							<li>Số ĐT: <b>{this.state.patient.phone}</b></li>
							<li>Ghi chú: <b>{this.state.patient.description}</b></li>
						</ul>
					</Paper>
					<Paper zDepth={2}>
						{this.renderListRecord()}
					</Paper>


				</div>
		);
	}
}

export default Detail;