import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Alert from '../partials/Alert';
import Search from './Search';
import TableFooter from './TableFooter';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentSave from 'material-ui/svg-icons/content/save';
import Detail from './Detail';
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
    selectedPatient.dob = new Date(selectedPatient.dob);
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
        <Search getPatients={this.props.getPatients}/>
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
            getPatients={this.props.getPatients}
            qSearch={this.props.qSearch}
          />
        </Table>
          <Detail
            selectedPatient={this.state.selectedPatient}
            handleClose={this.handleClose}
            openDialog={this.state.openDialog}
          />
      </div>
    );
  }
}

export default List;