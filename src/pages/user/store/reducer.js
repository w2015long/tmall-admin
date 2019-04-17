
import { fromJS } from 'immutable'

import {SET_PAGE} from './actionTypes.js'

//用fromJS生成一个immutable对象
const defaultState = fromJS({
		list:[{
			  _id: '1',
			  username: '胡彦斌',
			  isAdmin: false,
			  email: 'w2015long@qq.com',
			  phone: '18868869699',
			  createAt:'2019-04-17 19:20:30'
			}],
})


export default (state=defaultState,action)=>{
	switch (action.type) {
		case SET_PAGE:
	  		return state.merge({
	  			list:fromJS(action.payload.list)
	  		})
	  		break;	  		
		default:
	  		return state
	}
}