
import { fromJS } from 'immutable'

import {SET_COUNT} from './actionTypes.js'

//用fromJS生成一个immutable对象
const defaultState = fromJS({
		usernum:100,
		productnum:120,
		ordernum:199
})

export default (state=defaultState,action)=>{
	switch (action.type) {
		case SET_COUNT:
	  		return state.merge({
	  			usernum:action.payload.usernum,
	  			productnum:action.payload.productnum,
	  			ordernum:action.payload.ordernum
	  		})
	  		break;	  			  		
		default:
	  		return state
	}
}