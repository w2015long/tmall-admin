
import React,{Component} from 'react';
import { connect } from 'react-redux'
import {
  Form, Icon, Input, Button, message,
} from 'antd';
import {actionCreator} from './store/'
import axios from 'axios'

import './index.css';

class NormalLoginForm extends Component {
  constructor(props){
  	super(props);
  	/*
  	this.state = {
  		isFetching:false
  	}
  	*/
  	this.handleSubmit = this.handleSubmit.bind(this)
  }		
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
      	this.props.handleLogin(values)
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
    	<div className="Login">
	      <Form onSubmit={this.handleSubmit} className="login-form">
	        <Form.Item>
	          {getFieldDecorator('username', {
	            rules: [
	            	{ required: true, message: '请输入用户名!' },
	            	{pattern:/^[a-z\d_]{3,6}$/i,message:'用户名是字符和下划线3-6位'}
	            ],
	          })(
	            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
	          )}
	        </Form.Item>
	        <Form.Item>
	          {getFieldDecorator('password', {
	            rules: [
	            	{ required: true, message: '请输入密码!' },
	            	{pattern:/^[\w]{3,6}$/i,message:'密码3-6位字符'}
	            ],
	          })(
	            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
	          )}
	        </Form.Item>
	        <Form.Item>
	          <Button
	          	type="primary"
	          	htmlType="submit"
	          	className="login-form-button"
	          	loading={this.props.isFetching}
	          	>
	            登陆
	          </Button>
	        </Form.Item>
	      </Form>
	    </div>  
    );
  }
}

const mapStateToProps = state => {
	console.log(state.get('loginReducer').get('isFetching'))
	return{
		isFetching:state.get('loginReducer').get('isFetching')
	}
}

const mapDispatchToProps = dispatch=>{
	return{
		handleLogin:(values)=>{
			// console.log(values)
			const action = actionCreator.getLoginAction(values)
			dispatch(action)
		}
	}
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedNormalLoginForm)