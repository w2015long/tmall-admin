
import React,{Component} from 'react';
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {actionCreator} from './store/'
import AdminLayout from 'common/layout'
import {Breadcrumb,Row,Col,Button,InputNumber,
	Table,Divider,Switch,Input} from 'antd';
const Search = Input.Search;

class OrderList extends Component{
	constructor(props){
		super(props)
	}
	componentDidMount(){
		this.props.handlePage(1)
	}	
	render(){
		const {isPageFetching,current,
			pageSize,total,list,
			handlePage,
			handleSearch,
			keyword
		} = this.props;

		const dataSource = list.map(order=>{
			return {
			  key: order.get('_id'),
			  orderNo: order.get('orderNo'),
			  id: order.get('_id'),
			  payment: '￥'+order.get('payment'),
			  statusDesc:order.get('statusDesc'),
			  name:order.get('shopping').get('name'),
			  phone:order.get('shopping').get('phone'),
			  createTime:new Date(order.get('createdAt')).toLocaleString()
			}
		}).toJS()

		const columns = [{
		  title: '订单号',
		  dataIndex: 'orderNo',
		  key: 'orderNo',
		  render:(orderNo,record)=>{
		  	if(keyword){
		  		const reg = new RegExp('('+keyword+')','ig');
		  		const html = orderNo.replace(reg,"<b style='color:red;'>$1</b>")
		  		return <span dangerouslySetInnerHTML={{__html:html}}></span>
		  	}else{
		  		return orderNo
		  	}
		  }
		},{
			title:'金额',
			dataIndex:'payment',
			key:'payment'
		},{
			title:'订单状态',
			dataIndex:'statusDesc',
			key:'statusDesc'
		},{
			title:'收货人',
			dataIndex:'name',
			key:'name'
		},{
			title:'手机',
			dataIndex:'phone',
			key:'phone'
		},{
			title:'下单时间',
			dataIndex:'createTime',
			key:'createTime'
		},{
		  title: '操作',
		  dataIndex: 'action',
		  key: 'action',
		  render: (text, record) => (
		    <span>
				<Button>
					<Link to={"/order/detail/"+record.orderNo}>查看详情</Link>
				</Button>
		    </span>
		  ),
		}];


		return(
			<div className="OrderList">
				<AdminLayout>
					<Breadcrumb style={{marginBottom:20}}>
						<Breadcrumb.Item>首页</Breadcrumb.Item>
						<Breadcrumb.Item>订单管理</Breadcrumb.Item>
						<Breadcrumb.Item>订单列表</Breadcrumb.Item>
					</Breadcrumb>
					  <Row style={{marginBottom:20}}>
						<Col span={6}>
						    <Search
						      placeholder="亲输入搜索商品"
						      enterButton
						      size="large"
						      onSearch={keyword =>{
						      	handleSearch(keyword)
						      }}
						    />							
						</Col>
					  </Row>
					<Table
						//表格数据
						dataSource={dataSource}
						columns={columns}
						//分页配置
						pagination={{
							current:current,
							pageSize:pageSize,
							total:total
						}}
						onChange={(page)=>{
							// console.log(page)
							if(keyword){
								handleSearch(keyword,page.current)
							}else{
								handlePage(page.current)
							}
						}}
						loading={{
							spinning:isPageFetching,
							tip:'正在加载数据'
						}}
					/>	
				</AdminLayout>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
    return {
		list:state.get('orderReducer').get('list'),
		current:state.get('orderReducer').get('current'),
		pageSize:state.get('orderReducer').get('pageSize'),
		total:state.get('orderReducer').get('total'),
		isPageFetching:state.get('orderReducer').get('isPageFetching'),
		keyword:state.get('orderReducer').get('keyword'),  	
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
		handlePage:(page)=>{
			const action = actionCreator.getPageAction(page)
			dispatch(action)
		},
		handleSearch:(keyword,page)=>{
			const action = actionCreator.getSearchAction(keyword,page)
			dispatch(action)			
		}    
    }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderList)
