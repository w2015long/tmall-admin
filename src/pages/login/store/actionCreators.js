import * as types from './actionTypes.js'
import {request,setUserName} from 'util'
import { ADMIN_LOGIN } from 'api'
import {message} from 'antd';

import axios from 'axios'


let getFetchAction = ()=>{
	return {
		type:types.LOGIN_FETCH
	}
}

let getFetchDoneAction = ()=>{
	return {
		type:types.LOGIN_DONE
	}
}

let getLoginAction = (values)=>{
	return dispatch=>{
        // this.setState(()=>({isFetching:true}))
        dispatch(getFetchAction())
		request({
		  method:'post',
		  url:ADMIN_LOGIN,
		  data:values
		})
		.then(result=>{
			// console.log('?>>>>>>>>>>>',result);
			if(result.code==0){//登陆成功
				//保存登陆用户到浏览器客户端
				setUserName(result.data.username)
				window.location.href = '/'
			}else if(result.code==1){
				message.error(result.message)
			}
		})
		.catch(err=>{
			message.error('服务器错误，请稍后重试')
		})
		.finally(()=>{
			dispatch(getFetchDoneAction())
			// this.setState(()=>({isFething:false}))
		})
	
		
	}
}

export {getLoginAction}