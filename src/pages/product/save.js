
import React,{Component} from 'react';
import {Link} from "react-router-dom"
import { connect } from 'react-redux'
import {actionCreator} from './store/'
import AdminLayout from 'common/layout'
import {Breadcrumb,Form, Input,  Icon,
	Select, Row, Col, Button, } from 'antd';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

class ProductSave extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
    }	
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this.props.handleAdd(values);
          }
        });
    } 
    componentDidMount(){
    	this.props.getLevelOneCategories()
    } 
	render(){
	    const {getFieldDecorator} = this.props.form;
	    const {isAddFetching,levelOneCategories} = this.props
		return (
			<div className="ProductSave">
				<AdminLayout>
					  <Breadcrumb>
					    <Breadcrumb.Item>首页</Breadcrumb.Item>
					    <Breadcrumb.Item>分类管理</Breadcrumb.Item>
					    <Breadcrumb.Item>添加分类</Breadcrumb.Item>
					  </Breadcrumb>
					<Row>
				      <Col span={12} offset={4}>
						  <Form {...formItemLayout} onSubmit={this.handleSubmit}>
					        <Form.Item
					          label="分类名称"
					        >
					          {getFieldDecorator('name', {
					            rules: [{
					              required: true, message: '请输入分类名称!',
					            }],
					          })(
					            <Input  placeholder="分类名称" />
					          )}
					        </Form.Item>
					        <Form.Item
					          label="父级分类"
					        >
					          {getFieldDecorator('pid', {
					            rules: [{
					              required: true,message: '请输入父级分类!' 
					            }],
					          })(

					          )}
					        </Form.Item>					        
					        <Form.Item {...tailFormItemLayout}>
					          <Button
					          type="primary"
					          htmlType="submit"
					          loading={isAddFetching}
					          >添加分类</Button>
					        </Form.Item>				        					  
						  </Form>
				      </Col>
				    </Row>	

				</AdminLayout>
			</div>	
		)
	}
}
const mapStateToProps = state => {
	return{
		// isAddFetching:state.get('categoryReducer').get('isAddFetching'),
		// levelOneCategories:state.get('categoryReducer').get('levelOneCategories')
	}
}

const mapDispatchToProps = dispatch=>{
	return{
		// handleAdd:(values)=>{
		// 	const action = actionCreator.getAddCategoryAction(values)
		// 	dispatch(action)
		// }
	}
}
const WappedProductSave = Form.create()(ProductSave)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WappedProductSave)