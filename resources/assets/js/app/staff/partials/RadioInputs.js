import React from 'react';
import Checkbox from 'material-ui/Checkbox';

const styles = {
  block: {
    textAlign: 'center'
  },
  checkbox: {
    marginBottom: 16,
  },
};

export default class RadioInputs extends React.Component{
	constructor(props){
		super(props);
		this.inputs = [];
		this.onClick = this.onClick.bind(this);
		this.submit = this.submit.bind(this);
	}
	onClick(value, item){
		let inputs = this.inputs;
		if(item.id !== null)
		{
			let i = inputs.findIndex((obj) => obj.id === item.id);
			if(i === -1)
				this.inputs.push({id: item.id, value: value, index_id: item.index_id});
			else
				this.inputs[i].value = value;
		}
		else
		{
			let i = inputs.findIndex((obj) => obj.index_id === item.index_id);
			if(i === -1)
				this.inputs.push({id: item.id, value: value, index_id: item.index_id});
			else
				this.inputs[i].value = value;
		}

	}
	submit(){
		let addArr = [];
		let deleteArr = [];
		///console.log(this.inputs);
		this.inputs.forEach(function(item, index){
			if(item.id === null && item.value){
				addArr.push(item.index_id);
			}
			if(item.id !== null && !item.value){
				deleteArr.push(item.id);
			}
		});
		console.log('Add Array', addArr);
		console.log('Delete Array', deleteArr);
		if(addArr.length === 0 & deleteArr.length === 0)
		{
			console.log('Nothing updated');
			this.props.displayNoti(false, false, '');
			return;
		}


		let json_addArr = JSON.stringify(addArr);
		let json_deleteArr = JSON.stringify(deleteArr);
		/////Request
		var _token = document.getElementsByName("csrf-token")[0].getAttribute("content");
		var formData = new FormData();
	    formData.append('addArr', json_addArr);
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
	      	//console.log(obj.list);
      		this.props.setList(obj.list);
      		this.props.displayNoti(true, false, obj.message);
	    }.bind(this))
	    .catch(function(ex) {
	      //Log Error
	      console.log('parsing failed', ex)
	    });
		this.inputs = [];
	}
	renderItems(){
		let items = this.props.items;
		if(items.length > 0)
			return (
				<div style={styles.block}>
				{items.map( (item) => (
						<div key={item.index_id} style={{maxWidth: 250, margin: '0 auto'}}>
		    				<Checkbox
								label="Simple"
								label={item.name}
								style={styles.checkbox}
								defaultChecked={(item.id !== null)?true:false}
								onClick={(e)=>{this.onClick(e.target.checked, item)}}
						    />
						</div>
					)
				)}
				</div>
			);
	}
	render(){
		return (
			<div>
				{this.renderItems()}
			</div>
		);
	}
}