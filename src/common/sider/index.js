import React,{Component} from 'react';
import {
  Layout, Menu,Icon 
} from 'antd';
import {NavLink} from "react-router-dom"
import {getUserName} from 'util'
import './index.css';
const { Sider } = Layout;


class AdminSider extends Component{
	render(){
		return (
	      <Sider width={200} style={{ background: '#fff' }}>
	        <Menu
	          mode="inline"
	          defaultSelectedKeys={['1']}
	          defaultOpenKeys={['sub1']}
	          style={{ height: '100%', borderRight: 0 }}
	        >
            <Menu.Item key="1">
            	<NavLink to="/"><Icon type="home" />首页</NavLink> 
            </Menu.Item>
            <Menu.Item key="2">
            	<NavLink to="/users"><Icon type="user" />用户中心</NavLink>
            </Menu.Item>
            <Menu.Item key="3">
            	<NavLink to="/category"><Icon type="align-left" />分类列表</NavLink>
            </Menu.Item>
            <Menu.Item key="4">
            	<NavLink to="/order"><Icon type="database" />订单管理</NavLink>
            </Menu.Item>
	        </Menu>
	      </Sider>		
		)
	}

}
export default AdminSider