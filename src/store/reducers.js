
import { combineReducers } from 'redux-immutable'

import loginReducer from 'pages/login/store/'
import homeReducer from 'pages/home/store/'
import userReducer from 'pages/user/store/'
import categoryReducer from 'pages/category/store/'
import productReducer from 'pages/product/store/'
import orderReducer from 'pages/order/store/'

export default combineReducers({
	loginReducer,
	homeReducer,
	userReducer,
	categoryReducer,
	productReducer,
	orderReducer
})