<template>
	<el-container>
	  <el-header>
		  <NavBar></NavBar>
		  </el-header>
	  <el-container>
	    <el-aside  width="200px">
			<LeftMenu></LeftMenu>
		</el-aside>
	    <el-main>
			<router-view></router-view>
			</el-main>
	  </el-container>
	</el-container>


</template>

<script>
	import NavBar from '@/components/NavBar.vue'
	import LeftMenu from '@/components/LeftMenu.vue'

	export default {
		components: {
			NavBar,
			LeftMenu
		}
	}
</script>


<style>
	html,body{width: 100%;height: 100%;}
	a{
		text-decoration: none;
	}
</style>
