import * as types from './actionTypes.js'
import {request,setUserName} from 'util'
import { GET_USERS } from 'api'


const setPageAction = payload=>{
	return {
		type:types.SET_PAGE,
		payload
	}
}
let getPageAction = (page)=>{
	return (dispatch)=>{
		request({
			url:GET_USERS,
			data:{
				page
			}
		})
		.then(result=>{
			if(result.code == 0){
				const action = setCountAction(result.data)
				dispatch(action)
			}
		})
		.catch(err=>{
			console.log(err)
		})			
	}
}




export {getPageAction}