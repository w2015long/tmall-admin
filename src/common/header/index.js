import React,{Component} from 'react';
import {
  Layout, Menu,Dropdown, Icon,
} from 'antd';
import {getUserName} from 'util'
import './index.css';
const { Header } = Layout;




class AdminHeader extends Component{
	constructor(props){
		super(props);
		this.handleLogout = this.handleLogout.bind(this)	
	}
	handleLogout(){
		
	}
	render(){
		const menu = (
		  <Menu onClick={this.handleLogout}>
		    <Menu.Item key="0">
		      <a href="javascript:;">退出登录</a>
		    </Menu.Item>
		  </Menu>
		);		
		return (
		    <Header className="header AdminHeader">
		      <div className="logo" />
		      <Menu
		        theme="dark"
		        mode="horizontal"
		        defaultSelectedKeys={['2']}
		        style={{ lineHeight: '64px' }}
		      >
		        <Menu.Item key="1">Tmall</Menu.Item>
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