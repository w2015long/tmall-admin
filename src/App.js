import React,{Component,Fragment} from 'react';
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch
} from "react-router-dom"

import {getUserName} from 'util'

import Login from 'pages/login'
import Home from 'pages/home'
import User from 'pages/user'
import Category from 'pages/category'
import Product from 'pages/product'
import Err from 'common/err'

import './App.css';


class App extends Component{

	render() {
		const ProtectRoute = ({component:Component,...rest})=>(
			<Route
				{...rest}
				render={(props)=>(
					getUserName()
					? <Component {...props} />
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
			<Router forceRefresh={true}>
				<div className="App">
					<Switch>
						<ProtectRoute exact path="/" component={Home} />
						<ProtectRoute path="/user" component={User} />
						<ProtectRoute path="/category" component={Category} />
						<ProtectRoute path="/product" component={Product} />
						<LoginRoute path="/login" component={Login} />
						<Route component={Err} />
					</Switch>		
				</div>
			</Router>
		) 
	}
}


export default App