<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>账户资料</span>
		</div>
		<el-form :model="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="用户名" prop="username">
				<el-input  v-model="ruleForm.username"></el-input>
			</el-form-item>
			<el-form-item label="昵称" prop="fullname">
				<el-input  v-model="ruleForm.fullname"></el-input>
			</el-form-item>
			<el-form-item label="角色" prop="region">
				<el-select  v-model="ruleForm.region" placeholder="请选择角色">
					<el-option label="管理员" value="admin-one"></el-option>
					<el-option label="超级管理员" value="admin-two"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="性别" prop="sex">
				<el-radio-group  v-model="ruleForm.sex">
					<el-radio label="男"></el-radio>
					<el-radio label="女"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="手机号" prop="tel">
				<el-input  v-model="ruleForm.tel"></el-input>
			</el-form-item>
			<el-form-item label="邮箱" prop="email">
				<el-input  v-model="ruleForm.email"></el-input>
			</el-form-item>
		<!-- 	<el-form-item label="主图">
				<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"
				 :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
					<img v-if="imageUrl" :src="imageUrl" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item> -->
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">保存修改</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
			ruleForm: {
						username: 'admin',
						fullname: '赵薇',
						region:"超级管理员",
						sex: '女',
						tel: '15826846698',
						email: '65115541@56.com'
					},
					// imageUrl:'@/assets/img/5.jpg'
				
			}
		}
	}
</script>

<style>
</style>
