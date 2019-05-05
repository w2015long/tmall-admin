
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
			  name: order.get('name'),
			  id: order.get('_id'),
			  order: order.get('order'),
			  status:order.get('status'),
			}
		}).toJS()

		const columns = [{
		  title: 'id',
		  dataIndex: 'id',
		  key: 'id',
		}, {
		  title: '商品名称',
		  dataIndex: 'name',
		  key: 'name',
		  render:(name,record)=>{
		  	if(keyword){
		  		const reg = new RegExp('('+keyword+')','ig');
		  		const html = name.replace(reg,"<b style='color:red;'>$1</b>")
		  		return <span dangerouslySetInnerHTML={{__html:html}}></span>
		  	}else{
		  		return name
		  	}
		  }
		},{
		  title: '操作',
		  dataIndex: 'action',
		  key: 'action',
		  render: (text, record) => (
		    <span>
				<Button>
					<Link to={"/order/detail/"+record.id}>查看详情</Link>
				</Button>
		      	<Divider type="vertical" />
		      	<Button>
		      		<Link to={"/order/save/"+record.id}>修改</Link>
		      	</Button>

		    </span>
		  ),
		}];


		return(
			<div className="OrderList">
				<AdminLayout>
					<Breadcrumb style={{marginBottom:20}}>
						<Breadcrumb.Item>首页</Breadcrumb.Item>
						<Breadcrumb.Item>商品管理</Breadcrumb.Item>
						<Breadcrumb.Item>商品列表</Breadcrumb.Item>
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
						<Col span={6} offset={12}>
							<Button type="primary">
								<Link to="/order/save">添加商品</Link>
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
