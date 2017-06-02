import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import List from './List';
import Create from './Create'
import SocialPeople from 'material-ui/svg-icons/social/people';
import SocialPersonAdd from 'material-ui/svg-icons/social/person-add';
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
    this.changeAlert = this.handleChange.bind(this);
  }

  handleChange(value){
    this.setState({
      value: value,
    });
  };
  changeAlert(text){
    this.setState({
      alert: text
    });
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
          <p>{this.state.alert}</p>
          <List
            patients={this.props.patients}
            handleUpdate={this.props.handleUpdate}
            handleDelete={this.props.handleDelete}
            getPatients={this.props.getPatients}
            current_page={this.props.current_page}
            last_page={this.props.last_page}
            searchKey={this.props.searchKey}
            setSearchKey={this.props.setSearchKey}
            isLoading={this.props.isLoading}
          />
        </Tab>
        <Tab 
          label="Thêm mới bệnh nhân" 
          value={1}
          icon={<SocialPersonAdd/>}
        >
          <Create
            handleAdd={this.props.handleAdd}
            handleChangeTab={this.handleChange}
            handleChangeAlert={this.changeAlert}
          />
        </Tab>
      </Tabs>
    );
  }
}

export default Main;