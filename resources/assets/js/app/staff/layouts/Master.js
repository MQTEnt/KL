import React, {Component} from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Menu from '../partials/Menu';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class Master extends Component{
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<MuiThemeProvider>
					{this.props.children}
				</MuiThemeProvider>
				<MuiThemeProvider>
					<Menu/>
				</MuiThemeProvider>
			</div>
		);
	}
}
export default Master;