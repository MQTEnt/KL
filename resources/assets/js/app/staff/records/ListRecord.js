import React from 'react';
import { browserHistory } from "react-router";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Search from '../partials/Search';
import TableFooter from '../partials/TableFooter';
import CircularProgress from 'material-ui/CircularProgress';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ActionExtension from 'material-ui/svg-icons/action/extension';
import RangedDate from './RangedDate';
import autoBind from 'react-autobind';

class List extends React.Component{
  constructor(props)
  {
    super(props);
    this.state = {
      openDialog: false,
      selectedRecord: null,
      records: null,
      isLoading: true,
      searchKey: '',
      current_page: 0,
      last_page: 0,
      rangedDateSearch: false,
      maxDate: null,
      minDate: null
    };

    //
    autoBind(this);
  }
  setDate(minDate, maxDate){
    this.setState({
        minDate: minDate,
        maxDate: maxDate
    });
  }
  setSearchKey(key){
    this.setState({
        searchKey: key
    });
  }
  getRecords(url){
    this.setState({
      records: [],
      isLoading: true
    });
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
              'records': obj.data,
              'last_page': obj.last_page,
              'current_page': obj.current_page,
              'isLoading': false
        });
      }.bind(this))
      .catch(function(ex) {
        //Log Error
        console.log('parsing failed', ex)
      });
    }.bind(this), 1500);
  }
  onCellClickHandle(rowNumber, columnNumber, evt){
    this.setState({'openDialog': true});
    let selectedRecordId = parseInt(evt.target.dataset.id, 10); //get property data-id
    //console.log("activityId", selectedRecordId);

    let records = this.state.records;
    let indexObj = records.findIndex((obj => obj.id === selectedRecordId));
    let selectedRecord = records[indexObj];
    
    // console.log(selectedRecord);
    browserHistory.push('/staff/examination/'+selectedRecord.id)
    // this.setState({
    //     'selectedRecord': selectedRecord
    // });
  }
  handleClose(){
    this.setState({openDialog: false});
  }
  onClickRangedDateSearch(event, index, value){
    if(this.state.rangedDateSearch !== value)
      this.setState({rangedDateSearch: value})
  }
  displayRows(){
    if(this.state.records != null)
      return (
        <TableBody showRowHover={true} displayRowCheckbox={false} style={{'cursor': 'pointer'}}>
          {
            this.state.records.map( (record) => (
                <TableRow key={record.id} style={{'cursor': 'pointer'}}>
                    <TableRowColumn  data-id={record.id}>{record.id}</TableRowColumn>
                    <TableRowColumn  data-id={record.id}>{record.patient.name}</TableRowColumn>
                    <TableRowColumn  data-id={record.id}>{record.created_at.split(" ")[0]}</TableRowColumn>
                </TableRow>
              )
            )
          }
        </TableBody>
      )
  }
  refresh(){
    //console.log('Refresh');
    this.setState({
      isLoading: true,
      searchKey: '',
      rangedDateSearch: false,
      maxDate: null,
      minDate: null
    });
    this.getRecords('/record');
  }
  componentDidMount(){
    this.getRecords('/record');
  }
  render(){
    return (
      <div>
        <div style={{width: '95%', textAlign: 'right', margin: '0 auto'}}>
          <SelectField
            value={this.state.rangedDateSearch}
            onChange={this.onClickRangedDateSearch}
          >
            <MenuItem value={true} primaryText="Tìm kiếm theo ngày" />
            <MenuItem value={false} primaryText="Tìm kiếm theo mã bệnh án" />
          </SelectField>
          <div style={{display: 'inline-block', width: '48px'}}></div>
        </div>
        {(this.state.rangedDateSearch)?
          <RangedDate
            setDate={this.setDate}
            getList={this.getRecords}
            api={'/record/searchByDate?'}
          />
          :
          <Search 
            getList={this.getRecords}
            setSearchKey={this.setSearchKey}
            hintText='Nhập mã bệnh án'
            apiSearch='/record/search'
            autoComplete={false}
          />
        }
        <Table
          onCellClick={this.onCellClickHandle}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Mã bệnh án</TableHeaderColumn>
              <TableHeaderColumn>Tên bệnh nhân</TableHeaderColumn>
              <TableHeaderColumn>Ngày tạo</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          {this.displayRows()}
          <TableFooter 
            current_page={this.state.current_page} 
            last_page={this.state.last_page} 
            getList={this.getRecords}
            api={(this.state.rangedDateSearch)?'/record/searchByDate?minDate='+this.state.minDate+'&maxDate='+this.state.maxDate:'/record?'}
          />
        </Table>
        {
          (this.state.isLoading)?
          <div style={{'margin': '0 auto', 'width': '0'}}>
            <CircularProgress size={80} thickness={5}/>
          </div>
          :''
        }
      </div>
    );
  }
}

export default List;