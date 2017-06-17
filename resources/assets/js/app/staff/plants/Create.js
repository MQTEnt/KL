import React from 'react';
import RaisedButton  from 'material-ui/RaisedButton';
import SelectInputs from '../partials/SelectInputs';
import ActionAutorenew from 'material-ui/svg-icons/action/autorenew';
import DatePicker from 'material-ui/DatePicker';
import SnackBar from '../partials/SnackBar';
import autoBind from 'react-autobind';
import { browserHistory } from 'react-router';

export default class Create extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        list: [
      ],
      selectedList: [
        
      ],

      fromDate: new Date(),
      toDate: new Date(),
      addedArr: [],
      removedArr: [],
      openSnackBar: false,
      notiSnackBar: '',
    };

    autoBind(this);
  }
  setUpdatedData(addedArr, removedArr){
    this.setState({
      addedArr: addedArr,
      removedArr: removedArr
    });
  }
  handleOnClick(){
    let result = this.List.submit();
    if(result === 0){
      this.setState({
        openSnackBar: true,
        notiSnackBar: 'Tạo thất bại, chọn hoạt động để lập kế hoạch'
      });
      return;
    }
    //else...
    //Create plant
    let fromDate = this.state.fromDate.getFullYear()+'/'+(this.state.fromDate.getMonth()+ 1)+'/'+this.state.fromDate.getDate();
    let toDate = this.state.toDate.getFullYear()+'/'+(this.state.toDate.getMonth()+ 1)+'/'+this.state.toDate.getDate();
    
    var _token = document.getElementsByName("csrf-token")[0].getAttribute("content");
    var formData = new FormData();
    formData.append('_token', _token);
    formData.append('fromDate', fromDate);
    formData.append('toDate', toDate);

    let json_addArr = JSON.stringify(result[0]);
    formData.append('addedArr', json_addArr);

    fetch('/plant/create/'+this.props.params.patient_id, {
        method: 'POST',
        credentials: 'same-origin',
        body: formData
      })
      .then(function(response) {
        return response.json()
      }).then(function(obj) {
        //Conflict date
        if(obj.stat === 0)
        {
          this.setState({
            openSnackBar: true,
            notiSnackBar: obj.noti
          });
        }
        if(obj.stat === 1)
        {
          // this.setState({
          //   openSnackBar: true,
          //   notiSnackBar: obj.noti
          // });
          //Redirect
          browserHistory.push('/staff/plant/list/'+this.props.params.patient_id);


        }

      }.bind(this))
      .catch(function(ex) {
        //Log Error
        console.log('parsing failed', ex)
      });
  }
  handleChangeFromDate(event, date){
    if(date > this.state.toDate)
      this.setState({
        fromDate: date,
        toDate: date
      });
    else
      this.setState({
        fromDate: date
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
  componentDidMount(){
    fetch('/activity', {
        credentials: 'same-origin'
      })
      .then(function(response) {
        return response.json()
      }).then(function(obj) {
        //Data Response
        this.setState({
          list: obj
        });
      }.bind(this))
      .catch(function(ex) {
        //Log Error
        console.log('parsing failed', ex)
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
        <SnackBar
          open={this.state.openSnackBar}
          noti={this.state.notiSnackBar}
          onRequestClose={()=>{this.setState({openSnackBar: false})}}
        />
      </div>
    );
  }
}