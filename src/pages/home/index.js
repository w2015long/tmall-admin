
import React,{Component} from 'react';
import {getUserName} from 'util'
import AdminLayout from 'common/layout'
import './index.css';

class Home extends Component{
	render(){
		return (
			<AdminLayout>
				welcome index
			</AdminLayout>
		)
	}
}

export default Home