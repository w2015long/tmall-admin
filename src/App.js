import React,{Component,Fragment} from 'react';
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch
} from "react-router-dom"

import {getUserName} from 'util'

import Login from './pages/login'
import Home from './pages/home'

import './App.css';


class App extends Component{
	constructor(props){
		super(props);
	}


	render() {
		const ProtectRoute = ({component:Home,...rest})=>(
			<Route
				{...rest}
				render={(props)=>(
					getUserName()
					? <Home {...props} />
					: <Redirect to="/login" />
				)}
			 />			
		)

		const LoginRoute = ({component:Component,...rest})=>(
			<Route
				render={()=>(
					getUserName()
					? <Redirect to="/" />
					: <Component {...rest} />
				)}
			/>

		)
		return(
			<Router>
				<div className="App">
					<Switch>
						<ProtectRoute exact path="/" component={Home} />
						<LoginRoute path="/login" component={Login} />
					</Switch>		
				</div>
			</Router>
		) 
	}
}


export default App