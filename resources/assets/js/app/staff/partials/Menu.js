import React from 'react';
import {Link} from "react-router";
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ImageDehaze from 'material-ui/svg-icons/image/dehaze';
import SocialPeople from 'material-ui/svg-icons/social/people';
import ActionAssignment from 'material-ui/svg-icons/action/assignment'
const style = {
  icon: {
    position: 'relative',
    top: '5px'
  },
  menuItem: {
    'fontFamily': 'Lato'
  },
  link: {
    'textDecoration': 'none'
  },
  active: {
    'textDecoration': 'underline',
    'fontWeight': 'bold'
  },
  floatButton: {
    margin: 0,
    top: 'auto',
    left: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed'
  }
}
export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};

    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleToggle() {
    this.setState({open: !this.state.open});
  }

  handleClose() {
    this.setState({open: false});
  }

  render() {
    return (
      <div>
        <FloatingActionButton style={style.floatButton} onTouchTap={this.handleToggle}>
          <ImageDehaze />
        </FloatingActionButton>
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <Link style={style.link} activeStyle={style.active} to={"/staff/patient"}>
            <MenuItem style={style.menuItem} onTouchTap={this.handleClose}>
              <SocialPeople style={style.icon}/> Quản lý bệnh nhân
            </MenuItem>
          </Link>
          <Link style={style.link} activeStyle={style.active} to={"/staff/record"}>
            <MenuItem style={style.menuItem} onTouchTap={this.handleClose}>
              <ActionAssignment style={style.icon}/> Quản lý bệnh án
            </MenuItem>
          </Link>
          <Link style={style.link} activeStyle={style.active} to={"/staff/pageA"}>
            <MenuItem style={style.menuItem} onTouchTap={this.handleClose}>
              Trang A
            </MenuItem>
          </Link>
          <Link style={style.link} activeStyle={style.active} to={"/staff/pageB"}>
            <MenuItem style={style.menuItem} onTouchTap={this.handleClose}>
              Trang B
            </MenuItem>
          </Link>
        </Drawer>
      </div>
    );
  }
}