import React, {Component} from 'react';
import {Router, Route, browserHistory, IndexRoute} from "react-router";

import Master from "./layouts/Master";
import PageA from "./PageA";
import PageB from "./PageB";
import Patients from './patients/App';
import PatientDetail from './patients/Detail';
import Records from './records/App';
import Indexes from './indexes/App';
import IndexesDetail from './indexes/IndexesDetail';
import Examination from './examination/App';
import ExaminationDetail from './examination/ExaminationDetail';
import Plants from './plants/App';
import CreatePlant from './plants/Create';
import ListPlant from './plants/ListPlant';
import Daily from './daily/App';
import Follow from './daily/Follow';
import Care from './care/App';
import Caring from './care/Caring';
class App extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<Router history={browserHistory}>
                <Route path={"/staff"} component={Master} >
                    <IndexRoute component={Records} />
                    <Route path={"/staff/patient"} component={Patients} />
                    <Route path={"/staff/patient/:patient_id"} component={PatientDetail} />
                    <Route path={"/staff/record"} component={Records} />
                    <Route path={"/staff/index"} component={Indexes} />
                    <Route path={"/staff/index/:record_id"} component={IndexesDetail} />
                    <Route path={"/staff/examination"} component={Examination} />
                    <Route path={"/staff/examination/:record_id"} component={ExaminationDetail} />
                    <Route path={"/staff/plant"} component={Plants} />
                    <Route path={"/staff/plant/create/:patient_id"} component={CreatePlant} />
                    <Route path={"/staff/plant/list/:patient_id"} component={ListPlant} />
                    <Route path={"/staff/daily"} component={Daily} />
                    <Route path={"/staff/follow/:patient_id"} component={Follow} />
                    <Route path={"/staff/care"} component={Care} />
                    <Route path={"/staff/caring/:patient_id"} component={Caring} />
                    <Route path={"/staff/pageA"} component={PageA} />
                    <Route path={"/staff/pageB"} component={PageB} />
                </Route>
        	</Router>
		);
	}
}
export default App;