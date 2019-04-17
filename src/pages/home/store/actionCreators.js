import * as types from './actionTypes.js'
import {request,setUserName} from 'util'
import { ADMIN_COUNT } from 'api'


const setCountAction = payload=>{
	return {
		type:types.SET_COUNT,
		payload
	}
}
let getCountAction = (payload)=>{
	return (dispatch)=>{
		request({
			url:ADMIN_COUNT
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




export {getCountAction}