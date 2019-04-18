
import React,{Component} from 'react';
import { connect } from 'react-redux'
import moment from 'moment'
import {getUserName} from 'util'
import {actionCreator} from './store/'
import AdminLayout from 'common/layout'
import { Table, Breadcrumb  } from 'antd';
import './index.css';


// const dataSource = [{
//   key: '1',
//   username: '胡彦斌',
//   isAdmin: false,
//   email: '1258369@qq.com',
//   phone: '18868869699',
//   createAt:'2019-04-17 19:20:30'
// }];

const columns = [{
  title: '姓名',
  dataIndex: 'username',
  key: 'username',
}, {
  title: '是否是管理员',
  dataIndex: 'isAdmin',
  key: 'isAdmin',
  render:isAdmin=>isAdmin?'是':'否'
}, {
  title: '邮箱',
  dataIndex: 'email',
  key: 'email',
},{
  title: '手机',
  dataIndex: 'phone',
  key: 'phone',
},{
  title: '注册时间',
  dataIndex: 'createAt',
  key: 'createAt',
}];

class User extends Component{
	componentDidMount(){
		this.props.handlePage(1)
	}	
	render(){
		//list immuatble数据
		const {list,current,total,pageSize,handlePage,isFetching} = this.props
		// console.log(total)

		const dataSource = list.map(user=>{
			return {
			  key: user.get('_id'),
			  username: user.get('username'),
			  isAdmin: user.get('isAdmin'),
			  email: user.get('email'),
			  phone: user.get('phone'),
			  createAt:moment(user.get('createAt')).format('YYYY年MM月DD日 HH:mm:ss')			
			}
		}).toJS()//toJS()方法把imuatble数据转换为数组
		return (
			<div className="User">
				<AdminLayout>
					  <Breadcrumb>
					    <Breadcrumb.Item>首页</Breadcrumb.Item>
					    <Breadcrumb.Item>用户列表</Breadcrumb.Item>
					  </Breadcrumb>				
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
							console.log(page)
							handlePage(page.current)
						}}
						loading={{
							spinning:isFetching,
							tip:'正在加载数据'
						}}
					/>
				</AdminLayout>
			</div>	
		)
	}
}

const mapStateToProps = state => {
	return{
		list:state.get('userReducer').get('list'),
		current:state.get('userReducer').get('current'),
		pageSize:state.get('userReducer').get('pageSize'),
		total:state.get('userReducer').get('total'),
		isFetching:state.get('userReducer').get('isFetching')

	}
}

const mapDispatchToProps = dispatch=>{
	return{
		handlePage:(page)=>{
			const action = actionCreator.getPageAction(page)
			dispatch(action)
		}
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User)