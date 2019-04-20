
import React,{Component} from 'react';
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {actionCreator} from './store/'
import AdminLayout from 'common/layout'
import {Breadcrumb,Row,Col,Button,Input,
	Table,Divider,InputNumber,Modal} from 'antd';



class CategoryList extends Component{
	constructor(props){
		super(props)
		// console.log('pid',this.props.match.params)
		this.state = {
			pid:this.props.match.params.pid || 0
		}
	}
	componentDidMount(){
		this.props.handlePage(this.state.pid,1)
	}
	componentDidUpdate(prevProps,prevState){
		// console.log('11:',prevProps.location)
		// console.log('22:',this.props.location)
		const oldPath = prevProps.location.pathname;
		const newPath = this.props.location.pathname;
		if(newPath != oldPath){//更新页面
			const newPid = this.props.match.params.pid	|| 0		
			this.setState(()=>{
				//更新pid
				return {pid:newPid}
			},()=>{
				//更新pid后再更新一下页面
				this.props.handlePage(this.state.pid,1)
			})
		}
	}	
	render(){
		 const {isPageFetching,current,
		 	pageSize,total,list,
		 	handlePage,
		 	handleOrder,
		 	updateNameModalVisible,
		 	showUpdateNameModal,
		 	updateName,
		 	closeUpdateNameModal,
		 	handleChangeName,
		 	handleOkUpdateName,
		 } = this.props
		 const {pid} = this.state
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
		  		// console.log(order.value,record.id)
		  		handleOrder(record.pid,record.id,order)
		  	}} 
		  />
		},{
		  title: '操作',
		  dataIndex: 'action',
		  key: 'action',
		  render: (text, record) => (
		    <span>
		      <Button
		      	onClick={()=>{
		      		showUpdateNameModal(record.id,record.name)
		      	}}
		      ><a   href="javascript:;">修改名称</a></Button>
		      	{
		      		pid == 0
		      		?<span>
		      			<Divider type="vertical" />
		      			<Button><Link to={"/category/"+record.id}>查看子分类</Link></Button>
		      		</span>
		      		:null
		      	}
		      
		      
		    </span>
		  ),
		}];
		const dataSource = list.map(category=>{
			return {
			  key: category.get('_id'),
			  name: category.get('name'),
			  id: category.get('_id'),
			  order: category.get('order'),
			  pid:category.get('pid'),
			}
		}).toJS()
		return (
				<AdminLayout>
					  <Breadcrumb style={{marginBottom:20}}>
					    <Breadcrumb.Item>首页</Breadcrumb.Item>
					    <Breadcrumb.Item>添加分类</Breadcrumb.Item>
					    <Breadcrumb.Item>分类管理</Breadcrumb.Item>
					  </Breadcrumb>	
					  <Row style={{marginBottom:20}}>
						<Col span={6}>
							<h4>父类ID:{pid}</h4>
						</Col>
						<Col span={6} offset={12}>
							<Button type="primary">
								<Link to="/category/add">添加分类</Link>
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
							handlePage(pid,page.current)
						}}
						loading={{
							spinning:isPageFetching,
							tip:'正在加载数据'
						}}
					/>	
			        <Modal
			          title="修改分类名称"
			          visible={updateNameModalVisible}
			          onOk={()=>{
			          	handleOkUpdateName(pid)
			          }}
			          onCancel={closeUpdateNameModal}
			          cancelText="取消"
			          okText="确定"
			        >
			        <Input
			        	value={updateName}
			        	onChange={(ev)=>{
			        		// console.log(ev.target.value)
			        		handleChangeName(ev.target.value)
			        	}}
			        />
			        </Modal>									  
				</AdminLayout>
		)
	}
}
const mapStateToProps = state => {
	return{
		list:state.get('categoryReducer').get('list'),
		current:state.get('categoryReducer').get('current'),
		pageSize:state.get('categoryReducer').get('pageSize'),
		total:state.get('categoryReducer').get('total'),
		isPageFetching:state.get('categoryReducer').get('isPageFetching'),
		updateNameModalVisible:state.get('categoryReducer').get('updateNameModalVisible'),
		updateName:state.get('categoryReducer').get('updateName'),
		updateId:state.get('categoryReducer').get('updateId'),

	}
}

const mapDispatchToProps = dispatch=>{
	return{
		handlePage:(pid,page)=>{
			const action = actionCreator.getPageAction(pid,page)
			dispatch(action)
		},
		handleOrder:(pid,id,newOreder)=>{
			const action = actionCreator.getOrderAction(pid,id,newOreder)
			dispatch(action)			
		},
		showUpdateNameModal:(updateId,updateName)=>{
			const action = actionCreator.showUpdateNameModalAction(updateId,updateName)
			dispatch(action)			
		},
		closeUpdateNameModal:()=>{
			const action = actionCreator.closeUpdateNameModalAction()
			dispatch(action)			
		},
		handleChangeName:(newName)=>{
			const action = actionCreator.handleChangeNameAction(newName)
			dispatch(action)
		},
		handleOkUpdateName:(pid)=>{
			const action = actionCreator.handleOkUpdateNameAction(pid)
			dispatch(action)			
		}
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryList)
