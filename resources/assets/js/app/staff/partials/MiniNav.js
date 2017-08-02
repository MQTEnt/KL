import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-horiz';
import {Link} from 'react-router';

export default class MiniNav extends React.Component{
	constructor(props){
		super(props);
	}
	goto(url){

	}
	render(){
		let buttons = this.props.nav;
		return (
			<div style={{textAlign: 'right'}}>
				<IconMenu
			      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
			      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
			      targetOrigin={{horizontal: 'left', vertical: 'top'}}
			    >
				    {buttons.map(
				      	button => <Link key={button.name} to={button.url} style={{ textDecoration: 'none' }}><MenuItem primaryText={button.name}/></Link>)
				  	}
			    </IconMenu>
			</div>
		);
	}
}