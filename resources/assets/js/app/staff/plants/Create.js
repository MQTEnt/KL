import React from 'react';
import RaisedButton  from 'material-ui/RaisedButton';
import SelectInputs from '../partials/SelectInputs';
import ActionAutorenew from 'material-ui/svg-icons/action/autorenew';
import DatePicker from 'material-ui/DatePicker';
import autoBind from 'react-autobind';

export default class Create extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        list: [
          {id: 1, name: 'A'},
          {id: 2, name: 'a'},
          {id: 3, name: 'Aa'},
          {id: 4, name: 'aA'},
          {id: 5, name: 'AaA'},
          {id: 6, name: 'aAaa'},
          {id: 7, name: 'B'},
          {id: 8, name: 'c'},
          {id: 9, name: 'd'},
          {id: 17, name: 'Ba'},
          {id: 18, name: 'ca'},
          {id: 19, name: 'da'},
          {id: 27, name: 'Bb'},
          {id: 28, name: 'cb'},
          {id: 29, name: 'db'},
          {id: 37, name: 'Bc'},
          {id: 38, name: 'cc'},
          {id: 39, name: 'dc'}
      ],
      selectedList: [
        {id: 1, name: 'A'},
        {id: 2, name: 'a'},
        {id: 3, name: 'Aa'}
      ],

      fromDate: new Date(),
      toDate: new Date()
    };

    autoBind(this);
  }
  handleOnClick(){
    this.List.submit();
    console.log(this.state.fromDate, this.state.toDate);
  }
  handleChangeFromDate(event, date){
    this.setState({
      fromDate: date,
    });
  }
  handleChangeToDate(event, date){
  	if(date < this.state.fromDate){
  		this.setState({
	      toDate: this.state.fromDate,
	    });
  	}
  	else
	    this.setState({
	      toDate: date,
	    });
  }
  render(){
    return (
      <div style={{width: '80%', margin: '0 auto'}}>
        <SelectInputs
          list={this.state.list}
          selectedList = {this.state.selectedList}
          ref={(ref) => this.List = ref}
        />
        <DatePicker
			onChange={this.handleChangeFromDate}
			autoOk={true}
			floatingLabelText="Từ ngày"
			value={this.state.fromDate}
			disableYearSelection={true}
		/>
		<DatePicker
			onChange={this.handleChangeToDate}
			autoOk={true}
			floatingLabelText="Đến ngày"
			value={this.state.toDate}
			disableYearSelection={true}
		/>
        <RaisedButton
        	style={{marginTop: '3%'}}
			onClick={this.handleOnClick} 
			label="Cập nhật" 
			primary={true}
			icon={<ActionAutorenew />}
        />
      </div>
    );
  }
}