import React from 'react';
import {Link} from "react-router";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ActionAssignmentInd from 'material-ui/svg-icons/action/assignment-ind';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentContentCopy from 'material-ui/svg-icons/content/content-copy';
import {fullWhite} from 'material-ui/styles/colors';
import Alert from '../partials/Alert';
import SnackBar from '../partials/SnackBar';
import autoBind from 'react-autobind';
const style={
	'ul': {
		fontFamily: 'Lato'
	},
	button: {
	    color: 'white',
	    margin: '0px auto 5px'
  	}
};
class Detail extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			openAlert: false,
			openSnackBar: false,
			newRecordId: ''
		}

		//
		autoBind(this);
	}
	onClickAlertCancel(){
		this.setState({openAlert: false});
	}
	onClickAlertAccept(){
		// this.setState({
		// 	openAlert: false,
		// 	openSnackBar: true
		// });
		let patient = this.props.selectedPatient;
		var _token = document.getElementsByName("csrf-token")[0].getAttribute("content");
		var formData = new FormData();
	    formData.append('patient_id', patient.id);
		formData.append('_token', _token);

		//POST
		fetch('/record', {
	      method: 'POST',
	      credentials: 'same-origin',
	      body: formData
	    })
	    .then(function(response) {
	      return response.json()
	    }).then(function(obj) {
	    	if(obj.stat === 1)
			    this.setState({
					openAlert: false,
					openSnackBar: true,
					newRecordId: obj.record.id
				});
	    }.bind(this))
	    .catch(function(ex) {
	      //Log Error
	      console.log('parsing failed', ex)
	    });

	}
	onClickButtonAdd(){
		this.setState({
			openAlert: true
		});
	}
	onRequestCloseSnackBar(){
		this.setState({
			openSnackBar: false
		});
	}
	renderDialog(patient){
		let actions = [
			<FlatButton
				style={style.button}
				fullWidth={true}
				label="Thêm mới bệnh án"
				backgroundColor="#00bcd4"
				hoverColor="#00bcd4"
				icon={<ContentAdd color={fullWhite} />}
				onTouchTap={this.onClickButtonAdd}
			/>,
			<Link style={{ textDecoration: 'none' }} to={"/staff/patient/"+patient.id}>
				<FlatButton
			      	style={style.button}
			      	fullWidth={true}
			      	label="Danh sách bệnh án"
				    backgroundColor="#2be277"
				    hoverColor="#2be277"
				    icon={<ContentContentCopy color={fullWhite} />}
				/>
			</Link>,
			<FlatButton
				label="Quay lại"
				primary={true}
				onTouchTap={this.props.handleClose}
				fullWidth={true}
			/>
	    ];
		return (
			<Dialog
	          title={<p><ActionAssignmentInd style={{'position': 'relative', 'top': '5px'}}/>Thông tin bệnh nhân</p>}
	          actions={actions}
	          modal={false}
	          open={this.props.openDialog}
	          onRequestClose={this.props.handleClose}
	          autoScrollBodyContent={true}
	        >
				<ul style={style.ul}>
					<li>Họ và tên: <b>{patient.name}</b></li>
					<li>Ngày sinh: <b>{patient.dob}</b></li>
					<li>Địa chỉ: <b>{patient.address}</b></li>
					<li>Số chứng minh nhân dân: <b>{patient.id_card}</b></li>
					<li>Số điện thoại: <b>{patient.phone}</b></li>
				</ul>
				<Alert 
					open={this.state.openAlert}
					alertCancel={this.onClickAlertCancel}
					alertAccept={this.onClickAlertAccept}
					noti='Bạn muốn thêm mới bệnh án cho bệnh nhân này?'
				/>
			</Dialog>
		);
	}
	render(){
		let patient = this.props.selectedPatient;
		return (
			<div>
				{(patient != null)?
					this.renderDialog(patient)
					:
					''
				}
				<SnackBar
					open={this.state.openSnackBar}
					noti={"Đã thêm thành công, bệnh án mới thêm có mã là "+this.state.newRecordId}
					onRequestClose={this.onRequestCloseSnackBar}
				/>
			</div>
		);
	}
}

export default Detail;