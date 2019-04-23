
import React ,{Component} from 'react'
import { Select,Row,Col } from 'antd';
import {request} from 'util'
import {GET_CATEGORIES} from 'api'

const Option = Select.Option;

class CategorySelector extends Component{
	constructor(props){
		super(props);
		this.state = {
			levelOneCategories:[],
			levelOneCategoryId:'',
			levelTwoCategories:[],
			levelTwoCategoryId:'',

			needLoadLevelTwo:false,
			isEveryIdChanged:false
		}
		this.handlelevelOne = this.handlelevelOne.bind(this)
		this.handlelevelTwo = this.handlelevelTwo.bind(this)
	}
	componentDidMount(){
		this.loadLevelOneCategory()
	}

	static getDerivedStateFromProps(props,state){
		console.log('props',props)
		console.log('state',state)
		const {parentCategoryId,categoryId} = props
		const levelOneIdChanged = parentCategoryId != state.levelOneCategoryId
		const levelTwoIdChanged = categoryId != state.levelTwoCategoryId

		//新增商品时不更新state的值
		//新增商品(parentCategoryId与categoryId无值，state.levelOneCategoryId有值)
		if(!parentCategoryId && !categoryId && state.levelOneCategoryId){
			return null
		}
		//如果分类id没有改变就不更新state的值
		if(!levelOneIdChanged && !levelTwoIdChanged){
			return null
		}

		//全局变量 防止修改时点击不能修改
		if(state.isEveryIdChanged){
			return null
		}

		//只有一级分类时
		if(parentCategoryId == 0){
			//props上的数据回填到state
			return{
				levelOneCategoryId:categoryId,
				levelTwoCategoryId:'',
				isEveryIdChanged:true
			}
		}else{
			//props上的数据回填到state
			return{
				levelOneCategoryId:parentCategoryId,
				levelTwoCategoryId:categoryId,
				isEveryIdChanged:true,
				needLoadLevelTwo:true
			}
		}

		return null
	}
	//紧跟在更新发生后调用。对于初次的渲染，该方法并不会调用
	componentDidUpdate(){
		if(this.state.needLoadLevelTwo){
			this.loadLevelTwoCategory()
			this.setState(()=>({needLoadLevelTwo:false}))
		}
	}

	loadLevelOneCategory(){
		request({
			method:'get',
			url:GET_CATEGORIES,
			data:{
				pid:0
			}
		})
		.then(result=>{
			// console.log(result)
			this.setState(()=>({levelOneCategories:result.data}))
		})
	}
	loadLevelTwoCategory(){
		request({
			method:'get',
			url:GET_CATEGORIES,
			data:{
				pid:this.state.levelOneCategoryId
			}
		})
		.then(result=>{
			// console.log(result)
			this.setState(()=>({levelTwoCategories:result.data}))
		})			
	}
	handlelevelOne(value){
		//更新state里的值，并渲染到组件
		// console.log(value)
		this.setState(()=>({
			levelOneCategoryId:value,
			levelTwoCategories:[],
			levelTwoCategoryId:'',
		}),()=>{
			this.loadLevelTwoCategory()
			this.sendId()
		})
	}
	handlelevelTwo(value){
		this.setState(()=>({
			levelTwoCategoryId:value
		}),()=>{
			this.sendId()
		})		
	}
	sendId(){
		const {levelOneCategoryId,levelTwoCategoryId} = this.state;
		const {getCategoryId} = this.props
		//如果选择二级Select()
		if(levelTwoCategoryId){
			getCategoryId(levelOneCategoryId,levelTwoCategoryId)
		}else{
			getCategoryId(0,levelOneCategoryId)
		}
	}
	render(){
		const {levelOneCategoryId, levelOneCategories,
			levelTwoCategoryId,levelTwoCategories } = this.state;
		return(
			<div>
			    <Row>
			      <Col span={11}>
					<Select
					  onChange={this.handlelevelOne}
					  value={levelOneCategoryId}
					>
					  {
					  	levelOneCategories.map(levelOneCategory =>
					  		<Option key={levelOneCategory._id}>
					  			{levelOneCategory.name}
					  		</Option>
					  	)
					  }					 
					</Select>			      
			      </Col>
			      <Col span={11} offset={2}>
				      {
				      	levelTwoCategories.length
				      	?<Select
						  onChange={this.handlelevelTwo}
						  value={levelTwoCategoryId}
						>
						  {
						  	levelTwoCategories.map(levelTwoCategory =>
						  		<Option key={levelTwoCategory._id}>
						  			{levelTwoCategory.name}
						  		</Option>
						  	)
						  }
						</Select>
					    :null
				      }
			      </Col>

			    </Row>			


			</div>
		)
	}
}
export default CategorySelector