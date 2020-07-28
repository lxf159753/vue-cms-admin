<template>
	<router-view>
		<!-- <div>
			<nav>
				<router-link to="/" exact active-class="current">首页</router-link>
				<router-link to="/login" exact active-class="current">登录</router-link>
				<router-link to="/register" exact active-class="current">注册</router-link>
				<router-link to="/article/list" exact active-class="current">文章列表</router-link>
			</nav>
		</div> -->

	</router-view>
</template>

<script>
	export default {
		name: 'app',

	}
</script>

<style>
	body {
		margin: 0;
	}
	/* nav{
		padding: 30px;
	}
	nav a{
		margin: 0 30px;
	}
	nav a.current{
		color: orange;
		font-weight: bold;
	} */
</style>
