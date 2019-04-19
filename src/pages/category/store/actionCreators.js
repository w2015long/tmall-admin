import * as types from './actionTypes.js'
import {message} from 'antd'
import {request,setUserName} from 'util'
import { ADD_CATEGORIES,GET_CATEGORIES } from 'api'


const getAddRequestAction = ()=>{
	return {
		type:types.ADD_CATEGORY_REQUEST
	}
}
const getAddDoneAction = ()=>{
	return {
		type:types.ADD_CATEGORY_DONE
	}
}
const setPageAction = payload=>{
	return {
		type:types.SET_PAGE,
		payload
	}
}
const setCategoryAction = payload=>{
	return {
		type:types.SET_LEVELONE_CATEGORY,
		payload
	}
}
let getAddCategoryAction = (values)=>{
	return (dispatch)=>{
		dispatch(getAddRequestAction())
		request({
			method:'post',
			url:ADD_CATEGORIES,
			data:values
		})
		.then(result=>{
			console.log('getAddCategory:',result)
			if(result.code == 0){//添加成功
				
				if(result.data){//添加顶级分类再派发一个aaction更新页面Select下拉框的值
					const action = setCategoryAction(result.data)
					dispatch(action)					
				}
				message.success('添加分类成功')
			}else{
				message.error(result.message)
			}
		})
		.catch(err=>{
			message.error(result.message)
			console.log(err)
		})	
		.finally(()=>{
			dispatch(getAddDoneAction())
		})		
	}
}

let getLevelOneCategoriesAction = ()=>{
	return (dispatch)=>{
		request({
			method:'get',
			url:GET_CATEGORIES,
			data:{
				pid:0
			}
		})
		.then(result=>{
			console.log('get cate:::',result)
			if(result.code == 0){//获取分类成功
				//派发action设置分类Select下拉框的值
				const action = setCategoryAction(result.data)
				dispatch(action)
			}
		})
		.catch(err=>{
			console.log(err)
		})	
	
	}
}


export {getAddCategoryAction,getLevelOneCategoriesAction}