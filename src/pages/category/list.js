
import React,{Component} from 'react';
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {actionCreator} from './store/'
import AdminLayout from 'common/layout'
import {Breadcrumb,Row,Col,Button,Table,Divider,InputNumber} from 'antd';


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
  render:order=><InputNumber defaultValue={order} />
},{
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="javascript:;">更新名称</a>
      <Divider type="vertical" />
      <Link to={"/category/"+record.id}>查看子分类</Link>
    </span>
  ),
}];
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
		console.log('oldPath',oldPath)
		console.log('newPath',newPath)
		if(newPath != oldPath){//更新页面
			const newPid = this.props.match.params.pid			
			console.log(newPid)
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
		 const {isPageFetching,current,pageSize,total,list} = this.props
		 const {pid} = this.state

		const dataSource = list.map(category=>{
			return {
			  key: category.get('_id'),
			  name: category.get('name'),
			  id: category.get('_id'),
			  order: category.get('order'),
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
						}}
						loading={{
							spinning:isPageFetching,
							tip:'正在加载数据'
						}}
					/>					  
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
		isPageFetching:state.get('categoryReducer').get('isPageFetching')

	}
}

const mapDispatchToProps = dispatch=>{
	return{
		handlePage:(pid,page)=>{
			const action = actionCreator.getPageAction(pid,page)
			dispatch(action)
		}
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryList)
