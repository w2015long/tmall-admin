import React,{Component} from 'react';
import {
  Layout, Menu,Dropdown, Icon,
} from 'antd';
import {getUserName,request,delUserName} from 'util'
import {USER_LOGOUT} from 'api'
import './index.css';
const { Header } = Layout;

class AdminHeader extends Component{
	constructor(props){
		super(props);
		this.handleLogout = this.handleLogout.bind(this)	
	}
	handleLogout(){
		request({
			url:USER_LOGOUT
		})
		.then(result=>{
			if(result.code == 0){//退出成功
				//1.清除本地local Storage
				delUserName()
				//2.清除本地用户后跳转登录界面
				window.location.href = '/login'
			}
		})
	}
	render(){
		const menu = (
		  <Menu onClick={this.handleLogout}>
		    <Menu.Item key="0">
		      <a href="javascript:;"><Icon type="logout" />退出</a>
		    </Menu.Item>
		  </Menu>
		);		
		return (
		    <Header className="header AdminHeader">
		      <div className="logo">
		      	<a href="#">
		      		<Icon type="taobao" />Tmall
		      	</a>
		      </div>
		      <Menu
		        theme="dark"
		        mode="horizontal"
		        style={{ lineHeight: '64px' }}
		      >
				<Dropdown overlay={menu} trigger={['click']}>
				    <a className="ant-dropdown-link" href="#">
				      {getUserName()} <Icon type="down" />
				    </a>
				</Dropdown>
		      </Menu>
		    </Header>			
		)
	}

}
export default AdminHeader