import React from 'react';
import SnackBar from '../partials/SnackBar';
import Plant from './Plant';
import Paper from 'material-ui/Paper';
import MiniNav from '../partials/MiniNav';
import CircularProgress from 'material-ui/CircularProgress';

export default class ListPlant extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			plants: [],
			patient: {},
			openSnackBar: false,
			notiSnackBar: '',
			loadingProgress: true
		};
	}
	getList(){
		fetch('/plant/'+this.props.params.patient_id, {
				credentials: 'same-origin'
			})
			.then(function(response) {
				return response.json()
			}).then(function(obj) {
				if(obj.stat === 1)
				{
					this.setState({
						plants: obj.plants,
						patient: obj.patient,
						loadingProgress: false
					});
				}
			}.bind(this))
			.catch(function(ex) {
				//Log Error
				console.log('parsing failed', ex)
			});
	}
	componentDidMount(){
		let urlParams = new URLSearchParams(this.props.location.search);
		if(urlParams.get('created'))
		{
			this.setState({
				openSnackBar: true,
				notiSnackBar: 'Thêm mới thành công kế hoạch điều trị'
			});
		}
		setTimeout(function(){
			this.getList();
		}.bind(this), 1500);
	}
	renderPlantList(){
		if(this.state.plants.length > 0)
			return (
						<div>
							{
								this.state.plants.map(plant => (
									<Plant
										key={plant.id}
										id={plant.id}
										date={[plant.fromDate, plant.toDate]}
										activityList={plant.plant_activity}
									/>
								))
							}
						</div>
					);
		else
			return (<p><b>Hiện chưa có kế hoạch điều trị cho bệnh nhân này</b></p>);
	}
	render(){
		let patient = this.state.patient;
		let nav = [
			{name: 'Danh sách bệnh nhân', url: '/staff/plant'},
			{name: 'Lập kế hoạch điều trị', url: '/staff/plant/create/'+this.props.params.patient_id}
		];
		return (
			<div style={{width: '80%', margin: '0 auto'}}>
				<MiniNav nav={nav} />
				<h3 style={{textAlign: 'center'}}>Danh sách kế hoạch điều trị</h3>
				<Paper zDepth={2}>
					<ul style={{margin: 20, padding: 10, textAlign: 'left'}}>
		                <li>Tên bệnh nhân: <b>{patient.name}</b></li>
		                <li>Ngày sinh: <b>{patient.dob}</b></li>
		                <li>Địa chỉ: <b>{patient.address}</b></li>
		                <li>Nghề nghiệp: <b>{patient.job}</b></li>
		            </ul>
				</Paper>
				<SnackBar
					open={this.state.openSnackBar}
					noti={this.state.notiSnackBar}
					onRequestClose={() => this.setState({openSnackBar: false})}
				/>
				{(!this.state.loadingProgress)?
					this.renderPlantList()
					:''
				}
				{
		          (this.state.loadingProgress)?
		          <div style={{'margin': '0 auto', 'width': '0'}}>
		            <CircularProgress size={80} thickness={5}/>
		          </div>
		          :''
		        }
			</div>
		);
	}
}