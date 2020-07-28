import axios from 'axios';

// 获取子级分类
let subcate = (data) => axios.get('/category/sub' , {params:data});

// 添加分类
let add = (data) => axios.post('/category/add' , data);

// 编辑分类
let edit = (data) => axios.post('/category/edit',data);

// 删除
let remove = (data) => axios.post('/category/delete',data);
export default{
	subcate,
	add,
	edit,
	remove,
}