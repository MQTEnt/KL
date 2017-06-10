import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import TextInputs from '../partials/TextInputs';
class IndexesDetail extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			isLoading: true,
			indexes: []
		}
		this.getIndexes = this.getIndexes.bind(this);
		this.updateIndexes = this.updateIndexes.bind(this);
	}
	getIndexes(url){
		setTimeout(function(){
				//Get data
			fetch(url, {
				credentials: 'same-origin'
			})
			.then(function(response) {
				return response.json()
			}).then(function(obj) {
				//Data Response
				console.log('Data Response: ', obj);

				//Do something ...
				this.setState({
					isLoading: false,
					indexes: obj
				})
			}.bind(this))
			.catch(function(ex) {
				//Log Error
				console.log('parsing failed', ex)
			});
		}.bind(this), 1500);
	}
	componentDidMount(){
		let record_id = this.props.params.record_id;
		this.getIndexes('/index/'+record_id);
	}
	updateIndexes(indexes){
		this.setState({
			'indexes': indexes
		})
	}
	render(){
		return(
			<div>
			<p style={{textAlign: 'center'}}>Kết quả xét nghiệm của bệnh án mã <b>{this.props.params.record_id}</b></p>
			{(this.state.isLoading)?
					<div style={{'margin': '20% auto', 'width': '0'}}>
						<CircularProgress size={80} thickness={5}/>
					</div>
					:
					<TextInputs 
						indexes={this.state.indexes} 
						api={'/index/'+this.props.params.record_id}
						recordId={this.props.params.record_id}
						updateIndexes = {this.updateIndexes}
					/>
			}
			</div>
		)
	}
}
export default IndexesDetail;