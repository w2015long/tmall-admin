
import { fromJS } from 'immutable'

import {SET_PAGE,PAGE_REQUEST,
	PAGE_DONE,ADD_CATEGORY_REQUEST,
	ADD_CATEGORY_DONE,SET_LEVELONE_CATEGORY,
	SHOW_UPDATE_NAME_MODAL,
	CLOSE_UPDATE_NAME_MODAL,
	CHANGE_NAME,
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
		updateNameModalVisible:false,
		updateId:'',
		updateName:''				
})


export default (state=defaultState,action)=>{
	switch (action.type) {

		case SET_PAGE:
	  		return state.merge({
	  			list:fromJS(action.payload.list),
	  			current:action.payload.current,
	  			pageSize:action.payload.pageSize,
	  			total:action.payload.total,
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
		case SHOW_UPDATE_NAME_MODAL:
	  		return state.merge({
	  			updateNameModalVisible:true,
	  			updateId:action.payload.updateId,
	  			updateName:action.payload.updateName

	  		})
	  		break;
		case CLOSE_UPDATE_NAME_MODAL:
	  		return state.set('updateNameModalVisible',false)
	  		break;	
		case CHANGE_NAME:
	  		return state.set('updateName',action.payload.newName)
	  		break;		  			  				  				  			  			  			  			  		
		default:
	  		return state
	}
}