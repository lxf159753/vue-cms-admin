import axios from 'axios';

// 登录
let login = (data) => axios.post('/admin/login',data);
// 注册
let register = (data) => axios.post('/admin/register',data);
// 管理员的个人资料(用的是get方法)
let info = (data) => axios.get('/admin/info',{params:data});
// 管理员列表(用的是get方法)
let list = (data) => axios.get('/admin/list',{params:data});
// 编辑管理员
let edit = (data) => axios.post('/admin/info',data);
// 删除管理员
let remove = (data) => axios.post('/admin/delete',data);
//输出
export default {
	login,
	register,
	info,
	list,
	edit,
	remove,
}

