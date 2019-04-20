
import React,{Component} from 'react';
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {actionCreator} from './store/'
import AdminLayout from 'common/layout'
import {Breadcrumb,Row,Col,Button,Input,
	Table,Divider} from 'antd';


class ProductList extends Component{
	render(){
		return(
			<div className="ProductList">
				<AdminLayout>
					<Breadcrumb style={{marginBottom:20}}>
						<Breadcrumb.Item>首页</Breadcrumb.Item>
						<Breadcrumb.Item>商品管理</Breadcrumb.Item>
						<Breadcrumb.Item>商品列表</Breadcrumb.Item>
					</Breadcrumb>
					  <Row style={{marginBottom:20}}>
						<Col span={6}>
							<h4>shangpin</h4>
						</Col>
						<Col span={6} offset={12}>
							<Button type="primary">
								<Link to="/product/save">添加商品</Link>
							</Button>
						</Col>
					  </Row>										
				</AdminLayout>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispath) => {
    return {
      
    }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList)
