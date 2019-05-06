
import { fromJS } from 'immutable'

import {SET_PAGE,
	PAGE_REQUEST,
	PAGE_DONE,
	SET_DETAIL_ORDER,
} from './actionTypes.js'

//用fromJS生成一个immutable对象
const defaultState = fromJS({
		order:{},

		isPageFetching:false,
		list:[],
		current:1,
		pageSize:10,
		total:0	,
		keyword:''

})

export default (state=defaultState,action)=>{
	switch (action.type) {

		case SET_PAGE:
	  		return state.merge({
	  			list:fromJS(action.payload.list),
	  			current:action.payload.current,
	  			pageSize:action.payload.pageSize,
	  			total:action.payload.total,
	  			keyword:action.payload.keyword || ''
	  		})
	  		break;
		case PAGE_REQUEST:
	  		return state.set('isPageFetching',true)
	  		break;	
		case PAGE_DONE:
	  		return state.set('isPageFetching',false)
	  		break;
		case SET_DETAIL_ORDER:
	  		return state.set('order',action.payload)
	  		break;	  				  			  			  		  				  				  			  			  			  			  		
		default:
	  		return state
	}
}