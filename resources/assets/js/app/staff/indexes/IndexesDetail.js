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
	render(){
		return(
			<div>
			<p>Kết quả xét nghiệm của bệnh án mã {this.props.params.record_id}</p>
			{(this.state.isLoading)?
					<div style={{'margin': '20% auto', 'width': '0'}}>
						<CircularProgress size={80} thickness={5}/>
					</div>
					:
					<TextInputs indexes={this.state.indexes} />
			}
			</div>
		)
	}
}
export default IndexesDetail;