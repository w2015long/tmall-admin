
//整个应用的入口文件
import React from 'react'
import ReactDOM from 'react-dom'
//将整个应用的store传递到所有子组件
import { Provider } from 'react-redux'
import store from './store'
import App from './App.js'



ReactDOM.render(
	//将整个应用的store传递到所有子组件
	<Provider store={store}>
    	<App />
  	</Provider>,
	document.getElementById('root'))



