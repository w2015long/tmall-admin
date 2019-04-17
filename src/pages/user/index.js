
import React,{Component} from 'react';
import { connect } from 'react-redux'
import moment from 'moment'
import {getUserName} from 'util'
import {actionCreator} from './store/'
import AdminLayout from 'common/layout'
import { Table, Divider, Tag } from 'antd';
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
		this.props.handlePage()
	}	
	render(){
		//list immuatble数据
		const {list} = this.props
		const dataSource = list.map(user=>{
			return {
			  key: user.get('_id'),
			  username: user.get('username'),
			  isAdmin: user.get('isAdmin'),
			  email: user.get('email'),
			  phone: user.get('phone'),
			  createAt:user.get('createAt')			
			}
		}).toJS()
		return (
			<div className="User">
				<AdminLayout>
					<Table dataSource={dataSource} columns={columns} />
				</AdminLayout>
			</div>	
		)
	}
}

const mapStateToProps = state => {
	return{
		list:state.get('userReducer').get('list')

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