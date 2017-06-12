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
                    <Route path={"/staff/pageA"} component={PageA} />
                    <Route path={"/staff/pageB"} component={PageB} />
                </Route>
        	</Router>
		);
	}
}
export default App;