
import React,{Component} from 'react';
import {Link} from "react-router-dom"
import {actionCreator} from './store/'
import AdminLayout from 'common/layout'
import {Breadcrumb,Row, Col } from 'antd';

class CategoryList extends Component{
	componentDidMount(){

	}	
	render(){

		return (
				<AdminLayout>
					  <Breadcrumb style={{marginBottom:20}}>
					    <Breadcrumb.Item>首页</Breadcrumb.Item>
					    <Breadcrumb.Item>添加分类</Breadcrumb.Item>
					    <Breadcrumb.Item>分类管理</Breadcrumb.Item>
					  </Breadcrumb>	
					  <Row>
						<Col span={6}>
							<h4>父类ID:0</h4>
						</Col>
						<Col span={6} offset={12}>
							<Link to="/category/add">添加分类</Link>
						</Col>
					  </Row>
					  
				</AdminLayout>
		)
	}
}


export default CategoryList