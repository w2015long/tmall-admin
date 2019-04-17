
import React,{Component} from 'react';
import {Card} from 'antd'
import {getUserName} from 'util'
import AdminLayout from 'common/layout'
import './index.css';

class Home extends Component{
	render(){
		return (
			<div className="Home">
				<AdminLayout>
				    <Card
				      title="用户数量"
				      hoverable={true}
				    >
				      <p>100</p>
				    </Card>	
				    <Card
				      title="商品数量"
				      hoverable={true}
				    >
				      <p>101</p>
				    </Card>	
				    <Card
				      title="订单数量"
				      hoverable={true}
				    >
				      <p>1019</p>
				    </Card>			    			    		
				</AdminLayout>
			</div>	
		)
	}
}

export default Home