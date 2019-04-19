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
	      <Sider className="AdminSider" width={200} style={{ background: '#ddd' }}>
	        <Menu
	          mode="inline"
	          style={{ height: '100%', borderRight: 0 }}
	        >
            <Menu.Item key="1">
            	<NavLink exact to="/"><Icon type="home" />首页</NavLink> 
            </Menu.Item>
            <Menu.Item key="2">
            	<NavLink to="/user"><Icon type="user" />用户管理</NavLink>
            </Menu.Item>
            <Menu.Item key="3">
            	<NavLink to="/category"><Icon type="align-left" />分类管理</NavLink>
            </Menu.Item>
            <Menu.Item key="4">
                  <NavLink to="/product"><Icon type="shop" />商品管理</NavLink>
            </Menu.Item>            
            <Menu.Item key="5">
            	<NavLink to="/order"><Icon type="database" />订单管理</NavLink>
            </Menu.Item>
	        </Menu>
	      </Sider>		
		)
	}

}
export default AdminSider