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
      list: {
        symptoms: []
      },
      value: 0,
      maxValue: 1,
      openAlert: false,
      openSnackBar: false,
      openProgress: false
    };

    autoBind(this);
  }
  setSymptomData(obj){
    let oldList = this.state.list;
    let newList = {...oldList, 'symptoms': obj};
    this.setState({
      list: newList
    });
  }
  getList(url){
    setTimeout(function(){
        //Get data
      fetch(url, {
        credentials: 'same-origin'
      })
      .then(function(response) {
        return response.json()
      }).then(function(obj) {
        //Data Response
        //console.log('Data Response: ', obj);

        this.setState({
          isLoading: false,
          list: obj
        })
      }.bind(this))
      .catch(function(ex) {
        //Log Error
        console.log('parsing failed', ex)
      });
    }.bind(this), 1500);
  }
  componentDidMount(){
    let record_id = this.props.params.record_id;
    this.getList('/examination/'+record_id);
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
      if(this.state.value === 0)
        this.symptomsComponent.submit();

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
            <Symptom
              symptoms={this.state.list.symptoms}
              ref={(ref)=>this.symptomsComponent = ref}
              api={'/symptom/'+this.props.params.record_id}
              setList={this.setSymptomData}
            />
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