import React from 'react';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';

const styles = {
  checkbox: {
    marginBottom: 16,
  },
};

export default class List extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      list: [
        {id: 1, name: 'A'},
        {id: 2, name: 'Aa'},
        {id: 3, name: 'Aaa'},
        {id: 4, name: 'a'},
        {id: 5, name: 'aA'},
        {id: 6, name: 'B'},
        {id: 7, name: 'c'},
        {id: 8, name: 'd'},
      ],
      filterList: []
    };

    this.handleOnBlur = this.handleOnBlur.bind(this);
  }
  handleOnBlur(e){
    let str = e.target.value;
    let newList = this.state.list.filter(el => el.name.toLowerCase().indexOf(str.toLowerCase()) > -1);
    this.setState({
      filterList: newList
    });
  }
  componentDidMount(){
    this.setState({
      filterList: this.state.list
    });
  }
  render(){
    return (
      <div style={{width: '80%', margin: '0 auto'}}>
        <TextField
          hintText="Full width"
          fullWidth={true}
          onChange={this.handleOnBlur}
        />
        {this.state.filterList.map((item)=>{
          return(
            <Checkbox
              key={item.id}
              label={item.name}
              style={styles.checkbox}
            />
          );
        })}
      </div>
    );
  }
}