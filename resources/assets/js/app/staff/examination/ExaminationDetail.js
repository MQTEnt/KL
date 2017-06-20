import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import ContentForward from 'material-ui/svg-icons/content/forward';
import ActionCached from 'material-ui/svg-icons/action/cached';
import Symptom from './Symptom';
import Sign from './Sign';
import Image from './Image';
import Exploration from './Exploration';
import Alert from '../partials/Alert';
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
        explorations: []
      },
      value: 0,
      maxValue: 4,
      openAlert: false,
      openSnackBar: false,
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
      }
      
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
        {
          (this.state.isLoading)?
          <div style={{'margin': '50px auto', 'width': '0'}}>
            <CircularProgress size={80} thickness={5}/>
          </div>
          :
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
              />
            </Tab>
            <Tab value={1}>
              <Sign
                signs={this.state.list.signs}
                ref={(ref)=>this.signComponent = ref}
                api={'/sign/'+this.props.params.record_id}
                setList={this.setSignData}
              />
            </Tab>
            <Tab value={2}>
              <p>
                Chỉ số xét nghiệm
              </p>
            </Tab>
            <Tab value={3}>
              <Image
                images={this.state.list.images}
                ref={(ref)=>this.imageComponent = ref}
                api={'/image/'+this.props.params.record_id}
                setList={this.setImageData}
              />
            </Tab>
            <Tab value={4}>
              <Exploration
                explorations={this.state.list.explorations}
                ref={(ref)=>this.explorationComponent = ref}
                api={'/exploration/'+this.props.params.record_id}
                setList={this.setExplorationData}
              />
            </Tab>
          </Tabs>
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
          noti='Đã cập nhật thành công'
        />
        <div style={{width: '50%', margin: '0 auto'}}>
            <RaisedButton 
              onClick={this.handleClickUpdate} 
              label="Cập nhật" 
              primary={true}
              icon={<ActionCached/>}
              fullWidth={true}
              style={{marginBottom: '10px'}} 
            />
            <RaisedButton 
              onClick={this.handleClickNext} 
              label="Tiếp tục" 
              secondary={true}
              icon={<ContentForward/>}
              fullWidth={true}
              style={{marginBottom: '10px'}} 
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