import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import ActionSearch from 'material-ui/svg-icons/action/search';
import IconButton from 'material-ui/IconButton';
/**
 * The input is used to create the `items`, so the input always matches three entries.
 */
class Search extends Component {
  constructor(props){
    super(props);

    this.state = {
      items: [],
      selectedItem: ''
    };
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleOnClickItem = this.handleOnClickItem.bind(this);
  }
  handleUpdateInput(value){
    if(value.length === 1)
    {
      let api = this.props.apiSearchGroup;
      //Get data from server
      fetch(api+'?q='+value, {
          credentials: 'same-origin'
        })
        .then(function(response) {
          return response.json()
        }).then(function(obj) {
          //Data Response
          //console.log('Data Response: ', obj);
          this.setState({
            items: obj
          });
        }.bind(this))
        .catch(function(ex) {
          //Log Error
          console.log('parsing failed', ex);
      });
    }

    this.setState({
      selectedItem: value
    });
  };
  handleOnClickItem(){
    let api = this.props.apiSearch;
    let searchKey = this.state.selectedItem;

    let regex = /^\s+$/;
    if(regex.test(searchKey))
      searchKey = '';
    let url = api+'?q='+searchKey;

    this.props.setSearchKey(searchKey);
    this.props.getList(url);
  }
  render() {
    return (
      <div style={{'textAlign': 'right', 'width': '95%', 'margin': '0 auto'}}>
        <AutoComplete
          hintText={this.props.hintText}
          dataSource={this.state.items}
          onUpdateInput={(this.props.autoComplete)?this.handleUpdateInput:(value)=>{this.setState({selectedItem: value})}}
          floatingLabelText="Tìm kiếm"
        />
        <IconButton tooltip="Bấm để tìm kiếm" onClick={this.handleOnClickItem}>
          <ActionSearch/>
        </IconButton>
      </div>
    );
  }
}
export default Search;