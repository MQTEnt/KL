import React from 'react';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // only needs to be imported once
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import ActionVisibility from 'material-ui/svg-icons/action/visibility';
import SnackBar from '../partials/SnackBar';
import FirstDayForm from './FirstDayForm';
import NextDay from './NextDay';
import autoBind from 'react-autobind';


const styles = {
  calendarTheme: { 
    headerColor: '#00bcd4', 
    selectionColor: '#00bcd4', 
    weekdayColor: '#0e94a5', 
    accentColor: '#00bcd4', 
    floatingNav: {
      background: 'rgb(255, 255, 255)',
      chevron: '#FFA726',
      color: '#000',
    }
  },
  checkbox: {
    marginBottom: 16,
  },
  button: {
    marginBottom: 10
  }
}
// Render the Calendar
const today = new Date();
export default class Caring extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      patient: {},
      openDrawer: false,
      isFollow: false,
      isFirstDay: true,
      care: {},
      dateStr: '',
      openSnackBar: false,
      noti: ''
    }

    autoBind(this);
  }
  showNoti(message){
    this.setState({
      noti: message,
      openSnackBar: true
    });
  }
  onSelectDate(date){
    let dateStr = date.getFullYear()+'-'+(date.getMonth()+ 1)+'-'+date.getDate();
    fetch('/care/'+this.props.params.patient_id+'/'+dateStr, {
        credentials: 'same-origin'
      })
      .then(function(response) {
      return response.json()
      }).then(function(obj) {
        if(obj.care !== null)
          this.setState({
            care: obj.care,
            isFollow: true,
            dateStr: dateStr,
            isFirstDay: (obj.care.isNgayDau)?true:false
          });
        else
          this.setState({
            isFollow: false,
            dateStr: dateStr
          });
      }.bind(this))
      .catch(function(ex){
      console.log('parsing failed', ex)
    });

    this.setState({
      openDrawer: true
    });
  }
  onClickFollowFirstDay(){
    this.setState({isFollow: true, isFirstDay: true});

    //Create first day
    fetch('/care/create-first-day/'+this.props.params.patient_id+'/'+this.state.dateStr, {
        credentials: 'same-origin'
      })
      .then(function(response) {
      return response.json()
      }).then(function(obj) {
        if(obj.state === 1)
          this.setState({
            care: obj.care,
            isFollow: true
          });
        else
          this.setState({
            isFollow: false
          });
      }.bind(this))
      .catch(function(ex){
      console.log('parsing failed', ex)
    });
  }
  onClickFollowNextDay(){
    this.setState({isFollow: true, isFirstDay: false});

    //Create next day
    fetch('/care/create-next-day/'+this.props.params.patient_id+'/'+this.state.dateStr, {
        credentials: 'same-origin'
      })
      .then(function(response) {
      return response.json()
      }).then(function(obj) {
        if(obj.state === 1)
          this.setState({
            care: obj.care,
            isFollow: true
          });
        else
          this.setState({
            isFollow: false
          });
      }.bind(this))
      .catch(function(ex){
      console.log('parsing failed', ex)
    });
  }
  renderIsFollow(){
    return (
      <div style={{margin: 5}}>
        {
          (this.state.isFirstDay)?
          <FirstDayForm 
            care={this.state.care}
            showNoti={this.showNoti}
          />
          :
          <NextDay 
            care={this.state.care}
            showNoti={this.showNoti}
          />
        }
      </div>
    );
  }
  renderIsNotFollow(){
    return (
      <div style={{padding: 10, fontFamily: 'Lato'}}>
        <RaisedButton 
          fullWidth={true} 
          label="Theo dõi ngày đầu" 
          primary={true} 
          style={styles.button}
          onClick={this.onClickFollowFirstDay}
        />
        <RaisedButton 
          fullWidth={true} 
          label="Theo dõi ngày tiếp theo" 
          primary={true} 
          style={styles.button}
          onClick={this.onClickFollowNextDay}
        />
      </div>
    );
  }
  componentDidMount(){
    //Get patient
    fetch('/patient/'+this.props.params.patient_id, {
        credentials: 'same-origin'
      })
      .then(function(response) {
      return response.json()
      }).then(function(obj) {
        this.setState({
          patient: obj.patient
        });
      }.bind(this))
      .catch(function(ex) {
      //Log Error
      console.log('parsing failed', ex)
    });
  }
  render(){
    let patient = this.state.patient;
    return (
      <div style={{width: '80%', margin: '0 auto'}}>
        <h3 style={{textAlign: 'center'}}>Theo dõi chăm sóc bệnh nhân</h3>
        {(patient!==null)?
          <Paper zDepth={2}>
            <ul style={{margin: 20, padding: 10, textAlign: 'left'}}>
              <li>Tên bệnh nhân: <b>{patient.name}</b></li>
              <li>Ngày sinh: <b>{patient.dob}</b></li>
              <li>Địa chỉ: <b>{patient.address}</b></li>
              <li>Nghề nghiệp: <b>{patient.job}</b></li>
            </ul>
          </Paper>
          :''
        }
        <Paper zDepth={2}>
          <InfiniteCalendar
            width={'100%'}
            height={300}
            selected={today}
            theme={styles.calendarTheme}
            onSelect={this.onSelectDate}
            className={'calendar'}
          />
        </Paper>
        <Drawer
          openSecondary={true}
          docked={false}
          width={300}
          open={this.state.openDrawer}
          onRequestChange={() => this.setState({openDrawer: false})}
        >
          {(this.state.isFollow)?
            this.renderIsFollow()
            :
            this.renderIsNotFollow()
          }
        </Drawer>
        <SnackBar
          open={this.state.openSnackBar}
          noti={this.state.noti}
          onRequestClose={()=>{this.setState({openSnackBar: false})}}
        />
      </div>
    );
  }
}