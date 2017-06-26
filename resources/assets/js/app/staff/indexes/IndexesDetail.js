import React from 'react';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
import TextInputs from '../partials/TextInputs';
class IndexesDetail extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			isLoading: true,
			indexes: [],
			patient: {},
			record: {}
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
					indexes: obj.indexes,
					patient: obj.patient,
					record: obj.record
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
		let patient = this.state.patient;
		let record = this.state.record;
		return(
			<div style={{marginBottom: 20}}>
			<h3 style={{textAlign: 'center'}}>Kết quả xét nghiệm</h3>
			<Paper style={{width: '80%', margin: '0 auto'}} zDepth={2}>
				{(!this.state.isLoading)?
					<ul style={{margin: 20, padding: 10, textAlign: 'left'}}>
		                <li>Tên bệnh nhân: <b>{patient.name}</b></li>
		                <li>Ngày sinh: <b>{patient.dob}</b></li>
		                <li>Địa chỉ: <b>{patient.address}</b></li>
		                <li>Nghề nghiệp: <b>{patient.job}</b></li>
		                <li>Ngày khám: <b>{record.created_at.split(' ')[0]}</b></li>
		            </ul>
		            :''
	        	}
			</Paper>

			{(this.state.isLoading)?
				<div style={{'margin': '20% auto', 'width': '0'}}>
					<CircularProgress size={80} thickness={5}/>
				</div>
				:
				<Paper style={{width: '80%', margin: '0 auto'}} zDepth={2}>
					<TextInputs 
						indexes={this.state.indexes} 
						api={'/index/'+this.props.params.record_id}
						recordId={this.props.params.record_id}
						updateIndexes = {this.updateIndexes}
					/>
				</Paper>
			}
			</div>
		)
	}
}
export default IndexesDetail;