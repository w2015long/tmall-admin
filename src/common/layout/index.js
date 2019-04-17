import React,{Component} from 'react';
import {Layout} from 'antd';
import AdminHeader from 'common/header'
import AdminSider from 'common/sider'

const { Content } = Layout;


class AdminLayout extends Component{
	render(){
		return (
		  <Layout>
		  	<AdminHeader/>
		    <Layout>
		      <AdminSider />
		      <Layout style={{ padding: '0 24px 24px' }}>
		        <Content style={{
		          background: '#fff', padding: 24, margin: 0, minHeight: 600,
		        }}
		        >
		          {this.props.children}
		        </Content>
		      </Layout>
		    </Layout>
		  </Layout>

		)
	}
}

export default AdminLayout