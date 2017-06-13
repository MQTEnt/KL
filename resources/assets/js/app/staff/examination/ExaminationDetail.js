import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';
import Symptom from './Symptom';
import Alert from '../partials/Alert';
import SnackBar from '../partials/SnackBar';
import LinearProgress from 'material-ui/LinearProgress';
import autoBind from 'react-autobind';
const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  main: {
    width: '90%',
    margin: '0 auto'
  }
};

export default class ExaminationDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      maxValue: 1,
      openAlert: false,
      openSnackBar: false,
      openProgress: false
    };

    autoBind(this);
  }

  handleClickNext(){
    let currentValue = this.state.value;
    this.setState({
      value: (this.state.value === this.state.maxValue)?0:currentValue+1
    });

  };
  handleClickUpdate(){
    this.setState({
      openAlert: true
    });
  }
  alertCancel(){
    this.setState({
      openAlert: false
    });
  }
  alertAccept(){
    this.setState({
      openProgress: true,
      openAlert: false
    })
    setTimeout(function(){
      //Request Success
      this.setState({
        openSnackBar: true,
        openProgress: false
      });
    }.bind(this), 1500);
  }
  render() {
    return (
      <div style={styles.main}>
        <h2 style={styles.headline}>Mã bệnh án: {this.props.params.record_id}</h2>
        <Tabs
          value={this.state.value}
          inkBarStyle={{display: 'none'}}
          tabItemContainerStyle={{display: 'none'}}
        >
          <Tab value={0}>
            <Symptom />
          </Tab>
          <Tab value={1}>
            <div>
              <h2 style={styles.headline}>Controllable Tab B</h2>
              <p>
                This is another example of a controllable tab. Remember, if you
                use controllable Tabs, you need to give all of your tabs values or else
                you wont be able to select them.
              </p>
            </div>
          </Tab>
        </Tabs>
        <Alert
          open={this.state.openAlert}
          alertCancel={this.alertCancel}
          alertAccept={this.alertAccept}
          noti='Bạn có muốn cập nhật?'
        />
        <SnackBar
          open={this.state.openSnackBar}
          onRequestClose={() => {this.setState({openSnackBar: false})}}
          noti='Đã cập nhật thành công'
        />
        <div>
            <FlatButton 
              onClick={this.handleClickUpdate} 
              label="Cập nhật" 
              primary={true} 
            />
            <FlatButton 
              onClick={this.handleClickNext} 
              label="Tiếp tục" 
              primary={true} 
            />
        </div>
        {(this.state.openProgress)?
          <LinearProgress mode="indeterminate" />
          :''
        }
      </div>
    );
  }
}