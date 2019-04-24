
import React,{Component} from 'react';
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {actionCreator} from './store/'
import AdminLayout from 'common/layout'
import {Breadcrumb,Row,Col,Button,InputNumber,
	Table,Divider,Switch,Input} from 'antd';
const Search = Input.Search;

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
			handleStatus,
			handleSearch,
			keyword
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
		  render:(status,record)=>(
		  	<span>
		  		{
		  			////0-在售 1-下架
		  			// console.log('status',status)
		  		}
		  		<Switch
		  			checkedChildren='在售'
		  			unCheckedChildren='下架'
		  			checked={status=='0'?true:false}
		  			onChange={
		  				(checked)=>{
		  					handleStatus(record.id,checked?'0':'1')
		  				}
		  			}
		  		/>
		  	</span>
		  )
		},{
		  title: '操作',
		  dataIndex: 'action',
		  key: 'action',
		  render: (text, record) => (
		    <span>
				<Button>
					<Link to={"/product/detail/"+record.id}>查看详情</Link>
				</Button>
		      	<Divider type="vertical" />
		      	<Button>
		      		<Link to={"/product/save/"+record.id}>修改</Link>
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
		list:state.get('productReducer').get('list'),
		current:state.get('productReducer').get('current'),
		pageSize:state.get('productReducer').get('pageSize'),
		total:state.get('productReducer').get('total'),
		isPageFetching:state.get('productReducer').get('isPageFetching'),
		keyword:state.get('productReducer').get('keyword'),  	
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
		handleStatus:(id,newStatus)=>{
			const action = actionCreator.getStatusAction(id,newStatus)
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
)(ProductList)
