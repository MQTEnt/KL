import React from 'react';
import IconButton from 'material-ui/IconButton';
import ContentForward from 'material-ui/svg-icons/content/forward';
import TextField from 'material-ui/TextField';

/**
 * Simple Icon Menus demonstrating some of the layouts possible using the `anchorOrigin` and
 * `targetOrigin` properties.
 */
class Goto extends React.Component{
	constructor(props){
		super(props);
		this.state={'page': 0}
		this.handleOnClick = this.handleOnClick.bind(this);
		this.handleOnChangeText = this.handleOnChangeText.bind(this);
	}
	handleOnChangeText(e){
		this.setState({'page': e.target.value});
	}
	handleOnClick(){
		let page = this.state.page;
		let pattern = /^(0|([1-9]\d*))$/;
		if(page>=1 && page<=this.props.last_page && page!=this.props.current_page && pattern.test(page)){
			this.props.goToPage(page);
		}
		else
			return false;
	}
	render(){
		return (
			<div>
			    <TextField style={{'width': '20%', 'position': 'relative', 'top': '-7px', 'paddingRight': '20px'}} hintText="Số trang" hintStyle={{'fontSize': '80%'}} onBlur={this.handleOnChangeText}/>
			    <IconButton onClick={this.handleOnClick}>
			      <ContentForward/>
			    </IconButton>
			</div>
		);
	}
}

export default Goto;