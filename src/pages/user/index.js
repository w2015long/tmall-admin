
import React,{Component} from 'react';
import {getUserName} from 'util'
import AdminLayout from 'common/layout'
import './index.css';

class User extends Component{
	render(){
		return (
			<AdminLayout>
				welcome user page
			</AdminLayout>
		)
	}
}

export default User