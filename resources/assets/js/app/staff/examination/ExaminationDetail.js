import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

export default class ExaminationDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      maxValue: 1
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(){
    let currentValue = this.state.value;
    this.setState({
      value: (this.state.value === this.state.maxValue)?0:currentValue+1
    });
  };

  render() {
    return (
      <div>
        <Tabs
          value={this.state.value}
          inkBarStyle={{display: 'none'}}
          tabItemContainerStyle={{display: 'none'}}
        >
          <Tab value={0}>
            <div>
              <h2 style={styles.headline}>Mã bệnh án: {this.props.params.record_id}</h2>
            </div>
          </Tab>
          <Tab value={1}>
            <div>
              <h2 style={styles.headline}>Controllable Tab B</h2>
              <p>
                This is another example of a controllable tab. Remember, if you
                use controllable Tabs, you need to give all of your tabs values or else
                you wont be able to select them.
              </p>
            </div>
          </Tab>
        </Tabs>
        <div>
            <FlatButton 
              onClick={this.handleChange} 
              label="Tiếp tục" 
              primary={true} 
            />
        </div>
      </div>
    );
  }
}