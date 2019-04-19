
import React,{Component} from 'react';
import {Switch,Route} from "react-router-dom"
import CategoryList from './list.js'
import CategoryAdd from './add.js'

class Product extends Component{

	render(){

		return (
			<Switch>
				<Route path="/product/add" component={ProductSave}/>
				<Route path="/product/:pid?" component={ProductList}/>
			</Switch>
		)
	}
}

export default Product