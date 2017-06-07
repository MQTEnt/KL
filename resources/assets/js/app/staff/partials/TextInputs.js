import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ActionCached from 'material-ui/svg-icons/action/cached';

const styles = {
  button: {
    margin: 12,
  }
}
class TextInputs extends React.Component{
	constructor(props){
		super(props);
		this.inputs = [];
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleOnBlurInput = this.handleOnBlurInput.bind(this);
	}
	handleOnBlurInput(value, index){
		/*Validate here*/
		let regex = /^\s+$/;
    	if(regex.test(value))
      		value = '';
      	/////////////////////
		if(index.id != null)
		{
			let inputs = this.inputs;
			let i = inputs.findIndex((obj) => obj.id === index.id);
			if(i === -1)
				this.inputs.push({
					id: index.id,
					index_id: index.index_id,
					value: value
				});
			else
				inputs[i].value = value;
		}
		else
		{
			let inputs = this.inputs;
			let i = inputs.findIndex((obj) => obj.index_id === index.index_id);
			if(i === -1)
				this.inputs.push({
					id: index.id,
					index_id: index.index_id,
					value: value
				});
			else
				inputs[i].value = value;
		}
	}
	handleSubmit(){
		let addArr = [];
		let editArr = [];
		let deleteArr = [];
		///console.log(this.inputs);
		this.inputs.forEach(function(item, index){
			//AddArray
			if(item.id === null){
				if(item.value !== '')
					addArr.push({
						'index_id': item.index_id,
						'value': item.value
					});
			}
			else{
				if(item.value === ''){
					deleteArr.push(item.id);
				}
				else{
					let indexes = this.props.indexes;
					let i = indexes.findIndex((obj) => obj.id === item.id);
					if(indexes[i].value !== item.value)
						editArr.push({
							'id': item.id,
							'value': item.value
						})
				}
			}
		}.bind(this));
		this.inputs = [];
		console.log('Add Array', addArr);
		console.log('Edit Array', editArr);
		console.log('Delete Array', deleteArr);
		
		let json_addArr = JSON.stringify(addArr);
		let json_editArr = JSON.stringify(editArr);
		let json_deleteArr = JSON.stringify(deleteArr);
		/////Request
		var _token = document.getElementsByName("csrf-token")[0].getAttribute("content");
		var formData = new FormData();
	    formData.append('addArr', json_addArr);
	    formData.append('editArr', json_editArr);
	    formData.append('deleteArr', json_deleteArr);
		formData.append('_token', _token);

		let api = this.props.api
	    //POST (AJAX)
	    fetch(api, {
	      method: 'POST',
	      credentials: 'same-origin',
	      body: formData
	    })
	    .then(function(response) {
	      return response.json()
	    }).then(function(obj) {
	      	if(obj.state === 1)
	      	{
	      		console.log('Updated Success');
	      		this.props.getListIndex('/index/'+this.props.recordId);
	      	}
	    }.bind(this))
	    .catch(function(ex) {
	      //Log Error
	      console.log('parsing failed', ex)
	    });
	}
	render(){
		let indexes = this.props.indexes;
		return(
			<div>
				{indexes.map( (index) => (
						<div key={index.index_id} style={{'margin': '0 auto', 'width': '50%'}}>
							<TextField
								onBlur={(e) => this.handleOnBlurInput(e.target.value, index)}
								fullWidth={true}
								defaultValue={index.value}
								floatingLabelText={index.name}
	    					/>
	    				</div>
					)
				)}
				<div style={{textAlign: 'center'}}>
					<RaisedButton
						label="Cập nhật"
						primary={true}
						icon={<ActionCached />}
						style={styles.button}
						onClick={this.handleSubmit}
    				/>
				</div>
			</div>
		);
	}
}
export default TextInputs;