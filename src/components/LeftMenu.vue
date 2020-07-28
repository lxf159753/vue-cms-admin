<template>
	<el-menu class="" router background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
		<el-submenu index="1">
			<template slot="title">
				<i class="el-icon-location"></i>
				<span>文章管理</span>
			</template>
				<el-menu-item index="/article/release">
					发布文章
					</el-menu-item>
				<el-menu-item index="/article/list">
					文章列表
				</el-menu-item>
		</el-submenu>
		<el-menu-item index="/classify/list">
			<i class="el-icon-menu"></i>
			<span slot="title">分类列表</span>
		</el-menu-item>
		<el-submenu index="2">
			<template slot="title">
				<i class="el-icon-location"></i>
				<span>用户管理</span>
			</template>
				<el-menu-item index="/user/list">
					用户列表
					</el-menu-item>
		</el-submenu>
		<el-submenu index="3">
			<template slot="title">
				<i class="el-icon-location"></i>
				<span>管理员管理</span>
			</template>
				<el-menu-item index="/admin/list">
					管理员列表
					</el-menu-item>
		</el-submenu>
		<el-submenu index="4">
			<template slot="title">
				<i class="el-icon-location"></i>
				<span>权限管理</span>
			</template>
				<el-menu-item index="/authority/role">权限角色</el-menu-item>
		</el-submenu>
		<el-menu-item index="/account/list">
			<i class="el-icon-setting"></i>
			<span slot="title">账户设置</span>
		</el-menu-item>
	</el-menu>
</template>
<script>
	export default {
	
	}
</script>


<style>
	.el-menu{
		height: 100%;
		color: #FFFFFF;
		;
	}
	
</style>
