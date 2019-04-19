
import React,{Component} from 'react';
import {Link} from "react-router-dom"
import { connect } from 'react-redux'
import {actionCreator} from './store/'
import AdminLayout from 'common/layout'
import CategoryList from './list.js'
import {Breadcrumb,Form, Input, Tooltip, Icon, Cascader, 
	Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';

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

class CategoryAdd extends Component{
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
			<div className="CategoryAdd">
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
						      <Select>
						        <Option value="0">顶级分类</Option>
						        {
						        	levelOneCategories.map(category=>{
						        		return <Option 
						        		key={category.get('_id')}
						        		value={category.get('_id')}
						        		>顶级分类/{category.get('name')}</Option>
						        	})
						        }
						      </Select>
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

		isAddFetching:state.get('categoryReducer').get('isAddFetching'),
		levelOneCategories:state.get('categoryReducer').get('levelOneCategories')

	}
}

const mapDispatchToProps = dispatch=>{
	return{
		handleAdd:(values)=>{
			// console.log(values)
			const action = actionCreator.getAddCategoryAction(values)
			dispatch(action)
		},
		getLevelOneCategories:()=>{
			const action = actionCreator.getLevelOneCategoriesAction()
			dispatch(action)
		}
	}
}
const WappedCategoryAdd = Form.create()(CategoryAdd)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WappedCategoryAdd)