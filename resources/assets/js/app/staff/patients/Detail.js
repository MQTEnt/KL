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
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import autoBind from 'react-autobind';
class Detail extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			patient: null,
			records: null,
			isLoading: true,
			openDrawer: false,
			selectedRecord: {}
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
	openDetail(record){
		this.setState({
			openDrawer: true,
			selectedRecord: record
		});
	}
	renderDate(date){
		if(typeof date === 'undefined')
			return '';
		let dateStr = date.split(' ')[0];
		dateStr = dateStr.split('-');
		return dateStr[2]+'/'+dateStr[1]+'/'+dateStr[0];
	}
	renderListRecord(){
		let records = this.state.records;
		return (
			<List style={{'margin': '0 auto', 'width': '90%'}}>
				<Subheader style={{fontSize: '120%'}}>Danh sách khám bệnh của bệnh nhân:</Subheader>
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
										primaryText={'Ngày khám '+this.renderDate(record.created_at)+' (Mã khám '+record.id+')'}
										leftIcon={<ActionAssignment />}
										onClick={()=>{this.openDetail(record)}}
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
		let selectedRecord = this.state.selectedRecord;
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

					<Drawer 
					 	open={this.state.openDrawer}
					 	docked={false}
					 	openSecondary={true}
					 	onRequestChange={()=>{this.setState({openDrawer: false})}}
					>
						{(selectedRecord !== {})?
							<div style={{padding: 10}}>
								<p><i>Ngày {this.renderDate(selectedRecord.created_at)}</i></p>
								<h4>Chẩn đoán:</h4>
								<p>Xác định bệnh: <b>{(selectedRecord.outcome!=='')?selectedRecord.outcome:<i></i>}</b> </p>
								<p>Giai đoạn: <b>{(selectedRecord.period!=='')?selectedRecord.period:<i></i>}</b> </p>
								<p>Biến chứng thận: <b>{(selectedRecord.kidney_complication!=='')?selectedRecord.kidney_complication:<i></i>}</b> </p>
								<p>Biến chứng mạch máu: <b>{(selectedRecord.vascular_complication!=='')?selectedRecord.vascular_complication:<i></i>}</b> </p>
								<p>Biến chứng khác: <b>{(selectedRecord.other!=='')?selectedRecord.other:<i></i>}</b> </p>
								<p>Ghi chú: <b>{(selectedRecord.description!=='')?selectedRecord.description:<i></i>}</b> </p>
								<RaisedButton 
									fullWidth={true} 
									label="Chi tiết" 
									primary={true} 
									onClick={()=>{browserHistory.push("/staff/examination/"+selectedRecord.id);}}
						        />
							</div>
							:''
						}
			        </Drawer>
				</div>
		);
	}
}

export default Detail;