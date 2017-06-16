import React from 'react';
import Chip from 'material-ui/Chip';

/**
 * An example of rendering multiple Chips from an array of values. Deleting a chip removes it from the array.
 * Note that since no `onTouchTap` property is defined, the Chip can be focused, but does not gain depth
 * while clicked or touched.
 */
export default class ChipList extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.selectedItem;
    this.styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    };
  }

  handleRequestDelete(key){
    this.selectedItem = this.state.selectedItem;
    const chipToDelete = this.selectedItem.map((chip) => chip.key).indexOf(key);
    this.selectedItem.splice(chipToDelete, 1);
    this.setState({selectedItem: this.selectedItem});
  };

  renderChip(data) {
    return (
      <Chip
        key={data.key}
        onRequestDelete={() => this.handleRequestDelete(data.key)}
        style={this.styles.chip}
      >
        {data.label}
      </Chip>
    );
  }

  render() {
    return (
      <div style={this.styles.wrapper}>
        {this.state.selectedItem.map(this.renderChip, this)}
      </div>
    );
  }
}