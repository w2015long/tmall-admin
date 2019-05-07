import * as types from './actionTypes.js'
import {message} from 'antd'
import {request,setUserName} from 'util'
import {GET_ORDERS,GET_SEARCH_ORDER,GET_DETAIL_ORDER,GET_DELIVER_ORDER } from 'api'

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
const setDetailOrderAction = payload=>{
	return{
		type:types.SET_DETAIL_ORDER,
		payload
	}
}


let getPageAction = (page)=>{
	return (dispatch)=>{
		dispatch(getPageRequestAction())
		request({
			method:'get',
			url:GET_ORDERS,
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
			url:GET_SEARCH_ORDER,
			data:{
				keyword,
				page
			}
		})
		.then(result=>{
			console.log('get_search_order::',result)
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
let getDetailAction = (orderNo)=>{
	return (dispatch)=>{
		request({
			method:'get',
			url:GET_DETAIL_ORDER,
			data:{orderNo}
		})
		.then(result=>{
			console.log('get_detail_order::',result)
			if(result.code == 0){
				dispatch(setDetailOrderAction(result.data))		
			}else{
				message.error(result.message)
			}
		})
		.catch(err=>{
			console.log(err)
		})	
	
	}	
}
let getDeliverAction = (orderNo)=>{
	return (dispatch)=>{
		request({
			method:'put',
			url:GET_DELIVER_ORDER,
			data:{orderNo}
		})
		.then(result=>{
			console.log('get_deliver_order::',result)
			if(result.code == 0){
				dispatch(setDetailOrderAction(result.data))		
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
	getSearchAction,
	getDetailAction,
	getDeliverAction
}