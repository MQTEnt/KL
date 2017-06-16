import React from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Chip from 'material-ui/Chip';
import autoBind from 'react-autobind';

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  }
};

export default class SelectInputs extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      filterList: [],
      selectedList: this.props.selectedList.slice(0)
    }

    autoBind(this);
  }
  handleOnChange(str){
    if(str !== '')
    {
      let list = this.props.list;
      let newFilterList = list.filter((el) => (el.name.toUpperCase().indexOf(str.toUpperCase()) > -1));
      this.setState({
        filterList: newFilterList
      });
    }
    else
    {
      this.setState({
        filterList: []
      });
    }
  }
  handleOnClick(item){
    let selectedList = this.state.selectedList;
    let i = selectedList.findIndex((el) => el.id === item.id )
    if(i === -1)
    {
      selectedList.push(item);
      this.setState({
        filterList: [],
        selectedList: selectedList
      });
    }
    else
    {
      this.setState({
        filterList: []
      });
    }
    console.log(this.state.selectedList);
    return;
  }
  handleOnBlur(){
    setTimeout(function(){
      this.setState({
        filterList: []
      });
    }.bind(this), 500);
  }
  renderSelectedList(){
    let selectedList = this.state.selectedList;
    if(selectedList.length > 0)
      return (
        <Paper style={styles.wrapper}>
          {selectedList.map((item) => 
            <Chip
              key={item.id}
              onRequestDelete={() => this.handleRequestDelete(item.id)}
              style={styles.chip}
            >
              {item.name}
            </Chip>
          )}
        </Paper>
      );
  }
  handleRequestDelete(id){
    let selectedList = this.state.selectedList;
    let newSelectedList = selectedList.filter(el => el.id !== id);
    this.setState({
      selectedList: newSelectedList
    });
    console.log(newSelectedList);
  }

  difference(setA, setB){
    var difference = new Set(setA);
    for (var elem of setB) {
        difference.delete(elem);
    }
    return difference;
  }
  submit(){
    let before = new Set(this.props.selectedList);
    let after = new Set(this.state.selectedList);

    let added = new Set();
    added = this.difference(after, before);

    let removed = new Set();
    removed = this.difference(before, after);

    let addedArr = Array.from(added);
    let removedArr = Array.from(removed);


    console.log('added', addedArr);
    console.log('removed', removedArr);
  }
  render(){
    return (
      <div>
         <TextField
            hintText="Nhập từ khóa tìm kiếm"
            fullWidth={true}
            onChange={(e) => {this.handleOnChange(e.target.value)}}
            onTouchTap={(e) => {this.handleOnChange(e.target.value)}}
            onBlur={this.handleOnBlur}
          />

          {(this.state.filterList.length > 0)?
            <Paper>
              <List>
                {this.state.filterList.map((item) => 
                  <ListItem  
                    key={item.id} 
                    primaryText={item.name}
                    onTouchTap={()=> {this.handleOnClick(item)}} 
                  />
                )}
              </List>
            </Paper>
            :''
          }

          {this.renderSelectedList()}

      </div>
    );
  }
}