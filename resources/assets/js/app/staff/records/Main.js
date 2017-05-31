import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import List from './List';
import SocialPeople from 'material-ui/svg-icons/social/people';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import ListRecord from './ListRecord';
const style = {
  tabs: {
    marginBottom: 50
  }
};

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value){
    this.setState({
      value: value,
    });
  };
  render() {
    return (
      <Tabs
        value={this.state.value}
        onChange={this.handleChange}
        style={style.tabs}
      >
        <Tab 
          label="Danh sách bệnh nhân" 
          value={0}
          icon={<SocialPeople/>}
        >
          <p>{this.state.alert}</p>
          <List
            patients={this.props.patients}
            getPatients={this.props.getPatients}
            current_page={this.props.current_page}
            last_page={this.props.last_page}
            qSearch={this.props.qSearch}
            isLoadingPatients={this.props.isLoadingPatients}
          />
        </Tab>
        <Tab 
          label="Danh sách bệnh án" 
          value={1}
          icon={<ActionAssignment/>}
        >
          <ListRecord/>
        </Tab>
      </Tabs>
    );
  }
}

export default Main;