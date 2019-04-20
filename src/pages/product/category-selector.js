
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
		}
		this.handlelevelOne = this.handlelevelOne.bind(this)
		this.handlelevelTwo = this.handlelevelTwo.bind(this)
	}
	componentDidMount(){
		this.loadLevelOneCategory()
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
					<Select
					  onChange={this.handlelevelTwo}
					>
					  {
					  	levelTwoCategories.map(levelTwoCategory =>
					  		<Option key={levelTwoCategory._id}>
					  			{levelTwoCategory.name}
					  		</Option>
					  	)
					  }
					</Select>
			      </Col>
			    </Row>			


			</div>
		)
	}
}
export default CategorySelector