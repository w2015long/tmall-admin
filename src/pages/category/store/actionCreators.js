import * as types from './actionTypes.js'
import {request,setUserName} from 'util'
import { GET_CATEGORIES } from 'api'


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
let getAddCategoryAction = (values)=>{
	return (dispatch)=>{
		dispatch(getAddRequestAction())
		request({
			url:GET_CATEGORIES,
			data:{
				values
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
			dispatch(getAddDoneAction())
		})		
	}
}




export {getAddCategoryAction}