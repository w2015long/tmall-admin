import axios from 'axios'

export const request = (options)=>{
	return new Promise((resolve,reject)=>{
		axios({
		  method:options.method || 'get',
		  url:options.url || '',
		  data:options.data || null,
		  withCredentials: true
		})
		.then(response=>{
			//后台与前台保证同步
			if(response.data.code==10){//无权限
				//移除前端登陆信息
				delUserName()
				window.location.href = '/login'
				//promise 必须要有一个状态
				reject('没有权限')
			}
			resolve(response.data)
					
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
