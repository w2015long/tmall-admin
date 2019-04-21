
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

const { Option } = Select;

class ProductSave extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
    }	
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        	//err信息统一传递到handleSave函数中处理
          	this.props.handleSave(err,values)
        });
    } 

	render(){
		const {handleCategoryId,handleImages,
			handleRichEditorVal,selectorMessage,
			categoryValidate,
			imagesValidate,imagesMessage,
			detailValidate,detailMessage,
			isSaveFetching
		} = this.props
	    const {getFieldDecorator} = this.props.form;
		return (
			<div className="ProductSave">
				<AdminLayout style={{marginBottom:20}}>
				  <Breadcrumb>
				    <Breadcrumb.Item>首页</Breadcrumb.Item>
				    <Breadcrumb.Item>商品管理</Breadcrumb.Item>
				    <Breadcrumb.Item>添加商品</Breadcrumb.Item>
				  </Breadcrumb>
					<Form labelCol={{span:5}} wrapperCol={{span:10}} onSubmit={this.handleSubmit}>
	                    <Form.Item label="商品名称">
	                      {getFieldDecorator('name', {
	                        rules: [{ required: true, message: '请输入商品名称!' }],
	                      })(
	                        <Input placeholder="商品名称" />
	                      )}
	                    </Form.Item>
	                    <Form.Item 
	                   		label="所属分类"
	                   		required={true}
	                   		validateStatus={categoryValidate}
	                   		help={selectorMessage}
	                    >
	                    	<CategorySelector
	                    		getCategoryId ={(pid,id)=>{
	                    			handleCategoryId(pid,id)
	                    		}}
	                    	/>
	                    </Form.Item>
	                    <Form.Item label="商品描述">
	                      {getFieldDecorator('description', {
	                        rules: [{ required: true, message: '请输入商品描述!' }],
	                      })(
	                        <Input placeholder="请输入商品描述" />
	                      )}
	                    </Form.Item>
	                    <Form.Item label="商品价格">
	                      {getFieldDecorator('price', {
	                        rules: [{ required: true, message: '请输入商品价格!' }],
	                      })(
	                        <InputNumber
	                        	style={{width:200}} 
	                        	initialValue={0}
	                        	min={0}
	                        	formatter={value => `${value}元`}
	                        	parser={value => value.replace('元', '')}
	                        />
	                      )}
	                    </Form.Item>
	                    <Form.Item 
	                    	label="商品图片"
	                    	required={true}
	                    	validateStatus={imagesValidate}
	                    	help={imagesMessage}
	                    >
	                    	<UploadImg
	                    		action={UPLOAD_PRODUCT_IMG}
	                    		max={3}
	                    		getFileList={
	                    			fileList=>{
	                    				// console.log(fileList)
	                    				handleImages(fileList)
	                    			}
	                    		}
	                    	/>
	                    </Form.Item>	
	                    <Form.Item 
	                    	label="商品详情"
	                    	required={true}
	                    	validateStatus={detailValidate}
	                    	help={detailMessage}	                    	
	                    >
	                    	<RichEditor
	                    		url={UPLOAD_DETAIL_IMG}
	                    		getRichEditorVal={
	                    			(value)=>{
	                    				// console.log(value)
	                    				handleRichEditorVal(value)
	                    			}
	                    		}
	                    	/>
	                    </Form.Item>
	                    <Form.Item label="商品库存">
	                      {getFieldDecorator('stock', {
	                        rules: [{ required: true, message: '请输入商品库存!' }],
	                      })(
	                        <InputNumber 
	                        	style={{width:200}}
	                        	initialValue={0}
	                        	min={0}
	                        	formatter={value => `${value}件`}
	                        	parser={value => value.replace('件', '')}
	                        	onChange={()=>{}}
	                        />
	                      )}
	                    </Form.Item>	                    	                    	                    	                    
				        <Form.Item
				        	wrapperCol={{ span: 10, offset: 5 }}
				        >
				          <Button
				          type="primary"
				          htmlType="submit"
				          loading={isSaveFetching}
				          >提交</Button>
				        </Form.Item>						
					</Form>
				</AdminLayout>

			</div>	
		)
	}
}
const mapStateToProps = state => {
	return{
		selectorMessage:state.get('productReducer').get('selectorMessage'),
		categoryValidate:state.get('productReducer').get('categoryValidate'),
		imagesValidate:state.get('productReducer').get('imagesValidate'),
		imagesMessage:state.get('productReducer').get('imagesMessage'),
		detailValidate:state.get('productReducer').get('detailValidate'),
		detailMessage:state.get('productReducer').get('detailMessage'),
		isSaveFetching:state.get('productReducer').get('isSaveFetching'),
	}
}

const mapDispatchToProps = dispatch=>{
	return{
		handleCategoryId:(pid,id)=>{
			const action = actionCreator.getCategoryIdAction(pid,id)
			dispatch(action)
		},
		handleImages:(fileList)=>{
			const action = actionCreator.getImagesAction(fileList)
			dispatch(action)			
		},
		handleRichEditorVal:(value)=>{
			const action = actionCreator.getRichEditorValAction(value)
			dispatch(action)			
		},
		handleSave:(err,values)=>{
			const action = actionCreator.getSaveAction(err,values)
			dispatch(action)				
		}
	}
}
const WappedProductSave = Form.create()(ProductSave)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WappedProductSave)