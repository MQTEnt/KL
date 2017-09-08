import React from 'react';
import Paper from 'material-ui/Paper';
import IconUser from 'material-ui/svg-icons/action/account-circle';
import IconLock from 'material-ui/svg-icons/action/lock';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class Profile extends React.Component{
	constructor(props){
		super(props)
	}

	render(){
		return (
			<div style={{width: '80%', margin: '0 auto', padding: 20}}>
				<Paper style={{padding: 10, paddingLeft: 50, marginBottom: 20}} zDepth={2}>
					<h3><IconUser style={{top: 5, position: 'relative'}}/> Thông tin cá nhân</h3>
					<p>Họ và tên: <b>Nguyễn Văn A</b></p>
					<p>Ngày sinh: <b>01/01/1960</b></p>
					<p>Địa chỉ: <b>Hà Nội</b></p>
					<p>SĐT: <b>0123456789</b></p>
					<p>E-mail: <b>nva@gmail.com</b></p>
				</Paper>
				<Paper style={{padding: 10, paddingLeft: 50}} zDepth={2}>
					<h3><IconLock style={{top: 5, position: 'relative'}}/> Đổi mật khẩu</h3>
					<TextField
				      hintText="Nhập mật khẩu cũ"
				      floatingLabelText="Mật khẩu cũ"
				    /><br/>
				    <TextField
				      hintText="Nhập mật khẩu mới"
				      floatingLabelText="Mật khẩu mới"
				    /><br/>
				    <TextField
				      hintText="Nhập lại mật khẩu cũ"
				      floatingLabelText="Xác nhận mật khẩu mới"
				    /><br/>
				    <RaisedButton label="Xác nhận" primary={true}/>
				</Paper>
			</div>
		);
	}
}