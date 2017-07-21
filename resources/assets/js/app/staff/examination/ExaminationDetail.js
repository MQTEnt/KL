import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import ContentForward from 'material-ui/svg-icons/content/forward';
import ContentUndo from 'material-ui/svg-icons/content/undo';
import ActionCached from 'material-ui/svg-icons/action/cached';
import Symptom from './Symptom';
import Sign from './Sign';
import Image from './Image';
import Exploration from './Exploration';
import Diagnosis from './Diagnosis';
import Index from './Index';
import Alert from '../partials/Alert';
import Paper from 'material-ui/Paper';
import SnackBar from '../partials/SnackBar';
import LinearProgress from 'material-ui/LinearProgress';
import CircularProgress from 'material-ui/CircularProgress';
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
    margin: '0 auto',
    paddingLeft: '40px',
    textAlign: 'center'
  }
};

export default class ExaminationDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      list: {
        symptoms: [],
        signs: [],
        images: [],
        explorations: [],
        diagnosis: [],
        indexes: []
      },
      patient: {},
      value: 0,
      maxValue: 5,
      openAlert: false,
      openSnackBar: false,
      notiSnackBar: '',
      openProgress: false,
      isLoading: true
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
  setSignData(obj){
    let oldList = this.state.list;
    let newList = {...oldList, 'signs': obj};
    this.setState({
      list: newList
    });
  }
  setImageData(obj){
    let oldList = this.state.list;
    let newList = {...oldList, 'images': obj};
    this.setState({
      list: newList
    });
  }
  setExplorationData(obj){
    let oldList = this.state.list;
    let newList = {...oldList, 'explorations': obj};
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
          list: obj,
          patient: obj.diagnosis.patient
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
      value: (this.state.value === this.state.maxValue)?currentValue:currentValue+1
    });

  }
  handleClickPre(){
    let currentValue = this.state.value;
    this.setState({
      value: (this.state.value === 0)?currentValue:currentValue-1
    });
  }
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
      switch (this.state.value){
        case 0:
            this.symtomComponent.submit();
            break;
        case 1:
            this.signComponent.submit();
            break;
        case 2:
            return;
        case 3:
            this.imageComponent.submit();
            break;
        case 4:
            this.explorationComponent.submit();
            break;
        case 5:
          this.diagnosisComponent.submit();
          break;
      }
    }.bind(this), 1500);
  }
  displayNoti(openSnackBar, openProgress, notiSnackBar){
    this.setState({
        openSnackBar: openSnackBar,
        openProgress: openProgress,
        notiSnackBar: notiSnackBar
      });
  }
  displayDate(time){
    let date = time.split(' ')[0];
    let dateStr = date.split('-');
    return dateStr[2]+'/'+dateStr[1]+'/'+dateStr[0];
  }
  displayTitleRecord(){
    let record_created_at  = this.state.list.diagnosis.created_at;
    return <h2 style={styles.headline}>Mã khám bệnh: {this.props.params.record_id} <i style={{fontSize: '65%'}}>Tạo ngày: {this.displayDate(record_created_at)}</i></h2>;
  }
  render() {
    let patient = this.state.patient
    return (
      <div style={styles.main}>
        {
          (this.state.isLoading)?
          <div style={{'margin': '50px auto', 'width': '0'}}>
            <CircularProgress size={80} thickness={5}/>
          </div>
          :
          <div>
            {this.displayTitleRecord()}
            <Paper zDepth={2}>
              <ul style={{margin: 20, padding: 10, textAlign: 'left'}}>
                <li>Tên bệnh nhân: <b>{patient.name}</b></li>
                <li>Ngày sinh: <b>{patient.dob}</b></li>
                <li>Địa chỉ: <b>{patient.address}</b></li>
                <li>Nghề nghiệp: <b>{patient.job}</b></li>
              </ul>
            </Paper>
            <Paper style={{marginBottom: 30, padding: 10}} zDepth={2}>
              <Tabs
                value={this.state.value}
                inkBarStyle={{display: 'none'}}
                tabItemContainerStyle={{display: 'none'}}
              >
                <Tab value={0}>
                  <Symptom
                    symptoms={this.state.list.symptoms}
                    ref={(ref)=>this.symtomComponent = ref}
                    api={'/symptom/'+this.props.params.record_id}
                    setList={this.setSymptomData}
                    displayNoti={this.displayNoti}
                  />
                </Tab>
                <Tab value={1}>
                  <Sign
                    signs={this.state.list.signs}
                    ref={(ref)=>this.signComponent = ref}
                    api={'/sign/'+this.props.params.record_id}
                    setList={this.setSignData}
                    displayNoti={this.displayNoti}
                  />
                </Tab>
                <Tab value={2}>
                  <Index
                    indexes={this.state.list.indexes}
                  />
                </Tab>
                <Tab value={3}>
                  <Image
                    images={this.state.list.images}
                    ref={(ref)=>this.imageComponent = ref}
                    api={'/image/'+this.props.params.record_id}
                    setList={this.setImageData}
                    displayNoti={this.displayNoti}
                  />
                </Tab>
                <Tab value={4}>
                  <Exploration
                    explorations={this.state.list.explorations}
                    ref={(ref)=>this.explorationComponent = ref}
                    api={'/exploration/'+this.props.params.record_id}
                    setList={this.setExplorationData}
                    displayNoti={this.displayNoti}
                  />
                </Tab>
                <Tab value={5}>
                  <Diagnosis
                    diagnosis={this.state.list.diagnosis}
                    ref={(ref)=>this.diagnosisComponent = ref}
                    api={'/record/'+this.props.params.record_id}
                    patient_state={this.state.patient.state}
                    displayNoti={this.displayNoti}
                  />
                </Tab>
              </Tabs>
            </Paper>
          </div>
        }
        <Alert
          open={this.state.openAlert}
          alertCancel={this.alertCancel}
          alertAccept={this.alertAccept}
          noti='Bạn có muốn cập nhật?'
        />
        <SnackBar
          open={this.state.openSnackBar}
          onRequestClose={() => {this.setState({openSnackBar: false})}}
          noti={this.state.notiSnackBar}
        />
        <div style={{width: '50%', margin: '0 auto'}}>
            <RaisedButton 
              onClick={this.handleClickUpdate} 
              label="Cập nhật" 
              primary={true}
              icon={<ActionCached/>}
              fullWidth={true}
              style={{marginBottom: '10px', display: (this.state.value===2)?'none':''}} 
            />
            {(this.state.value === this.state.maxValue)?
              ''
              :
              <RaisedButton 
                onClick={this.handleClickNext} 
                label="Tiếp tục" 
                secondary={true}
                icon={<ContentForward/>}
                fullWidth={true}
                style={{marginBottom: '10px'}} 
              />
            }
            {(this.state.value === 0)?
              ''
              :
              <RaisedButton 
                onClick={this.handleClickPre} 
                label="Quay lại" 
                secondary={true}
                icon={<ContentUndo/>}
                fullWidth={true}
                style={{marginBottom: '10px'}} 
              />
            }
        </div>
        {(this.state.openProgress)?
          <LinearProgress mode="indeterminate" />
          :''
        }
      </div>
    );
  }
}