import React from 'react';
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
      qSearch: '',
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
  getRecords(url, qSearch){
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
    
    //console.log(selectedRecord);
    this.setState({
        'selectedRecord': selectedRecord
    });
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
        <TableBody showRowHover={true} displayRowCheckbox={false}>
          {
            this.state.records.map( (record) => (
                <TableRow key={record.id} style={{'cursor': 'pointer'}}>
                    <TableRowColumn  data-id={record.id}>{record.id}</TableRowColumn>
                </TableRow>
              )
            )
          }
        </TableBody>
      )
  }
  componentDidMount(){
    this.getRecords('/record','');
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
          />
          :
          <Search 
            getList={this.getRecords}
            hintText='Nhập mã bệnh án'
            apiSearch='/record/search'
            autoComplete={false}
          />
        }
        <Table
          onCellClick={this.onCellClickHandle}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          {this.displayRows()}
          <TableFooter 
            current_page={this.state.current_page} 
            last_page={this.state.last_page} 
            getList={this.getRecords}
            qSearch={(this.state.rangedDateSearch)?'&minDate='+this.state.minDate+'&maxDate='+this.state.maxDate:''}
            api='/record'
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