
import React,{Component} from 'react';
import { connect } from 'react-redux'
import {actionCreator} from './store/'
import AdminLayout from 'common/layout'


import {Breadcrumb,Button} from 'antd';

import './detail.css'	


class OrderDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
        	orderNo:this.props.match.params.orderNo
        }
    }
    componentDidMount(){
    	if(this.state.orderNo){
    		this.props.handleOrderDetail(this.state.orderNo)
    	}
    }	

	render(){
		const {
			orderNo,
			payment,
			statusDesc,
			paymentTypeDesc,
			createdAt,
			shopping,
			productList,
			status
		} = this.props.order;
		var createdTime = '';
		if(createdAt){
			createdTime = new Date(createdAt).toLocaleString()
		}
		return (
			<div className="OrderDetail">
				<AdminLayout style={{marginBottom:20}}>
				  <Breadcrumb>
				    <Breadcrumb.Item>首页</Breadcrumb.Item>
				    <Breadcrumb.Item>订单管理</Breadcrumb.Item>
				    <Breadcrumb.Item>订单详情</Breadcrumb.Item>
				  </Breadcrumb>
	{

		orderNo
		? <div className="order-detail">
            <div className="panel">
                <h2 className="panel-header">订单信息</h2>
                <div className="pandel-body">
                    <ul className="order-info">
                        <li className="order-no">
                            <span className="lable">订单号:</span>
                            <span className="text">{orderNo}</span>
                        </li>
                        <li className="order-create-time">
                            <span className="lable">创建时间:</span>
                            <span className="text">{createdTime}</span>
                        </li>
                        <li className="order-shipping-name">
                            <span className="lable">收件人:</span>
                            <span className="text">{shopping.name}</span>
                        </li>
                        <li className="order-shipping-address">
                            <span className="lable">收件地址:</span>
                            <span className="text">{shopping.city}{shopping.address}</span>
                        </li>   
                        <li className="order-status">
                            <span className="lable">订单状态:</span>
                            <span className="text">{statusDesc}</span>
                        </li>                   
                        <li className="order-payment">
                            <span className="lable">订单金额:</span>
                            <span className="text">￥{payment}</span>
                        </li>
                        <li className="order-payment-type">
                            <span className="lable">支付方式:</span>
                            <span className="text">{paymentTypeDesc}</span>
                        </li>
                        <li className="order-opreation">
                        {
                        	//订单操作
                        }

                        </li>                                               
                    </ul>
                </div>
            </div>
            <div className="panel">
                <h2 className="panel-header">商品列表</h2>
                <div className="pandel-body">
                    <ul className="product-title clearfix">
                        <li className="product-info">
                            商品
                        </li>
                        <li className="product-price">
                            单价
                        </li>
                        <li className="product-count">
                            数量
                        </li>
                        <li className="product-totalPrice">
                            小计
                        </li>
                    </ul>
                    {
                    	// 循环商品
                    }
                </div>
            </div>                  
        </div>  
    : null		

	}			  
				</AdminLayout>

			</div>	
		)
	}
}
const mapStateToProps = state => {
	return{
		order:state.get('orderReducer').get('order')
	}
}

const mapDispatchToProps = dispatch=>{
	return{
		handleOrderDetail:(orderNo)=>{
			const action = actionCreator.getDetailAction(orderNo)
			dispatch(action)			
		}
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDetail)