// Axios 是一个基于 promise 的 HTTP 库
import axios from 'axios';

// loading服务方式
import { Loading, Message } from 'element-ui';
// 路由实例
import router from '@/router/index'
// loading实例
let loading

// 设置默认baseURL
// 全局的 axios 配置默认值
axios.defaults.baseURL = 'http://localhost:3001';

// 请求拦截器
axios.interceptors.request.use(function(config) {
	// 开启loading
	loading = Loading.service({ background: "rgba(0,0,0,0.3)" });
	// 判断是否携带token
	if (config.url == '/admin/register' || config.url == '/admin/login') {
		return config;
	}
	// 获取token
	let token = sessionStorage.token;
	// 无token
	if (!token) {
		Message.error("无效的Token,请重新登录！");
		// 延迟一秒跳转
		setTimeout(() => {
			router.replace('/login')
			loading.close();
		}, 1000);

	}
	// 把token放在请求头部发送给服务器
	config.headers.Authorization = `Bearer ${token}`;

	return config;
}, function(error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});


// 添加响应拦截器
axios.interceptors.response.use(function(response) {
	let { status, data } = response;
	// 关闭loading
	loading.close();

	return data;

}, function(error) {
	// 对响应错误做点什么
	return Promise.reject(error);
});
