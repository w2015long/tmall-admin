

import React,{Component} from 'react';
import {
  Form, Icon, Input, Button, Checkbox,
} from 'antd';
import './index.css';

class NormalLoginForm extends Component {
  constructor(props){
  	super(props);
  	this.handleSubmit = this.handleSubmit.bind(this)
  }		
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
    	<div className="Login">
	      <Form onSubmit={this.handleSubmit} className="login-form">
	        <Form.Item>
	          {getFieldDecorator('userName', {
	            rules: [
	            	{ required: true, message: '请输入用户名!' },
	            	{pattern:/^[a-z|\d]{3,6}$/i,message:'用户名3-6位字符'}
	            ],
	          })(
	            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
	          )}
	        </Form.Item>
	        <Form.Item>
	          {getFieldDecorator('password', {
	            rules: [
	            	{ required: true, message: '请输入密码!' },
	            	{pattern:/^[a-z|\d]{3,6}$/i,message:'密码3-6位字符'}
	            ],
	          })(
	            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
	          )}
	        </Form.Item>
	        <Form.Item>
	          <Button type="primary" htmlType="submit" className="login-form-button">
	            登陆
	          </Button>
	        </Form.Item>
	      </Form>
	    </div>  
    );
  }
}


const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default WrappedNormalLoginForm