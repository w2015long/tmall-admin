
import React,{Component} from 'react';
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {actionCreator} from './store/'
import AdminLayout from 'common/layout'
import {Breadcrumb,Row,Col,Button,InputNumber,
	Table,Divider} from 'antd';


class ProductList extends Component{
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
			handleOrder,

		} = this.props;

		const dataSource = list.map(product=>{
			return {
			  key: product.get('_id'),
			  name: product.get('name'),
			  id: product.get('_id'),
			  order: product.get('order'),
			  status:product.get('status'),
			}
		}).toJS()

		const columns = [{
		  title: 'id',
		  dataIndex: 'id',
		  key: 'id',
		}, {
		  title: '分类名',
		  dataIndex: 'name',
		  key: 'name'
		}, {
		  title: '排序',
		  dataIndex: 'order',
		  key: 'order',
		  render:(order,record)=><InputNumber
		  	defaultValue={order}
		  	onBlur={(ev)=>{
		  		const order = ev.target.value
		  		handleOrder(record.id,order)
		  	}} 
		  />
		}, {
		  title: '状态',
		  dataIndex: 'status',
		  key: 'status',
		},{
		  title: '操作',
		  dataIndex: 'action',
		  key: 'action',
		  render: (text, record) => (
		    <span>
				<Button>
					<Link to={"/product"+record.id}>查看详情</Link>
				</Button>
		      	<Divider type="vertical" />
		      	<Button>
		      		<Link to={"/product/save"+record.id}>修改</Link>
		      	</Button>

		    </span>
		  ),
		}];


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
							<h4>商品列表</h4>
						</Col>
						<Col span={6} offset={12}>
							<Button type="primary">
								<Link to="/product/save">添加商品</Link>
							</Button>
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
							handlePage(page.current)
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
		list:state.get('productReducer').get('list'),
		current:state.get('productReducer').get('current'),
		pageSize:state.get('productReducer').get('pageSize'),
		total:state.get('productReducer').get('total'),
		isPageFetching:state.get('productReducer').get('isPageFetching'),    	
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
		handlePage:(page)=>{
			const action = actionCreator.getPageAction(page)
			dispatch(action)
		},
		handleOrder:(id,newOreder)=>{
			const action = actionCreator.getOrderAction(id,newOreder)
			dispatch(action)			
		},      
    }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList)
