import * as types from './actionTypes.js'
import {message} from 'antd'
import {request} from 'util'
import { ADD_CATEGORIES,
	GET_CATEGORIES,
	UPDATE_CATEGORIES_ORDERS,
	UPDATE_CATEGORIES_NAME
} from 'api'

const getPageRequestAction = ()=>{
	return {
		type:types.PAGE_REQUEST
	}
}
const getPageDoneAction = ()=>{
	return {
		type:types.PAGE_DONE
	}
}

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

let getOrderAction = (pid,id,newOreder)=>{
	return (dispatch,getState)=>{
		const state = getState().get('categoryReducer')
		request({
			method:'put',
			url:UPDATE_CATEGORIES_ORDERS,
			data:{
				pid,
				id,
				order:newOreder,
				page:state.get('current')
			}
		})
		.then(result=>{
			console.log('get order::',result)
			if(result.code == 0){//更新order成功
				const action = setPageAction(result.data)
				dispatch(action)
			}
		})
		.catch(err=>{
			console.log(err)
		})	
	
	}
}

let getPageAction = (pid,page)=>{
	return (dispatch)=>{
		dispatch(getPageRequestAction())
		request({
			method:'get',
			url:GET_CATEGORIES,
			data:{pid,page}
		})
		.then(result=>{
			console.log('getPageCategory:',result)
			if(result.code == 0){//获取category分页数据成功
				const action = setPageAction(result.data)
				dispatch(action)					
			}
		})
		.catch(err=>{
			message.error(result.message)
			console.log(err)
		})	
		.finally(()=>{
			dispatch(getPageDoneAction())
		})		
	}	
}



const closeModalAction = ()=>{
	return {
		type:types.CLOSE_UPDATE_NAME_MODAL
	}
}


let showUpdateNameModalAction = (updateId,updateName)=>{
	return {
		type:types.SHOW_UPDATE_NAME_MODAL,
		payload:{
			updateId,
			updateName
		}
	}
}

let closeUpdateNameModalAction = ()=>{
	return (dispatch)=>{
		dispatch(closeModalAction())
	}
}
let handleChangeNameAction = (newName)=>{
	return {
		type:types.CHANGE_NAME,
		payload:{
			newName
		}
	}	
}
let handleOkUpdateNameAction = (pid)=>{
	return (dispatch,getState)=>{
		const state = getState().get('categoryReducer')
		request({
			method:'put',
			url:UPDATE_CATEGORIES_NAME,
			data:{
				pid,
				id:state.get('updateId'),
				name:state.get('updateName'),
				page:state.get('current'),
			}
		})
		.then(result=>{
			console.log('get name::',result)
			if(result.code == 0){//更新name成功
				message.success(result.message)
				dispatch(closeModalAction())
				const action = setPageAction(result.data)
				dispatch(action)
				
			}else{
				message.error(result.message)
			}
		})
		.catch(err=>{
			message.error('网络错误,请稍后重试')
			console.log(err)
		})	
	
	}	
}
export {getAddCategoryAction,
	getLevelOneCategoriesAction,
	getPageAction,
	getOrderAction,
	showUpdateNameModalAction,
	closeUpdateNameModalAction,
	handleChangeNameAction,
	handleOkUpdateNameAction,
}