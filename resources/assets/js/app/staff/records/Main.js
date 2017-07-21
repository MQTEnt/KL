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
    this.refreshListRecord = this.refreshListRecord.bind(this);
  }

  handleChange(value){
    this.setState({
      value: value,
    });
  };
  refreshListRecord(){
    this.listRecord.refresh();
  }
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
          <List
            patients={this.props.patients}
            getPatients={this.props.getPatients}
            current_page={this.props.current_page}
            last_page={this.props.last_page}
            searchKey={this.props.searchKey}
            setSearchKey={this.props.setSearchKey}
            isLoadingPatients={this.props.isLoadingPatients}
            refreshListRecord={this.refreshListRecord}
          />
        </Tab>
        <Tab 
          label="Danh sách khám bệnh chung" 
          value={1}
          icon={<ActionAssignment/>}
        >
          <ListRecord
            ref={(ref)=>this.listRecord = ref}
          />
        </Tab>
      </Tabs>
    );
  }
}

export default Main;