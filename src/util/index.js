import axios from 'axios'

export const request = (options)=>{
	return new Promise((resolve,reject)=>{
		const obj = {
		  method:options.method || 'get',
		  url:options.url || '',
		  // data:options.data || null,
		  withCredentials: true
		}
		switch(obj.method.toUpperCase()){
			//GET 与 DELETE请求发送数据为 params
			//其他请求(post,put)请求时发送数据用data
			case 'GET':
			case 'DELETE':
				obj.params = options.data
				break;
			default:
				obj.data = options.data	

		}
		axios(obj)
		.then(response=>{
			//后台与前台保证同步
			if(response.data.code==10){//无权限
				//移除前端登陆信息
				delUserName()
				window.location.href = '/login'
				//promise 必须要有一个状态
				reject('没有权限')
			}else{
				resolve(response.data)
			}
			
					
		})
		.catch(err=>{
			reject(err)
		})		
	})
}

export const setUserName = (username)=>{
	window.localStorage.setItem('username',username)
}

export const getUserName = ()=>{
	return window.localStorage.getItem('username')
}

export const delUserName = ()=>{
	window.localStorage.removeItem('username')
}
