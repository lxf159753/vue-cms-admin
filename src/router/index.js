import Vue from 'vue'
import VueRouter from 'vue-router'
import { Message } from 'element-ui'

Vue.use(VueRouter)

// 页面级组件

import Layout from '@/components/Layout.vue'

const routes = [{
		// 给路由起一个别名alias,让它成为两个地址
		path: '/login',
		alias: '/',
		name: 'Login',
		component: () => import('@/views/Login.vue'),
		meta: { requiresAuth: false },
	},
	{
		path: '/register',
		name: 'Register',
		component: () => import('@/views/Register.vue'),
		meta: { requiresAuth: false },
	},
	{
		path: '/article/',
		name: 'Article',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
				path: 'list',
				name: 'ArticleList',
				component: () => import('@/views/Article/List.vue')
			},
			{
				path: 'release',
				name: 'ArticleRelease',
				component: () => import('@/views/Article/Release.vue')
			},
			{
				path: 'edit/:id',
				name: 'ArticleEdit',
				component: () => import('@/views/Article/Edit.vue'),
				props:true
			}

		]
	},
	{
		path: '/user/',
		name: 'User',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
				path: 'list',
				name: 'UserList',
				component: () => import('@/views/User/List.vue')
			},
			{
				path: 'edit/:id',
				name: 'UserEdit',
				component: () => import('@/views/User/Edit.vue'),
				props:true
			}
		]
	},
	{
		path: '/admin/',
		name: 'Admin',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
				path: 'list',
				name: 'AdminList',
				component: () => import('@/views/Admin/List.vue')
			},
			{
				path: 'edit/:id',
				name: 'AdminEdit',
				component: () => import('@/views/Admin/Edit.vue'),
				props: true
			}
		]
	},
	{
		path: '/authority/',
		name: 'Authority',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
			path: 'role',
			name: 'AuthorityRole',
			component: () => import('@/views/Authority/Role.vue')
		}]
	},
	{
		path: '/account/',
		name: 'Account',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
			path: 'list',
			name: 'AccountList',
			component: () => import('@/views/Account/List.vue')
		}]
	},
	{
		path: '/classify/',
		name: 'Classify',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
			path: 'list',
			name: 'ClassifyList',
			component: () => import('@/views/Classify/List.vue')
		}]
	}

]

const router = new VueRouter({
	routes
})

// 全局守卫
router.beforeEach((to, from, next) => {
	// 根据meta元信息,校验路由是否需要登录授权
	let isRequireAuth = to.matched.some((path) => path.meta.requiresAuth);
	// 不需要登录
	if(!isRequireAuth){
		next();
		return;
	}
	// 需要登录
	//校验token
	let token = sessionStorage.token;
	// 有token,放行
	if (token) {
		next();
		return;
	}
	// 无token强制跳转登录
	Message.error('无效的token，请重新登录!');
	setTimeout(() => {
		next(`/login?redirect=${to.path}`);
	}, 2000);
});

export default router
