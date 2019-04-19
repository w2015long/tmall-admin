
import { fromJS } from 'immutable'

import {SET_PAGE,PAGE_REQUEST,
	PAGE_DONE,ADD_CATEGORY_REQUEST,
	ADD_CATEGORY_DONE,SET_LEVELONE_CATEGORY,
} from './actionTypes.js'

//用fromJS生成一个immutable对象
const defaultState = fromJS({
		isAddFetching:false,
		levelOneCategories:[],
		isPageFetching:false,
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
	  		return state.set('isPageFetching',true)
	  		break;	
		case PAGE_DONE:
	  		return state.set('isPageFetching',false)
	  		break;
	
		case ADD_CATEGORY_REQUEST:
	  		return state.set('isAddFetching',true)
	  		break;	
		case ADD_CATEGORY_DONE:
	  		return state.set('isAddFetching',false)
	  		break;	
		case SET_LEVELONE_CATEGORY:
	  		return state.set('levelOneCategories',fromJS(action.payload))
	  		break;		  			  			  			  			  		
		default:
	  		return state
	}
}