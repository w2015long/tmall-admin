
import React,{Component} from 'react';
import {Link} from "react-router-dom"
import { connect } from 'react-redux'
import {actionCreator} from './store/'
import {UPLOAD_PRODUCT_IMG,UPLOAD_DETAIL_IMG} from 'api'
import AdminLayout from 'common/layout'
import UploadImg from 'common/upload-img'
import RichEditor from 'common/rich-editor'


import {Breadcrumb,Form, Input,  Icon,
	Select, Row, Col, Button,InputNumber } from 'antd';

import CategorySelector from './category-selector.js'
import './detail.css'	

const { Option } = Select;

class ProductDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
        	productId:this.props.match.params.productId
        }
    }
    componentDidMount(){
    	if(this.state.productId){
    		this.props.handleDetail(this.state.productId)
    	}
    }	


	render(){
		const {
			
			//商品详情信息
			parentCategoryId,
			categoryId,
			name,
			images,
			price,
			detail,
			description,
			stock,
		} = this.props
		let imgBox = '';
		if(images){
			imgBox = images.split(',').map((url,index)=>
				<li key={index}><img src={url}/></li>
			)}
	    const {getFieldDecorator} = this.props.form;
		return (
			<div className="ProductSave">
				<AdminLayout style={{marginBottom:20}}>
				  <Breadcrumb>
				    <Breadcrumb.Item>首页</Breadcrumb.Item>
				    <Breadcrumb.Item>商品管理</Breadcrumb.Item>
				    <Breadcrumb.Item>查看商品</Breadcrumb.Item>
				  </Breadcrumb>
					<Form labelCol={{span:5}} wrapperCol={{span:10}}>
	                    <Form.Item label="商品名称">
	                      {getFieldDecorator('name', {
	                        rules: [{ required: true, message: '请输入商品名称!' }],
	                        initialValue:name,
	                      })(
	                        <Input disabled={true} />
	                      )}
	                    </Form.Item>
	                    <Form.Item 
	                   		label="所属分类"
	                    >
	                    	<CategorySelector
	                    		disabled={true}
	                    		//传入id回填到下拉框
	                    		parentCategoryId={parentCategoryId}
	                    		categoryId={categoryId}

	                    	/>
	                    </Form.Item>
	                    <Form.Item label="商品描述">
	                      {getFieldDecorator('description', {
	                        rules: [{ required: true, message: '请输入商品描述!' }],
	                        initialValue:description,
	                      })(
	                        <Input disabled={true} />
	                      )}
	                    </Form.Item>
	                    <Form.Item label="商品价格">
	                      {getFieldDecorator('price', {
	                        rules: [{ required: true, message: '请输入商品价格!' }],
	                        initialValue:price,
	                      })(
	                        <InputNumber
	                        	style={{width:200}} 
	                        	disabled={true}
	                        />
	                      )}
	                    </Form.Item>
	                    <Form.Item 
	                    	label="商品图片"
	                    >
	                    	<ul className="imgBox">{imgBox}</ul>
	                    </Form.Item>	
	                    <Form.Item 
	                    	label="商品详情"                   	
	                    >
	                    	<div dangerouslySetInnerHTML={{__html:detail}}/>
	                    </Form.Item>
	                    <Form.Item label="商品库存">
	                      {getFieldDecorator('stock', {
	                        rules: [{ required: true, message: '请输入商品库存!' }],
	                        initialValue:stock,
	                      })(
	                        <InputNumber 
	                        	style={{width:200}}
	                        	disabled={true}
	                        />
	                      )}
	                    </Form.Item> 						
					</Form>
				</AdminLayout>

			</div>	
		)
	}
}
const mapStateToProps = state => {
	return{
		//商品详情数据
		parentCategoryId:state.get('productReducer').get('parentCategoryId'),
		categoryId:state.get('productReducer').get('categoryId'),
		name:state.get('productReducer').get('name'),
		images:state.get('productReducer').get('images'),
		detail:state.get('productReducer').get('detail'),
		price:state.get('productReducer').get('price'),
		stock:state.get('productReducer').get('stock'),
		description:state.get('productReducer').get('description'),		
	}
}

const mapDispatchToProps = dispatch=>{
	return{
		handleDetail:(productId)=>{
			const action = actionCreator.getDetailAction(productId)
			dispatch(action)			
		}
	}
}
const WappedProductDetail = Form.create()(ProductDetail)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WappedProductDetail)