import React from 'react';
import Checkbox from 'material-ui/Checkbox';

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};

export default class RadioInputs extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div style={styles.block}>
				 <Checkbox
					label="Simple"
					label="Triệu chứng"
					style={styles.checkbox}
			    />
			    <Checkbox
					label="Simple"
					label="Triệu chứng"
					style={styles.checkbox}
			    />
			    <Checkbox
					label="Simple"
					label="Triệu chứng"
					style={styles.checkbox}
			    />
			</div>
		)
	}
}