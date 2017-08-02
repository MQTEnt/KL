import React from 'react';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // only needs to be imported once
import Drawer from 'material-ui/Drawer';
import RadioInputs from '../partials/RadioInputs';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import ActionVisibility from 'material-ui/svg-icons/action/visibility';
import SnackBar from '../partials/SnackBar';
import MiniNav from '../partials/MiniNav';
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
}
// Render the Calendar
const today = new Date();
export default class Follow extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      patient: {},
      openDrawer: false,
      isFollow: false,
      activities: [],
      followDay: {},
      dateStr: '',
      rate: '',
      openSnackBar: false,
      noti: ''
    }

    autoBind(this);
  }
  onClickActivity(){

  }
  setList(list){
    this.setState({
      activities: list
    });
  }
  onClickUpdate(){
    let rate = this.textInput.getValue();
    //Update rate firstly
    let _token = document.getElementsByName("csrf-token")[0].getAttribute("content");
    let formData = new FormData();
    formData.append('rate', rate);
    formData.append('_token', _token);

    let api = '/daily/rate/'+this.props.params.patient_id+'/'+this.state.dateStr;
      //POST (AJAX)
      fetch(api, {
        method: 'POST',
        credentials: 'same-origin',
        body: formData
      })
      .then(function(response) {
        return response.json()
      }).then(function(obj) {
          //console.log(obj);
          if(obj.state === 1){
            //Update check activity
            this.radioInputsComponent.submit(); //What if submit error ???
            this.setState({
              openSnackBar: true,
              noti: 'Đã cập nhật thành công!'
            });
          }
          else
          {
            this.setState({
              openSnackBar: true,
              noti: 'Cập nhật thất bại, mời thử lại'
            });
          }
      }.bind(this))
      .catch(function(ex) {
        //Log Error
        console.log('parsing failed', ex)
      });
  }
  onSelectDate(date){
    let dateStr = date.getFullYear()+'-'+(date.getMonth()+ 1)+'-'+date.getDate();
    let api = '/daily/'+this.props.params.patient_id+'/'+dateStr;
    fetch(api, {
        credentials: 'same-origin'
      })
      .then(function(response) {
      return response.json()
      }).then(function(obj) {
        //Data Response
        //console.log('Data Response: ', obj);
        this.setState({
          'isFollow': obj.isFollow,
          'activities': (obj.isFollow)?obj.activities:[],
          'followDay': (obj.isFollow)?obj.day:{},
          'rate': (obj.isFollow)?obj.day.rate:'',
          'dateStr': dateStr
        });
      }.bind(this))
      .catch(function(ex) {
      //Log Error
      console.log('parsing failed', ex)
    });


    this.setState({
      openDrawer: true
    });
  }
  onClickFollow(){
    let api = '/daily/setfollow/'+this.props.params.patient_id+'/'+this.state.dateStr;
    fetch(api, {
        credentials: 'same-origin'
      })
      .then(function(response) {
      return response.json()
      }).then(function(obj) {
        //Data Response
        //console.log('Data Response: ', obj);
        this.setState({
          'isFollow': obj.isFollow,
          'activities': obj.activities,
          'followDay': obj.day,
          'rate': '',
          'openSnackBar': true,
          'noti': 'Đang theo dõi hoạt động trong ngày '+this.state.dateStr
        });
      }.bind(this))
      .catch(function(ex) {
      //Log Error
      console.log('parsing failed', ex)
    });
  }
  renderIsFollow(){
    let activities = this.state.activities;
    return (
      <div style={{padding: 10, fontFamily: 'Lato'}}>
        <p>Tích chọn các hoạt động mà bệnh nhân đã thực hiện và điền đánh giá</p>
        <RadioInputs
          items={activities}
          ref={(ref)=>this.radioInputsComponent = ref}
          api={'/daily/check/'+this.props.params.patient_id+'/'+this.state.dateStr}
          setList={this.setList}
          displayNoti={()=>{}}
        />
        <TextField
          key={this.state.followDay.id}
          hintText="Điền đánh giá..."
          floatingLabelText="Đánh giá"
          multiLine={true}
          rows={5}
          ref={(input)=>this.textInput = input}
          defaultValue={this.state.rate}
        /><br />
        <RaisedButton 
          fullWidth={true} 
          label="Cập nhật" 
          primary={true} 
          style={styles.button}
          onClick={this.onClickUpdate}
        />
        </div>
    );
  }
  renderIsNotFollow(){
    return (
      <div style={{padding: 10}}>
        <p style={{fontFamily: 'Lato'}}>Chọn <b>'Theo dõi'</b> để xem và đánh giá các hoạt động của bệnh nhân trong ngày</p>
        <RaisedButton 
          fullWidth={true} 
          label="Theo dõi" 
          primary={true} 
          style={styles.button} 
          icon={<ActionVisibility/>}
          onClick={this.onClickFollow}
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
    let nav = [
      {name: 'Danh sách bệnh nhân', url: '/staff/daily'},
      {name: 'Lịch sử theo dõi điều trị', url: '/staff/daily/'+this.props.params.patient_id}
    ];
    let patient = this.state.patient;
    return (
      <div style={{width: '80%', margin: '0 auto'}}>
        <MiniNav nav={nav} />
        <h3 style={{textAlign: 'center'}}>Theo dõi điều trị bệnh nhân</h3>
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
          width={200}
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