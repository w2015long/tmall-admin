
import React,{Component} from 'react';
import {Switch,Route} from "react-router-dom"
import OrderList from './list.js'
import OrderSave from './save.js'
import OrderDetail from './detail.js'

class Order extends Component{

	render(){
		return (
			<Switch>
				<Route path="/order/save/:orderNo?" component={OrderSave}/>
				<Route path="/order/detail/:OrderId?" component={OrderDetail}/>
				<Route path="/order/" component={OrderList}/>
			</Switch>
		)
	}
}

export default Order