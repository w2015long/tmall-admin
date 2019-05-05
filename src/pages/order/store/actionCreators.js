import * as types from './actionTypes.js'
import {message} from 'antd'
import {request,setUserName} from 'util'
import {SAVE_PRODUCT,GET_PRODUCTS,
	UPDATE_PRODUCTS_ORDER,GET_SEARCH_PRODUCT } from 'api'

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



const setPageAction = payload=>{
	return {
		type:types.SET_PAGE,
		payload
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
			console.log('getPageOrder:',result)
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
	getSearchAction
}