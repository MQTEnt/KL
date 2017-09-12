import React from 'react';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import HardwareKeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import Divider from 'material-ui/Divider';
import { browserHistory } from "react-router";
const style = {
	avatar: {
		margin: 5
	},
	div: {
		textAlign: 'right',
		paddingTop: '20px'
	},
	b: {
		position: 'relative',
		top: '-15px'
	},
	button: {
		top: '-5px'
	}
};

class Header extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			name: '',
			role: 0
		}

		this.handleOnClickLogOut = this.handleOnClickLogOut.bind(this);
		this.handleOnClickProfile = this.handleOnClickProfile.bind(this);
		this.handleOnClickRelapatients = this.handleOnClickRelapatients.bind(this);
	}
	handleOnClickLogOut(){
		window.location = "/logout";
	}
	handleOnClickProfile(){
		browserHistory.push('/staff/profile');
	}
	handleOnClickRelapatients(){
		browserHistory.push('/staff/rela-patients');
	}
	componentDidMount(){
		fetch('/user/staff',{
			credentials: 'same-origin'
		})
		.then(function(response) {
			return response.json()
		}).then(function(obj) {
			//Data Response
			//console.log('Data Response: ', obj);
			this.setState({
			  		'name': obj.name,
			  		'role': obj.role
			});
		}.bind(this))
		.catch(function(ex) {
			//Log Error
			console.log('parsing failed', ex)
		});
	}
	renderAvatar(){
		if(this.state.role === 1)
			return <Avatar
			          src="/img/doctor.png"
			          size={30}
			          style={style.avatar}
	        		/>;
	    else
	    	if(this.state.role === 2)
	    		return <Avatar
				          src="/img/nurse.png"
				          size={30}
				          style={style.avatar}
	        			/>;
	        else
	        	return '';
	}
	render(){
		return (
			<div style={style.div}>
				<i style={{float: 'left', 'fontSize': '250%', 'paddingLeft': '20px', 'color': '#00bcd4'}} className="fa fa-heartbeat"></i>
				<b style={style.b}>{this.state.name}</b>
				{this.renderAvatar()}
	        	<IconMenu
			      iconButtonElement={<IconButton><HardwareKeyboardArrowDown/></IconButton>}
			      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
			      targetOrigin={{horizontal: 'left', vertical: 'top'}}
			      style={style.button}
			    >
			      <MenuItem primaryText="Thông tin cá nhân" onClick={this.handleOnClickProfile}/>
			      <MenuItem primaryText="Danh sách bệnh nhân" onClick={this.handleOnClickRelapatients}/>
			      <MenuItem primaryText="Đăng xuất" onClick={this.handleOnClickLogOut}/>
			    </IconMenu>
			    <Divider/>
        	</div>
		);
	}
}

export default Header;