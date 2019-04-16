import React,{Component} from 'react';
import {
  Layout, Menu, Breadcrumb, Icon,
} from 'antd';
import AdminHeader from 'common/header'
import AdminSider from 'common/sider'
// import './index.css';

const { Header, Content, Sider } = Layout;


class AdminLayout extends Component{
	render(){
		return (
		  <Layout>
		  	<AdminHeader/>
		    <Layout>
		      <AdminSider />
		      <Layout style={{ padding: '0 24px 24px' }}>
		        <Breadcrumb style={{ margin: '16px 0' }}>
		          <Breadcrumb.Item>Home</Breadcrumb.Item>
		          <Breadcrumb.Item>List</Breadcrumb.Item>
		          <Breadcrumb.Item>App</Breadcrumb.Item>
		        </Breadcrumb>
		        <Content style={{
		          background: '#fff', padding: 24, margin: 0, minHeight: 280,
		        }}
		        >
		          Content
		        </Content>
		      </Layout>
		    </Layout>
		  </Layout>

		)
	}
}

export default AdminLayout