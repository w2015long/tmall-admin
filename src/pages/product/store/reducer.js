
import { fromJS } from 'immutable'

import {SET_PAGE,
	PAGE_REQUEST,
	PAGE_DONE,
	SET_CATEGORY_ID,
	SET_IMAGES,
	SET_DETAIL,
	SET_CATEGORY_ERROR,
	SET_IMAGES_ERROR,
	SET_DETAIL_ERROR,
	SAVE_REQUEST,
	SAVE_DONE,
	SET_PRODUCT_DETAIL,
} from './actionTypes.js'

//用fromJS生成一个immutable对象
const defaultState = fromJS({
		parentCategoryId:'',
		categoryId:'',
		name:'',
		images:'',
		detail:'',
		price:'',
		stock:'',
		description:'',

		categoryValidate:'',
		selectorMessage:'',
		imagesValidate:'',
		imagesMessage:'',
		detailValidate:'',
		detailMessage:'',
		isSaveFetching:false,		


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
		case SAVE_REQUEST:
	  		return state.set('isSaveFetching',true)
	  		break;	
		case SAVE_DONE:
	  		return state.set('isSaveFetching',false)
	  		break;	  		
		case SET_IMAGES:
	  		return state.merge({
	  			images:action.payload,
	  			imagesValidate:'',
	  			imagesMessage:'',	  			
	  		})
	  		break;	
		case SET_DETAIL:
	  		return state.merge({
	  			detail:action.payload,
	  			detailValidate:'',
	  			detailMessage:'',	  			
	  		})
	  		break;		  		
		case SET_CATEGORY_ID:
	  		return state.merge({
	  			parentCategoryId:action.payload.parentCategoryId,
	  			categoryId:action.payload.categoryId,
	  			categoryValidate:'',
	  			selectorMessage:'',	  			
	  		})
	  		break;	
		case SET_CATEGORY_ERROR:
	  		return state.merge({
	  			categoryValidate:'error',
	  			selectorMessage:'请选择商品分类',
	  		})
	  		break;	
		case SET_IMAGES_ERROR:
	  		return state.merge({
	  			imagesValidate:'error',
	  			imagesMessage:'请上传图片',
	  		})
	  		break;	
		case SET_DETAIL_ERROR:
	  		return state.merge({
	  			detailValidate:'error',
	  			detailMessage:'请输入商品详情',
	  		})
	  		break;

		case SET_PRODUCT_DETAIL:
	  		return state.merge({
				parentCategoryId:action.payload.category.pid,  			
				categoryId:action.payload.category._id,
				description:action.payload.description,			
				name:action.payload.name,
				images:action.payload.images,			
				price:action.payload.price,			
				stock:action.payload.stock,			
				detail:action.payload.detail,			
	  		})
	  		break;		  				  			  			  		  				  				  			  			  			  			  		
		default:
	  		return state
	}
}