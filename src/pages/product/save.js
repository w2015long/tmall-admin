
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
        this.state = {
        	productId:this.props.match.params.productId
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount(){
    	if(this.state.productId){
    		this.props.handleDetail(this.state.productId)
    	}
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
			isSaveFetching,
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
		let fileList = [];
		if(images){
			fileList = images.split(',').map((url,index)=>({
				uid:index,
				url:url,
				status: 'done',
			}))
		}
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
	                        initialValue:name,
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
	                        <Input placeholder="请输入商品描述" />
	                      )}
	                    </Form.Item>
	                    <Form.Item label="商品价格">
	                      {getFieldDecorator('price', {
	                        rules: [{ required: true, message: '请输入商品价格!' }],
	                        initialValue:price,
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
	                    		//回传图片路径回填到修改页面
	                    		fileList={fileList}
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
	                    		detail={detail}
	                    	/>
	                    </Form.Item>
	                    <Form.Item label="商品库存">
	                      {getFieldDecorator('stock', {
	                        rules: [{ required: true, message: '请输入商品库存!' }],
	                        initialValue:stock,
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
		},
		handleDetail:(productId)=>{
			const action = actionCreator.getDetailAction(productId)
			dispatch(action)			
		}
	}
}
const WappedProductSave = Form.create()(ProductSave)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WappedProductSave)