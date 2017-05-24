import React, {Component} from 'react';
import {Router, Route, browserHistory, IndexRoute} from "react-router";

import Master from "./layouts/Master";
import PageA from "./PageA";
import PageB from "./PageB";
import Patients from './patients/App';

class App extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<Router history={browserHistory}>
                <Route path={"/staff"} component={Master} >
                    <IndexRoute component={Patients} />
                    <Route path={"/staff/patient"} component={Patients} />
                    <Route path={"/staff/pageA"} component={PageA} />
                    <Route path={"/staff/pageB"} component={PageB} />
                </Route>
        	</Router>
		);
	}
}
export default App;