import * as types from './actionTypes.js'
import {message} from 'antd'
import {request,setUserName} from 'util'
import {SAVE_PRODUCT,GET_PRODUCTS,
	UPDATE_PRODUCTS_ORDER,UPDATE_PRODUCTS_STATUS,
	GET_PRODUCT_DETAIL,GET_SEARCH_PRODUCT } from 'api'


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

const getSaveRequestAction = ()=>{
	return {
		type:types.SAVE_REQUEST
	}
}
const getSaveDoneAction = ()=>{
	return {
		type:types.SAVE_DONE
	}
}

const setPageAction = payload=>{
	return {
		type:types.SET_PAGE,
		payload
	}
}

const setCategoryErrAction = ()=>{
	return {
		type:types.SET_CATEGORY_ERROR
	}
}
const setImagesErrAction = ()=>{
	return {
		type:types.SET_IMAGES_ERROR
	}
}
const setDetailErrAction = ()=>{
	return{
		type:types.SET_DETAIL_ERROR
	}
}

const setProductDetailAction = (payload)=>{
	return{
		type:types.SET_PRODUCT_DETAIL,
		payload
	}
}

let getCategoryIdAction = (pid,id)=>{
	return {
		type:types.SET_CATEGORY_ID,
		payload:{
			parentCategoryId:pid,
			categoryId:id
		}
	}	
}

let getImagesAction = (fileList)=>{
	return {
		type:types.SET_IMAGES,
		payload:fileList
	}	
}

let getRichEditorValAction = (value)=>{
	return {
		type:types.SET_DETAIL,
		payload:value
	}		
}

let getSaveAction = (err,values)=>{
	console.log('>>>>>>>>>>>>>>',values)
	return (dispatch,getState)=>{
		const state = getState().get('productReducer')
		const category = state.get('categoryId')
		const images = state.get('images')
		const detail = state.get('detail')
		let hasError = false

		if(err) hasError = true

		if(!category){
			dispatch(setCategoryErrAction())
			hasError = true
		}
		if(!images){
			dispatch(setImagesErrAction())
			hasError = true			
		}
		if(!detail){
			dispatch(setDetailErrAction())
			hasError = true			
		}		

		if(hasError) return //如果有err终止程序

		let method = 'post' //新增商品
		if(values.id){//编辑商品请求
			method = 'put'
		}
		dispatch(getSaveRequestAction())	
		request({
			method:method,
			url:SAVE_PRODUCT,
			data:{
				...values,
				category,
				images,
				detail
			}
		})
		.then(result=>{
			console.log('get Save::',result)
			if(result.code == 0){//保存商品成功
				message.success(result.message)
				window.location.href = '/product'
			}else{
				message.error(result.message)
			}
		})
		.catch(err=>{
			console.log(err)
			message.error(result.message)
		})
		.finally(()=>{
			dispatch(getSaveDoneAction())
		})	
	
	}
}

let getOrderAction = (id,newOreder)=>{
	return (dispatch,getState)=>{
		const state = getState().get('productReducer')
		request({
			method:'put',
			url:UPDATE_PRODUCTS_ORDER,
			data:{
				id,
				order:newOreder,
				page:state.get('current')
			}
		})
		.then(result=>{
			console.log('get product-order::',result)
			if(result.code == 0){//更新order成功
				message.success(result.message)
				const action = setPageAction(result.data)
				dispatch(action)
			}else{
				message.error(result.message)
			}
		})
		.catch(err=>{
			console.log(err)
		})	
	
	}
}

let getPageAction = (page)=>{
	return (dispatch)=>{
		dispatch(getPageRequestAction())
		request({
			method:'get',
			url:GET_PRODUCTS,
			data:{page}
		})
		.then(result=>{
			console.log('getPageProduct:',result)
			if(result.code == 0){//获取Product分页数据成功
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

let getStatusAction = (id,newStatus)=>{
	return (dispatch,getState)=>{
		const state = getState().get('productReducer')
		request({
			method:'put',
			url:UPDATE_PRODUCTS_STATUS,
			data:{
				id,
				status:newStatus,
				page:state.get('current')
			}
		})
		.then(result=>{
			console.log('get product-status::',result)
			if(result.code == 0){//更新status成功
				message.success(result.message)
				//为了保证前后台数据同步(刷新页面)
				const action = setPageAction(result.data)
				dispatch(action)					
			}else{
				message.error(result.message)
			}
		})
		.catch(err=>{
			console.log(err)
		})	
	
	}
}

let getDetailAction = (productId)=>{
	return (dispatch,getState)=>{
		const state = getState().get('productReducer')
		request({
			method:'get',
			url:GET_PRODUCT_DETAIL,
			data:{
				id:productId
			}
		})
		.then(result=>{
			console.log('get product-detail::',result)
			if(result.code == 0){
				dispatch(setProductDetailAction(result.data))				
			}else{
				message.error(result.message)
			}
		})
		.catch(err=>{
			console.log(err)
		})	
	
	}	
}

let getSearchAction = (keyword,page)=>{
	return (dispatch)=>{
		request({
			method:'get',
			url:GET_SEARCH_PRODUCT,
			data:{
				keyword,
				page
			}
		})
		.then(result=>{
			console.log('get_search_product::',result)
			if(result.code == 0){
				dispatch(setPageAction(result.data))		
			}else{
				message.error(result.message)
			}
		})
		.catch(err=>{
			console.log(err)
		})	
	
	}
}
export {
	getPageAction,
	getOrderAction,
	getCategoryIdAction,
	getImagesAction,
	getRichEditorValAction,
	getSaveAction,
	getStatusAction,
	getDetailAction,
	getSearchAction
}