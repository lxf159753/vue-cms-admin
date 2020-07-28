<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>编辑管理员</span>
		</div>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="用户名" prop="username">
				<el-input v-model="ruleForm.username"></el-input>
			</el-form-item>
			<el-form-item label="昵称" prop="fullname">
				<el-input v-model="ruleForm.fullname"></el-input>
			</el-form-item>

			<el-form-item label="性别" prop="sex">
				<el-radio-group v-model="ruleForm.sex">
					<el-radio label="男"></el-radio>
					<el-radio label="女"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="手机号" prop="tel">
				<el-input v-model="ruleForm.tel"></el-input>
			</el-form-item>
			<el-form-item label="邮箱" prop="email">
				<el-input v-model="ruleForm.email"></el-input>
			</el-form-item>
			<el-form-item label="主图">
				<removePhoto :url="ruleForm.avatar" @success="handleUploadSuccess($event)" @remove="ruleForm.avatar=''"></removePhoto>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">保存修改</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
	import { Admin } from '@/api/index';
	import removePhoto from '@/components/removePhoto.vue'
	export default {
		props: ["id"],
		components: {
			removePhoto,
		},
		data() {
			return {
				ruleForm: {
					username: '',
					fullname: '',
					sex: '男',
					tel: '',
					email: '',
					avatar: '',
				},
				rules: {
					username: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 5,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
						}
					],
					fullname: [{
							required: true,
							message: '请输入昵称',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 5,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
						}
					],

					sex: [{
						sex: 'array',
						required: true,
						message: '请至少选择一个性别',
						trigger: 'change'
					}],
					tel: [{
							required: true,
							message: '请输入电话号',
							trigger: 'blur'
						},
						{

							message: '长度在 11 个字符',
							trigger: 'blur'
						}
					],
					email: [{
							required: true,
							message: '请输入邮箱号',
							trigger: 'blur'
						},
						{

							message: '长度在 11 个字符',
							trigger: 'blur'
						}
					],
				}
			}
		},
		created() {
			this.loadInfo(this.id)
		},
		watch: {
			'$route'(to, form) {
				let { id } = to.params;
				this.loadInfo(id);
			}
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (!valid) {
						return false;
					}
					let { status } = await Admin.edit(this.ruleForm);
					if (status) {
						this.$router.push({ path: '/admin/list' })
						this.$message.success('修改成功');
					}
				});
			},
			// 获取个人资料
			async loadInfo(id) {
				let { status, data } = await Admin.info({ id });
				if (status) {
					this.ruleForm = data;
				}
			},
			//头像上传成功 console.log(res)打印res,出来的是一个对象，对里面的属性进行解构
			handleUploadSuccess({ status, msg, data }) {
				this.ruleForm.avatar = data;
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},

		}
	}
</script>

<style scoped>
	button {
		float: left;
	}
</style>
