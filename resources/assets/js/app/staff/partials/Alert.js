import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

/**
 * Alerts are urgent interruptions, requiring acknowledgement, that inform the user about a situation.
 */
export default class Alert extends React.Component {
  constructor(props)
  {
    super(props);
  }

  render() {
    const actions = [
      <FlatButton
        label="Hủy"
        primary={true}
        onTouchTap={this.props.alertCancel}
      />,
      <FlatButton
        label="Chấp nhận"
        primary={true}
        onTouchTap={this.props.alertAccept}
      />,
    ];

    return (
      <div>
        <Dialog
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={this.props.alertCancel}
        >
          {this.props.noti}
        </Dialog>
      </div>
    );
  }
}