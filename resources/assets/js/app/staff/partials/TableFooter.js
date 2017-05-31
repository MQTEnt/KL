import React from 'react';
import {TableFooter as TF, TableRow, TableRowColumn, FontIcon, IconButton} from 'material-ui';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import Goto from './Goto';
const styles = {
  footerContent: {
    float: 'right'
  },
  footerText: {
    float: 'right',
    paddingTop: 16,
    height: 16
  }
};
class TableFooter extends React.Component{
  constructor(props){
    super(props);
  }
  handleOnClick(api, page){
    let qSearch = this.props.qSearch;
    let regex = /^\s+$/;
    if(regex.test(qSearch))
      qSearch = '';

    let url = api+'?q='+qSearch+'&page=' + page;
    this.props.getList(url, qSearch);
  }
  render() {
    let current_page = this.props.current_page;
    let last_page = this.props.last_page;
    let api = this.props.api;
    if(last_page === 0)
      return (
        <TF adjustForCheckbox={false}>
          <TableRow>
            <TableRowColumn style={styles.footerContent}>
              {(current_page !== 0)?<p><b>Không có dữ liệu</b></p>:''}
            </TableRowColumn>
          </TableRow>
        </TF>
      );
    else
      return (
        <TF adjustForCheckbox={false}>
          <TableRow>
            <TableRowColumn style={styles.footerContent}>
              <IconButton disabled={current_page === 1} onClick={this.handleOnClick.bind(this, api, current_page-1)}>
                <HardwareKeyboardArrowLeft/>
              </IconButton>
              <IconButton disabled={current_page === last_page} onClick={this.handleOnClick.bind(this, api, current_page+1)}>
                <HardwareKeyboardArrowRight/>
              </IconButton>
            </TableRowColumn>
            <TableRowColumn style={styles.footerText}>
              {'Trang ' +  current_page + ' trên ' + last_page}
            </TableRowColumn>
            <TableRowColumn style={{'width': '50%'}}>
              <Goto goToPage={this.handleOnClick.bind(this, api)} last_page={this.props.last_page} current_page={this.props.current_page}/>
            </TableRowColumn>
          </TableRow>
        </TF>
      );
  }

};
TableFooter.muiName = 'TableFooter';
export default TableFooter;