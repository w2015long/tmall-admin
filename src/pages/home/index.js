
import React,{Component} from 'react';
import { connect } from 'react-redux'
import { Card, Col, Row } from 'antd';
import {actionCreator} from './store/'
import {getUserName} from 'util'
import AdminLayout from 'common/layout'

class Home extends Component{
	componentDidMount(){
		this.props.handleCount()
	}
	render(){
		const {usernum,productnum,ordernum} = this.props
		return (
			<div className="Home">

				<AdminLayout>
				    <Row gutter={16}>
				      <Col span={8}>
				        <Card 
					        title="用户数量" 
					        bordered={false} 
					        hoverable={true}>
				        	{usernum}
				        </Card>
				      </Col>
				      <Col span={8}>
				        <Card 
					        title="商品数量" 
					        bordered={false} 
					        hoverable={true}>
				        	{productnum}
				        </Card>
				      </Col>
				      <Col span={8}>
				        <Card 
					        title="订单数量" 
					        bordered={false} 
					        hoverable={true}>
				        	{ordernum}
				       	</Card>
				      </Col>
				    </Row>		    			    		
				</AdminLayout>
			</div>	
		)
	}
}

const mapStateToProps = state => {
	return{
		usernum:state.get('homeReducer').get('usernum'),
		productnum:state.get('homeReducer').get('productnum'),
		ordernum:state.get('homeReducer').get('ordernum')
	}
}

const mapDispatchToProps = dispatch=>{
	return{
		handleCount:()=>{
			const action = actionCreator.getCountAction()
			dispatch(action)
		}
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)