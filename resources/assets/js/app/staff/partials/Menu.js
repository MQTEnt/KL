import React from 'react';
import {Link} from "react-router";
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ImageDehaze from 'material-ui/svg-icons/image/dehaze';
import SocialPeople from 'material-ui/svg-icons/social/people';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import ActionInvertColors from 'material-ui/svg-icons/action/invert-colors';
import MapsLocalHospital from 'material-ui/svg-icons/maps/local-hospital';
import ActionDateRange from 'material-ui/svg-icons/action/date-range';
import ActionDoneAll from 'material-ui/svg-icons/action/done-all';
import PlacesSpa from 'material-ui/svg-icons/places/spa'
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
              <ActionAssignment style={style.icon}/> Quản lý khám bệnh
            </MenuItem>
          </Link>
          <Link style={style.link} activeStyle={style.active} to={"/staff/index"}>
            <MenuItem style={style.menuItem} onTouchTap={this.handleClose}>
              <ActionInvertColors style={style.icon}/> Chỉ số xét nghiệm
            </MenuItem>
          </Link>
          <Link style={style.link} activeStyle={style.active} to={"/staff/examination"}>
            <MenuItem style={style.menuItem} onTouchTap={this.handleClose}>
              <MapsLocalHospital style={style.icon}/> Khám bệnh
            </MenuItem>
          </Link>
          <Link style={style.link} activeStyle={style.active} to={"/staff/plant"}>
            <MenuItem style={style.menuItem} onTouchTap={this.handleClose}>
              <ActionDateRange style={style.icon}/> Kế hoạch điều trị
            </MenuItem>
          </Link>
          <Link style={style.link} activeStyle={style.active} to={"/staff/daily"}>
            <MenuItem style={style.menuItem} onTouchTap={this.handleClose}>
              <ActionDoneAll style={style.icon}/> Theo dõi điều trị
            </MenuItem>
          </Link>
          <Link style={style.link} activeStyle={style.active} to={"/staff/care"}>
            <MenuItem style={style.menuItem} onTouchTap={this.handleClose}>
              <PlacesSpa style={style.icon}/> Theo dõi chăm sóc
            </MenuItem>
          </Link>
        </Drawer>
      </div>
    );
  }
}