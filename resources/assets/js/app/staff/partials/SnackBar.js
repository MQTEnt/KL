import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';

export default class SnackBar extends React.Component {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Snackbar
          open={this.props.open}
          message={this.props.noti}
          autoHideDuration={4000}
          onRequestClose={this.props.onRequestClose}
        />
      </div>
    );
  }
}