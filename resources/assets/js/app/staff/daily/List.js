import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Search from '../partials/Search';
import TableFooter from '../partials/TableFooter';
import Detail from './Detail';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import autoBind from 'react-autobind';

class List extends React.Component{
  constructor(props)
  {
    super(props);
    this.state = {
      openDialog: false,
      selectedPatient: null
    };

    //
    autoBind(this);
  }
  onCellClickHandle(rowNumber, columnNumber, evt){
    this.setState({'openDialog': true});
    let selectedPatientId = parseInt(evt.target.dataset.id, 10); //get property data-id
    //console.log("activityId", selectedPatientId);

    let patients = this.props.patients;
    let indexObj = patients.findIndex((obj => obj.id === selectedPatientId));
    let selectedPatient = patients[indexObj];
    //Convert dob to object
    //selectedPatient.dob = new Date(selectedPatient.dob);
    //console.log(selectedPatient);
    this.setState({
        'selectedPatient': selectedPatient
    });
  }
  handleClose(){
    this.setState({openDialog: false});
  };
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
    return (
      <div>
        <Search 
          getList={this.props.getPatients}
          setSearchKey={this.props.setSearchKey}
          hintText='Nhập tên hoặc mã bệnh nhân'
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
          (this.props.isLoadingPatients)?
          <div style={{'margin': '0 auto', 'width': '0'}}>
            <CircularProgress size={80} thickness={5}/>
          </div>
          :''
        }
        <Dialog
          title="Thông tin bệnh nhân"
          modal={false}
          open={this.state.openDialog}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <Detail
            patientId={(this.state.selectedPatient != null)?this.state.selectedPatient.id:null}
          />
        </Dialog>
      </div>
    );
  }
}

export default List;