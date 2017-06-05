import React from 'react';
import TextField from 'material-ui/TextField';

class TextInputs extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		let indexes = this.props.indexes;
		return(
			<div>
				{indexes.map( (index) => (
						<div key={index.id} style={{'margin': '0 auto', 'width': '50%'}}>
							<TextField
								fullWidth={true}
								defaultValue={index.value}
								floatingLabelText={index.name}
	    					/>
	    				</div>
					)
				)}
			</div>
		);
	}
}
export default TextInputs;