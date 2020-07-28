<template>
	<div class="navbar">
		<img src="../assets/img/logo.png" alt="">
		<div class="right">
			<el-dropdown>
				<span class="el-dropdown-link">
					<el-avatar class="photo" size="small" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
					<span class="fullname">赵薇</span>
					<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>黄金糕</el-dropdown-item>
					<el-dropdown-item>狮子头</el-dropdown-item>
					<el-dropdown-item>螺蛳粉</el-dropdown-item>
					<el-dropdown-item disabled>双皮奶</el-dropdown-item>
					<el-dropdown-item divided>蚵仔煎</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>

<script>
	 export default {
	    data () {
	      return {
	        
	      }
	    }
	  }
</script>

<style>
	.el-container .el-header{
		width: 100%;
		padding: 0px;
	}
	.navbar {
		width: 100%;
		background-color: black;
		color: white;
		height: 55px;
		line-height: 55px;
	}

	.navbar img {
		height: 55px;
	}

	.right {
		float: right;
		height: 55px;
		margin-right: 50px;
	}
	.right span{
		display: inline-block;
		color: #FFFFFF;
		margin-bottom: -6px;
	}
	.right .photo{
		margin-right: 10px;
		margin-top: 15px;
	}
</style>
