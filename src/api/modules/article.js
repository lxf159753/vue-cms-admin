import axios from 'axios';

// 获取文章列表
let list = (data) => axios.get('/article/list',{params: data});
// 删除文章列表
let remove = (data) => axios.post('/article/delete',data);
// 发布文章
let add = (data) => axios.post('/article/add',data);
// 编辑指定文章
let edit = (data) => axios.post('/article/edit',data);
// 获取指定文章
let detail = (data) => axios.get('/article/detail',{params: data});
export default{
	list,
	remove,
	add,
	edit,
	detail,
}