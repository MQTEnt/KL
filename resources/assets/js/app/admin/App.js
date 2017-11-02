import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';
import {Bar} from 'react-chartjs-2';
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
			activityData: [],
			agePatient: {},
			genderPatient: {}
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
				let age = [];
		        let count = [];
		        obj.agePatient.map(item => {
		          age.push(item.age);
		          count.push(item.count);
		        });
		        console.log(count);
		        console.log(age);
				this.setState({
					signData: obj.signData,
					symptomData: obj.symptomData,
					activityData: obj.activityData,
					agePatient: {age: age, count: count},
					genderPatient: {male: obj.malePatient, female: obj.femalePatient, other: obj.otherPatient}
				});
			}.bind(this))
			.catch(function(ex) {
				//Log Error
				console.log('parsing failed', ex)
			});
	}
	render(){
		let dataBar = {
	      labels: this.state.agePatient.age,
	      datasets: [{
	          label: 'Số lượng',
	          type:'line',
	          data: this.state.agePatient.count,
	          fill: false,
	          borderColor: '#EC932F',
	          backgroundColor: '#EC932F',
	          pointBorderColor: '#EC932F',
	          pointBackgroundColor: '#EC932F',
	          pointHoverBackgroundColor: '#EC932F',
	          pointHoverBorderColor: '#EC932F',
	          yAxisID: 'y-axis-1'
	        }]
	    };

	    let optionsBar = {
	      responsive: true,
	      tooltips: {
	        mode: 'label'
	      },
	      elements: {
	        line: {
	          fill: false
	        }
	      },
	      scales: {
	        xAxes: [
	          {
	            display: true,
	            gridLines: {
	              display: false
	            },
	            labels: {
	              show: true
	            }
	          }
	        ],
	        yAxes: [
	          {
	            type: 'linear',
	            display: false,
	            position: 'left',
	            id: 'y-axis-1',
	            gridLines: {
	              display: false
	            },
	            labels: {
	              show: false
	            }
	          }
	        ]
	      }
	    };

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
				<div className="row" style={{marginBottom: 100}}>
					<div className="col-md-6">
						<h4>Thống kê các triệu chứng thực thể</h4>
						<Doughnut data={signChartData}/>
						{(this.state.signData !== [])?
							<p style={{textAlign: 'center'}}>Thống kê trên {this.state.signData[2]} trường hợp </p>
							:''
						}
					</div>
					<div className="col-md-6">
						<h4>Thống kê các triệu chứng cơ năng</h4>
						<Doughnut data={symptomChartData}/>
						{(this.state.symptomData !== [])?
							<p style={{textAlign: 'center'}}>Thống kê trên {this.state.symptomData[2]} trường hợp </p>
							:''
						}
					</div>
				</div>
				<div className="row" style={{marginBottom: 100}}>
					<div className="col-md-6 col-md-offset-3">
						<h4>Thống kê các hoạt động điều trị trên những bệnh nhân có tiến triển</h4>
						<Doughnut data={activityChartData}/>
					</div>
				</div>
				<div className="row" style={{marginBottom: 100}}>
					<div className="col-md-8 col-md-offset-2">
						<h4>Số lượng bệnh nhân tính theo độ tuổi</h4>
						<Bar
				          data={dataBar}
				          options={optionsBar}
				        />
					</div>
				</div>
				<div className="row" style={{marginBottom: 100}}>
					<div className="col-md-8 col-md-offset-2">
						<h3>Số lượng: </h3>
						<h4><i className="fa fa-male"></i> Nam: {this.state.genderPatient.male}</h4>
						<h4><i className="fa fa-female"></i> Nữ: {this.state.genderPatient.female}</h4>
					</div>
				</div>
			</div>
		);
	}
}
