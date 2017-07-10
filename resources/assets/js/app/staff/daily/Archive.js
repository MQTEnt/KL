import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';

export default class Archive extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			patient: {},
			days: [],
			isLoading: true
		}
	}
	componentDidMount(){
		setTimeout(function(){
			//Get data
			fetch('/daily/'+this.props.params.patient_id, {
				credentials: 'same-origin'
			})
			.then(function(response) {
				return response.json()
			}).then(function(obj) {
				//Data Response
				//console.log('Data Response: ', obj);
				this.setState({
			  		patient: obj.patient,
			  		days: obj.days,
			  		isLoading: false
				});
			}.bind(this))
			.catch(function(ex) {
				//Log Error
				console.log('parsing failed', ex)
			});
		}.bind(this), 1500);
	}
	renderDate(date){
	    let dateStr = date.split('-');
	    let str = 'Ngày '+dateStr[2]+' tháng '+dateStr[1]+' năm '+dateStr[0];
	    return str;
	}
	renderTimeline(){
	let days = this.state.days;
    let i = 0;
    return (
	    	<div className="main-timeline">
		        {days.map((day)=>{
		            return (
		                <div key={day.id} className="timeline">
		                    <div className="timeline-icon"></div>
		                    <div className={(i++%2===0)?'timeline-content':'timeline-content right'}>
		                        <span className="date"><i className="fa fa-calendar-check-o"></i> {this.renderDate(day.date)}</span>
		                        
		                        {(day.activities.length > 0)?
		                            <p><b><i className="fa fa-check"></i> Những hoạt động đã thực hiện:</b></p>
		                            :''
		                        }
		                        <ul style={{listStyleType: 'none'}}>
		                            {day.activities.map(item => {
		                                return <li key={item.activity.id}>{item.activity.name}</li>
		                            })}
		                        </ul>
		                        <p><b><i className="fa fa-star"></i> Đánh giá:</b></p>
		                        <p className="description">
		                            {day.rate}
		                        </p>
		                    </div>
		                </div>
		            );
		        })}
		    </div>
	    )
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
		          		<h3 style={{textAlign: 'center'}}><i className="fa fa-history"></i> Lịch sử theo dõi điều trị</h3>
						{this.renderTimeline()}
					</Paper>
				}
			</div>
		);
	}
}