import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ActionCached from 'material-ui/svg-icons/action/cached';
import Alert from './Alert';
import SnackBar from './SnackBar';
import LinearProgress from 'material-ui/LinearProgress';
import autoBind from 'react-autobind';

const styles = {
  button: {
    margin: 12,
  }
}
class TextInputs extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			'openAlert': false,
			'openSnackBar': false,
			'openProgress': false
		}
		this.inputs = [];
		autoBind(this);
	}
	alertCancel(){
		this.setState({
			'openAlert': false
		});
	}
	alertAccept(){
		this.handleSubmit();
		this.setState({
			'openAlert': false
		});
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
		
		if(addArr.length === 0 && editArr.length === 0 && deleteArr.length === 0)
		{
			console.log('Nothing update!');
			return;
		}
		//Display progress
		this.setState({
			'openProgress': true
		});

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
	    setTimeout(function(){
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
		      		this.props.updateIndexes(obj.indexes);
		      		this.setState({
		      			openSnackBar: true,
		      			openProgress: false
		      		});
		      	}
		    }.bind(this))
		    .catch(function(ex) {
		      //Log Error
		      console.log('parsing failed', ex)
		    });
		}.bind(this), 1500);
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
						onClick={()=>{this.setState({'openAlert': true})}}
    				/>
				</div>
				{(this.state.openProgress)?
					<div style={{'margin': '0 auto', 'width': '50%'}}>
						<LinearProgress mode="indeterminate" />
					</div>
					:''
				}
				<Alert
					alertAccept={this.alertAccept}
					alertCancel={this.alertCancel}
					open={this.state.openAlert}
					noti="Bạn có chắc muốn cập nhật?"
				/>
				<SnackBar
					open={this.state.openSnackBar}
					noti="Đã cập nhật thành công"
					onRequestClose={()=>{this.setState({openSnackBar: false})}}
				/>
			</div>
		);
	}
}
export default TextInputs;