import * as types from './actionTypes.js'
import {request,setUserName} from 'util'
import { GET_USERS } from 'api'


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
			url:GET_USERS,
			data:{
				page:page
			}
		})
		.then(result=>{
			console.log('get users:::',result)
			if(result.code == 0){
				const action = setPageAction(result.data)
				dispatch(action)
			}
		})
		.catch(err=>{
			console.log(err)
		})	
		.finally(()=>{
			dispatch(getPageDoneAction())
		})		
	}
}




export {getPageAction}