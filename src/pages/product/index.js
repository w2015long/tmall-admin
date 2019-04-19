
import React,{Component} from 'react';
import {Switch,Route} from "react-router-dom"
import ProductList from './list.js'
import ProductSave from './save.js'

class Product extends Component{

	render(){

		return (
			<Switch>
				<Route path="/product/save" component={ProductSave}/>
				<Route path="/product/" component={ProductList}/>
			</Switch>
		)
	}
}

export default Product