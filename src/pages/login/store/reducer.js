
import { fromJS } from 'immutable'

import {LOGIN_FETCH,LOGIN_DONE} from './actionTypes.js'

//用fromJS生成一个immutable对象
const defaultState = fromJS({
	isFetching:false		
})


export default (state=defaultState,action)=>{
	switch (action.type) {
		case LOGIN_FETCH:
	  		return state.set('isFetching',true)
	  		break;	 
		case LOGIN_DONE:
	  		return state.set('isFetching',false)
	  		break;		  		 			  		
		default:
	  		return state
	}
}