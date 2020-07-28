<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>编辑用户</span>
		</div>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="用户名" prop="username">
				<el-input v-model="ruleForm.username"></el-input>
			</el-form-item>
			<el-form-item label="昵称" prop="nickname">
				<el-input v-model="ruleForm.nickname"></el-input>
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
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">保存修改</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>
<script>
	import {User} from '@/api/index';
	export default {
		data() {
			return {
				ruleForm: {
					username: '',
					nickname: '',
					sex: '男',
					tel: '',
				},
				rules: {
					username: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 3,
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
							min: 3,
							max: 5,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
						}
					],
					// sex: [{
					// 	type: 'array',
					// 	required: true,
					// 	message: '请至少选择一个性别',
					// 	trigger: 'change'
					// }],
					// tel: [{
					// 		required: true,
					// 		message: '请输入电话号',
					// 		trigger: 'blur'
					// 	},
					// 	{
					// 		min: 11,
					// 		max: 11,
					// 		message: '长度在 11 个字符',
					// 		trigger: 'blur'
					// 	}
					// ],

				}
			};
		},
		created() {
			this.loadInfo(this.$route.params.id)
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate(async(valid) => {
					if(!valid){
						return false
					}
					let {status , data} = await User.edits(this.$route.params.id,{...this.ruleForm})
					 if(status){
						 this.$message.success('修改成功');
					 } else {
						 this.$message.info('修改失败');
					 }
				});
			},
			async loadInfo(id) {
				let { status, data } = await User.edit({ id });
				if (status) {
					this.ruleForm = data;
				}
			}
		}
	}
</script>
<style>
</style>
