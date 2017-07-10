import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import Timeline from './Timeline';
import InfiniteScroll from 'react-infinite-scroll-component';
export default class Archive extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			patient: {},
			days: [],
			isLoading: true,
			nextUrl: ''
		}
		this.next = this.next.bind(this);
	}
	componentDidMount(){
		setTimeout(function(){
			//Get data
			fetch('/care/'+this.props.params.patient_id, {
				credentials: 'same-origin'
			})
			.then(function(response) {
				return response.json()
			}).then(function(obj) {
				//Data Response
				//console.log('Data Response: ', obj);
				let days = [];
				obj.days.data.map((day)=>
		            days.push(<Timeline key={day.id} day={day} index={days.length}/>)
		        )
				this.setState({
			  		patient: obj.patient,
			  		days: days,
			  		nextUrl: obj.days.next_page_url,
			  		isLoading: false
				});
			}.bind(this))
			.catch(function(ex) {
				//Log Error
				console.log('parsing failed', ex)
			});
		}.bind(this), 1500);
	}
	next(){
		if(this.state.nextUrl === null)
			return;
		//else
		fetch(this.state.nextUrl, {
				credentials: 'same-origin'
			})
		.then(function(response) {
			return response.json()
		}).then(function(obj) {
			//Data Response
			//console.log('Data Response: ', obj);
			let days = [];
			obj.days.data.map((day)=>
	            days.push(<Timeline key={day.id} day={day} index={days.length}/>)
	        )
			setTimeout(() => {
		      this.setState({
		      	days: this.state.days.concat(days),
		      	nextUrl: obj.days.next_page_url
		      });
		    }, 1000);
		}.bind(this))
		.catch(function(ex) {
			//Log Error
			console.log('parsing failed', ex)
		});
	}
	renderLoading(){
		if(this.state.nextUrl !== null){
			return <h4 style={{textAlign: 'right', paddingRight: 10}}><CircularProgress size={25} thickness={3}/>...Đang tải</h4>
		}
		else
			return '';
	}
	render(){
		let patient = this.state.patient;
		return (
			<div>
				<Paper zDepth={2}>
	              <ul style={{margin: 20, padding: 10, textAlign: 'left'}}>
	                <li>Tên bệnh nhân: <b>{patient.name}</b></li>
	                <li>Ngày sinh: <b>{patient.dob}</b></li>
	                <li>Địa chỉ: <b>{patient.address}</b></li>
	                <li>Nghề nghiệp: <b>{patient.job}</b></li>
	              </ul>
	            </Paper>
				{(this.state.isLoading)?
					<div style={{'margin': '20% auto', 'width': '0'}}>
		            	<CircularProgress size={80} thickness={5}/>
		          	</div>
		          	:
		          	<Paper zDepth={2}>
		          		<h3 style={{textAlign: 'center'}}><i className="fa fa-history"></i> Lịch sử theo dõi chăm sóc</h3>
						<div className="main-timeline">
					        <InfiniteScroll
					          next={this.next}
					          hasMore={true}
					          loader={this.renderLoading()}>
					          {this.state.days}
					        </InfiniteScroll>
					    </div>
					</Paper>
				}
			</div>
		);
	}
}