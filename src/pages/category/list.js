
import React,{Component} from 'react';
import {Link} from "react-router-dom"
import {actionCreator} from './store/'
import AdminLayout from 'common/layout'
import {Breadcrumb } from 'antd';

class CategoryList extends Component{
	componentDidMount(){

	}	
	render(){

		return (
				<AdminLayout>
					  <Breadcrumb>
					    <Breadcrumb.Item>首页</Breadcrumb.Item>
					    <Breadcrumb.Item>分类管理</Breadcrumb.Item>
					    <Breadcrumb.Item>添加分类</Breadcrumb.Item>
					  </Breadcrumb>	
					  {
					  	// br换行符
					  }
					  <br/>
					  <Link to="/category/add">添加分类</Link>
				</AdminLayout>
		)
	}
}


export default CategoryList