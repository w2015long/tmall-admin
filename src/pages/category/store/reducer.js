
import { fromJS } from 'immutable'

import {SET_PAGE,PAGE_DONE,PAGE_REQUEST} from './actionTypes.js'

//用fromJS生成一个immutable对象
const defaultState = fromJS({
		isAddFetching:false,
		levelOneCategories:[],
		list:[],
		current:1,
		pageSize:10,
		total:0	,
		
})


export default (state=defaultState,action)=>{
	switch (action.type) {
		case SET_PAGE:
	  		return state.merge({
	  			list:fromJS(action.payload.list),
	  			current:action.payload.current,
	  			pageSize:action.payload.pageSize,
	  			total:action.payload.total
	  		})
	  		break;
		case PAGE_REQUEST:
	  		return state.set('isFetching',true)
	  		break;	
		case PAGE_DONE:
	  		return state.set('isFetching',false)
	  		break;		  			  			  		
		default:
	  		return state
	}
}