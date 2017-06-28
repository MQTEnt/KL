import React from 'react';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // only needs to be imported once
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import ActionVisibility from 'material-ui/svg-icons/action/visibility';

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
  }
}
// Render the Calendar
const today = new Date();
export default class Follow extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      openDrawer: false
    }

    this.onSelectDate = this.onSelectDate.bind(this);
  }
  onSelectDate(date){
    this.setState({
      openDrawer: true
    });
  }
  render(){
    return (
      <div style={{width: '80%', margin: '0 auto'}}>
        <h4 style={{textAlign: 'center'}}>Theo dõi chăm sóc bệnh nhân</h4>
        <InfiniteCalendar
          width={'100%'}
          height={300}
          selected={today}
          theme={styles.calendarTheme}
          onSelect={this.onSelectDate}
          className={'calendar'}
        />
        <Drawer
          openSecondary={true}
          docked={false}
          width={200}
          open={this.state.openDrawer}
          onRequestChange={() => this.setState({openDrawer: false})}
        >
          <div style={{padding: 10}}>
            <p style={{fontFamily: 'Lato'}}>Chọn <b>'Theo dõi'</b> để xem và đánh giá các hoạt động của bệnh nhân trong ngày</p>
            <RaisedButton 
              fullWidth={true} 
              label="Theo dõi" 
              primary={true} 
              style={styles.button} 
              icon={<ActionVisibility/>}
            />
          </div>
        </Drawer>
      </div>
    );
  }
}