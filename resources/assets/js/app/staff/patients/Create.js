import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Form from './Form';
import autoBind from 'react-autobind';

const style = {
  main: {
    width: '50%',
    margin: '0 auto'
  },
  button: {
    margin: '50px 0',
  }
}
class Create extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			openDialog: false
		};
		
		autoBind(this);
	}
	handleCloseDialog(){
		this.setState({
			openDialog: false
		});
	}
	handleClickOk(){
		this.props.handleChangeTab(0);
		this.setState({
			openDialog: false
		});
	}
	handleClickCreate(){
		this.form.handleSubmit();
	}
	addPatient(obj){
		var _token = document.getElementsByName("csrf-token")[0].getAttribute("content");
		var formData = new FormData();
	    formData.append('name', obj.name);
	    formData.append('gender', obj.gender);
	    formData.append('address', obj.address);
	    formData.append('city', obj.city);

	    var date = new Date(obj.dob);
	    var dob = date.getFullYear()+'/'+(date.getMonth()+ 1)+'/'+date.getDate();
	    formData.append('dob', dob);
	    
	    formData.append('id_card', obj.id_card);
	    formData.append('insurance_card', obj.insurance_card);
	    formData.append('job', obj.job);
	    formData.append('number', obj.number);
	    formData.append('email', obj.email);
	    formData.append('room_id', obj.room_id);
	    formData.append('description', obj.description);
	    //Token
	    formData.append('_token', _token);

	    //POST (AJAX)
	    fetch('/patient', {
	      method: 'POST',
	      credentials: 'same-origin',
	      body: formData
	    })
	    .then(function(response) {
	      return response.json()
	    }).then(function(obj) {
	      if(obj.stat==1){
	      	//Clear form
	      	this.form.clearForm();
	      	//Open dialog
		    this.setState({
				openDialog: true
			});
		    //Add new patient on table
		    this.props.handleAdd(obj.patient);
	      }
	    }.bind(this))
	    .catch(function(ex) {
	      //Log Error
	      console.log('parsing failed', ex)
	    });
	}
	render(){
		const actions = [
		    <FlatButton
		        label="Ok"
		        primary={true}
		        onTouchTap={this.handleClickOk}
		    />
	    ];

		return (
			<div style={style.main}>
			    <Form
			      	editing={false}
			      	ref={(ref)=>this.form = ref}
			      	addPatient={this.addPatient}
			    />
			    <RaisedButton
				    label="Thêm mới"
				    labelPosition="after"
				    primary={true}
				    icon={<ContentAdd />}
				    style={style.button}
				    onClick={this.handleClickCreate}
			    />
			    <Dialog
		          	actions={actions}
		          	modal={false}
		          	open={this.state.openDialog}
		          	onRequestClose={this.handleCloseDialog}
		        >
		          Thêm mới thành công!
		        </Dialog>
			</div>
		);
	}
}

export default Create;