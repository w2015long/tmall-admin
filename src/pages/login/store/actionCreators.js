import * as types from './actionTypes.js'
import axios from 'axios'
import {message} from 'antd';

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
		axios({
		  method:'post',
		  url:'http://127.0.0.1:3000/admin/login',
		  data:values
		})
		.then(response=>{
			console.log(response);
			if(response.data.code==0){//登陆成功
				window.location.href = '/'
			}else if(response.data.code==1){
				message.error(response.data.message)
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