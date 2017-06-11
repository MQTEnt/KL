import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';
import Alert from '../partials/Alert';
import FlatButton from 'material-ui/FlatButton';
import Search from '../partials/Search';
import TableFooter from '../partials/TableFooter';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentSave from 'material-ui/svg-icons/content/save';
import ActionAssignmentInd from 'material-ui/svg-icons/action/assignment-ind';
import {fullWhite} from 'material-ui/styles/colors';
import Form from './Form';
import CircularProgress from 'material-ui/CircularProgress';
import autoBind from 'react-autobind';

const style = {
  button: {
    color: 'white',
    margin: '0 5px'
  }
}
class List extends React.Component{
  constructor(props)
  {
    super(props);
    this.state = {
      openDialog: false,
      openAlert: false,
      openDialogNoti: false
    };

    //
    autoBind(this);
  }
  updatePatient(obj){
    var _token = document.getElementsByName("csrf-token")[0].getAttribute("content");
    var formData = new FormData();
    formData.append('name', obj.name);
    formData.append('gender', obj.gender);
    formData.append('address', obj.address);
    formData.append('city', obj.city);

    var date = new Date(obj.dob);
    var dob = date.getFullYear()+'/'+(date.getMonth()+ 1)+'/'+date.getDate();
    formData.append('dob', dob);

    formData.append('id_card', obj.id_card);
    formData.append('insurance_card', obj.insurance_card);
    formData.append('job', obj.job);
    formData.append('number', obj.number);
    formData.append('email', obj.email);
    formData.append('room_id', obj.room_id);
    formData.append('description', obj.description);
    //Token
    formData.append('_token', _token);
    //Change method request
    formData.append('_method', 'PUT');
    
    //console.log(obj);
    //PUT (AJAX)
    fetch('/patient/'+obj.id, {
      method: 'POST',
      credentials: 'same-origin',
      body: formData
    })
    .then(function(response) {
      return response.json()
    }).then(function(obj) {
      //console.log(obj);
      this.props.handleUpdate(obj.patient);
      //Close Dialog
      this.setState({
        openDialog: false,
        openDialogNoti: true,
        noti: 'Đã cập nhật thành công!'
      });
      
    }.bind(this))
    .catch(function(ex) {
      //Log Error
      console.log('parsing failed', ex)
    });
  }
  onCellClickHandle(rowNumber, columnNumber, evt){
    this.setState({'openDialog': true});
    let selectedPatientId = parseInt(evt.target.dataset.id, 10); //get property data-id
    //console.log("activityId", selectedPatientId);

    let patients = this.props.patients;
    let indexObj = patients.findIndex((obj => obj.id === selectedPatientId));
    let selectedPatient = patients[indexObj];
    //Convert dob to object
    selectedPatient.dob = new Date(selectedPatient.dob);
    //console.log(selectedPatient);
    this.setState({
        'selectedPatient': selectedPatient
    });
  }
  handleClose(){
    this.setState({openDialog: false});
  };
  handleSubmit(){
    this.form.handleSubmit();
  }
  handleAlert(){
    this.setState({openAlert: true});
  }
  handleAlertAccept(){
    //deletePatien
    var _token = document.getElementsByName("csrf-token")[0].getAttribute("content");
    var formData = new FormData();
    //Token
    formData.append('_token', _token);
    //Change method request
    formData.append('_method', 'DELETE');

    fetch('/patient/'+this.state.selectedPatient.id, {
      method: 'POST',
      credentials: 'same-origin',
      body: formData
    })
    .then(function(response) {
      return response.json()
    }).then(function(obj) {
      //Data Response
      //console.log('Data Response: ', obj);
      this.props.handleDelete(this.state.selectedPatient.id);
      
      //Close Dialog and Open Dialog Noti
      this.setState({
        alertAccept: true,
        openDialog: false,
        openAlert: false,
        openDialogNoti: true,
        noti: 'Đã xóa thành công!'
      });
    }.bind(this))
    .catch(function(ex) {
      //Log Error
      console.log('parsing failed', ex)
    });
  }
  handleAlertCancel(){
    this.setState({
      openAlert: false
    });
  }
  handleDelete(){
    this.setState({
        alertAccept: true,
        openDialog: false,
        openAlert: false
      });
  }
  handleCloseDialogNoti(){
    this.setState({openDialogNoti:false})
  }
  handleClickOk(){
    this.setState({openDialogNoti: false});
  }
  displayRows(){
    return (
      <TableBody showRowHover={true} displayRowCheckbox={false}>
        {
          this.props.patients.map( (patient) => (
              <TableRow key={patient.id} style={{'cursor': 'pointer'}}>
                  <TableRowColumn  data-id={patient.id}>{patient.id}</TableRowColumn>
                  <TableRowColumn  data-id={patient.id}>{patient.name}</TableRowColumn>
                  <TableRowColumn  data-id={patient.id}>{patient.address}</TableRowColumn>
                  <TableRowColumn  data-id={patient.id}>{patient.id_card}</TableRowColumn>
              </TableRow>
            )
          )
        }
      </TableBody>
    )
  }
  render(){
    const actions = [
      <FlatButton
        label="Hủy"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        style={style.button}
        label="Xóa"
        backgroundColor="#fc1414"
        hoverColor="#f94545"
        icon={<ActionDelete color={fullWhite} />}
        onTouchTap={this.handleAlert}
      />,
      <FlatButton
        style={style.button}
        label="Cập nhật"
        backgroundColor="#34a00c"
        hoverColor="#9cf47c"
        onTouchTap={this.handleSubmit}
        icon={<ContentSave color={fullWhite} />}
      />
    ];
    const action = [
        <FlatButton
          label="Ok"
          primary={true}
          onTouchTap={this.handleClickOk}
        />
      ];

    return (
      <div>
        <Search 
          getList={this.props.getPatients}
          hintText='Nhập tên hoặc mã bệnh nhân'
          setSearchKey={this.props.setSearchKey}
          apiSearchGroup='/patient/searchName'
          apiSearch='/patient/search'
          autoComplete={true}
        />
        <Table
          onCellClick={this.onCellClickHandle}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Tên bệnh nhân</TableHeaderColumn>
              <TableHeaderColumn>Địa chỉ</TableHeaderColumn>
              <TableHeaderColumn>Chứng minh thư nhân dân</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          {this.displayRows()}
          <TableFooter 
            current_page={this.props.current_page} 
            last_page={this.props.last_page} 
            getList={this.props.getPatients}
            api={'/patient/search?q='+this.props.searchKey}
          />
        </Table>
        {
          (this.props.isLoading)?
          <div style={{'margin': '0 auto', 'width': '0'}}>
            <CircularProgress size={80} thickness={5}/>
          </div>
          :''
        }
        <Dialog
          title={<p><ActionAssignmentInd style={{'position': 'relative', 'top': '5px'}}/>Thông tin bệnh nhân</p>}
          actions={actions}
          modal={false}
          open={this.state.openDialog}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <Form
            editing={true}
            selectedPatient={this.state.selectedPatient}
            ref={(ref)=>this.form = ref}
            updatePatient={this.updatePatient}
          />
        </Dialog>

        <Alert 
          open={this.state.openAlert} 
          alertAccept={this.handleAlertAccept} 
          alertCancel={this.handleAlertCancel}
          noti='Bạn có chắc muốn xóa?'
        />
        <Dialog
          actions={action}
          modal={false}
          open={this.state.openDialogNoti}
          onRequestClose={this.handleCloseDialogNoti}
        >
          {this.state.noti}
        </Dialog>
      </div>
    );
  }
}

export default List;