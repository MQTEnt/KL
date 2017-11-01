import React, {Component} from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Menu from '../partials/Menu';
import Header from '../partials/Header';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class Master extends Component{
	constructor(props) {
		super(props);
		this.state = {
			staffRole: 0
		}

		this.setStaffRole = this.setStaffRole.bind(this);
	}
	setStaffRole(role){
		this.setState({
			staffRole: role
		});
	}
	render() {
		return (
			<div>
				<MuiThemeProvider>
					<Header setStaffRole={this.setStaffRole}/>
				</MuiThemeProvider>
				<MuiThemeProvider>
					{this.props.children}
				</MuiThemeProvider>
				<MuiThemeProvider>
					<Menu staffRole={this.state.staffRole}/>
				</MuiThemeProvider>
			</div>
		);
	}
}
export default Master;