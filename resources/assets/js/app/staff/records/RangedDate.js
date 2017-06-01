import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import ActionSearch from 'material-ui/svg-icons/action/search';
import IconButton from 'material-ui/IconButton';
import autoBind from 'react-autobind';

const style={
	'textAlign': 'right', 
	'width': '95%', 
	'margin': '0 auto',
	'overflow': 'hidden'
};
/**
 * `DatePicker` can be implemented as a controlled input,
 * where `value` is handled by state in the parent component.
 */
export default class RangedDate extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      minDate: new Date(),
      maxDate: new Date()
    };
    autoBind(this);
  }

  handleChangeMinDate(event, date){
    this.setState({
      minDate: date,
    });
  }

  handleChangeMaxDate(event, date){
    this.setState({
      maxDate: date,
    });
  }

  onClickSearch(){
    let date = new Date(this.state.minDate);
    let minDate = date.getFullYear()+'-'+(date.getMonth()+ 1)+'-'+date.getDate();
    date = new Date(this.state.maxDate);
    let maxDate = date.getFullYear()+'-'+(date.getMonth()+ 1)+'-'+date.getDate();
    
    this.props.setDate(minDate, maxDate);
    this.props.getList('/record?minDate='+minDate+'&maxDate='+maxDate, '');
  }
  render() {
    return (
    	<div style={style}>
    			<DatePicker
					hintText="Từ ngày"
          floatingLabelText="Từ ngày"
					value={this.state.minDate}
					onChange={this.handleChangeMinDate}
					autoOk={true}
					style={{display: 'inline-block'}}
				/>
				<div style={{display: 'inline-block', width: '48px'}}></div>
    			<DatePicker
					hintText="Đến ngày"
          floatingLabelText="Đến ngày"
					value={this.state.maxDate}
					onChange={this.handleChangeMaxDate}
					autoOk={true}
					style={{display: 'inline-block'}}
				/>
				<IconButton tooltip="Bấm để tìm kiếm" tooltipPosition="top-left" onClick={this.onClickSearch}>
					<ActionSearch/>
				</IconButton>
      	</div>
    );
  }
}