import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';
const colors = [
		'#FF6384',
		'#36A2EB',
		'#FFCE56',
		'#001f3f',
		'#0074D9',
		'#7FDBFF',
		'#39CCCC',
		'#3D9970',
		'#2ECC40',
		'#01FF70',
		'#FFDC00',
		'#FF851B',
		'#FF4136',
		'#85144b',
		'#F012BE',
		'#B10DC9',
		'#111111',
		'#AAAAAA',
		'#DDDDDD'];

export default class App extends Component{
	constructor(props){
		super(props);

		this.state = {
			signData: [],
			symptomData: [],
			activityData: []
		};
	}
	componentDidMount(){
		//Get data
		fetch('/admin/chart/get-data', {
				credentials: 'same-origin'
			})
			.then(function(response) {
				return response.json()
			}).then(function(obj) {
				//Data Response
				//console.log('Data Response: ', obj);
				this.setState({
					signData: obj.signData,
					symptomData: obj.symptomData,
					activityData: obj.activityData
				});
			}.bind(this))
			.catch(function(ex) {
				//Log Error
				console.log('parsing failed', ex)
			});
	}
	render(){
		let signChartData = {
			labels: this.state.signData[1],
			datasets: [{
				data: this.state.signData[3],
				backgroundColor: colors,
				hoverBackgroundColor: colors
			}]
		};
		let symptomChartData = {
			labels: this.state.symptomData[1],
			datasets: [{
				data: this.state.symptomData[3],
				backgroundColor: colors,
				hoverBackgroundColor: colors
			}]
		};
		let activityChartData = {
			labels: this.state.activityData[1],
			datasets: [{
				data: this.state.activityData[3],
				backgroundColor: colors,
				hoverBackgroundColor: colors
			}]
		};
		return (
			<div>
				<div className="row">
					<div className="col-md-6">
						<h4>Thống kê các triệu chứng cơ năng</h4>
						<Doughnut data={signChartData}/>
						{(this.state.signData !== [])?
							<p style={{textAlign: 'center'}}>Thống kê trên {this.state.signData[2]} trường hợp </p>
							:''
						}
					</div>
					<div className="col-md-6">
						<h4>Thống kê các triệu chứng thực thể</h4>
						<Doughnut data={symptomChartData}/>
						{(this.state.symptomData !== [])?
							<p style={{textAlign: 'center'}}>Thống kê trên {this.state.symptomData[2]} trường hợp </p>
							:''
						}
					</div>
				</div>
				<div className="row>">
					<div className="col-md-6 col-md-offset-3">
						<h4>Thống kê các hoạt động điều trị trên những bệnh nhân có tiến triển</h4>
						<Doughnut data={activityChartData}/>
					</div>
				</div>
			</div>
		);
	}
}
