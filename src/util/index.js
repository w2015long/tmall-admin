import axios from 'axios'

export const request = (options)=>{
	return new Promise((resolve,reject)=>{
		axios({
		  method:options.method || 'get',
		  url:options.url || '',
		  data:options.data || null
		})
		.then(response=>{
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
