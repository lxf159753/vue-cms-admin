import axios from 'axios';

// 获取用户列表列表
let list = (data) => axios.get('/user/list',{params: data});
// 删除用户
let remove = (id) => axios.delete(`/user/${id}`);
// 获取个人用户
let edit = (data) => axios.get('/user/',{params: data});
// 编辑用户
let edits = (id,data) => axios.put(`/user/${id}`,data);
export default{
	list,
	remove,
	edit,
	edits,
	
}