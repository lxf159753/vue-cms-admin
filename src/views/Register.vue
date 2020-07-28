<template>
	<div class="picture">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>注册</span>
			</div>
			<el-form :model="ruleForm" status-icon ref="ruleForm" :rules="rules" label-width="80px" class="demo-ruleForm">
				<el-form-item label="账户" prop="username">
					<!-- prop='username'对应的是rules里面的username -->
					<el-input clearable placeholder="请输入账号" prefix-icon="el-icon-user" v-model="ruleForm.username" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input placeholder="请输入密码" prefix-icon="el-icon-key" show-password v-model="ruleForm.password" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="checkPass">
					<el-input placeholder="请输入密码" prefix-icon="el-icon-key" show-password v-model="ruleForm.checkPass" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="姓名" prop="fullname">
					<el-input placeholder="请输入姓名" prefix-icon="el-icon-user" v-model="ruleForm.fullname" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="ruleForm.sex">
						<el-radio label="男"></el-radio>
						<el-radio label="女"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="手机号" prop="tel">
					<el-input placeholder="请输入手机号" prefix-icon="el-icon-phone" v-model="ruleForm.tel" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item>
					<el-checkbox label="同意本站用户协议" name="type"></el-checkbox>
				</el-form-item>
				<el-form-item>
					<el-button class="btn" type="primary" @click="handleRegister('ruleForm')">注册</el-button>
				</el-form-item>
			</el-form>
			<div class="action-box">
				<router-link to="/login">账号登录</router-link>
				<router-link to="/">忘记密码</router-link>
			</div>
		</el-card>
	</div>
</template>

<script>
	import { Admin } from '@/api/index'
	
	export default {
		data() {
			var handleCheckPass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.ruleForm.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				ruleForm: {
					username: '',
					password: '',
					checkPass: '',
					fullname: '',
					tel: '',
					sex: '男',
					type: []
				},
				rules: {
					username: [{
							type: '',
							required: true,
							message: '请输入账户名称',
							trigger: 'blur'
						}, // 判断输入的是否为空
						{
							min: 3,
							max: 5,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
						} //判断输入的是否正确   trigger:用什么方式来触发验证
					],
					password: [{
							type: 'string',
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							pattern: /^\d{6,}$/,
							message: '密码长度长度至少六位数字',
							trigger: 'blur'
						}
					],
					checkPass: [{
						validator: handleCheckPass,
						trigger: 'blur'
					}],
					fullname: [{
							type: '',
							required: true,
							message: '请输入账户名称',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 5,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
						}
					],
					sex: [{
						required: true,
						message: '请选择性别',
						trigger: 'change'
					}],
					tel: [{
							type: 'string',
							required: true,
							message: '请输入手机号',
							trigger: 'blur'
						},
						{
							pattern: /^\d{13,}$/,
							message: '手机号长度长度至少13位数字',
							trigger: 'blur'
						}
					],
					type: [{
						equired: true,
						message: '请同意协议',
						trigger: 'change'
					}]


				}
			}
		},
		methods: {
			handleRegister(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (!valid) {
						return false;
					}
					let { status, msg , data } = await Admin.register({ ...this.ruleForm });
					
					if (status) {
						this.$message.success(msg);
						// 跳转到文章列表页面
						this.$router.replace('/login');
						
						// 登陆成功储存Token,id,editRole
						sessionStorage.token= data.token;
						sessionStorage.uid = data.id;
						sessionStorage.role = data.role;
						
					} else {
						this.$message.error(msg);
					}
				});
			}
		}

	}
</script>

<style scoped>
	html,
	body {
		height: 100%;
		width: 100%;
	}

	.picture {
		height: 100%;
		width: 100%;
		background: url(../assets/img/login-bg.jpg) top center no-repeat;
		background-size: cover;
	}

	.box-card {
		position: absolute;
		right: 60px;
		top: 50%;
		transform: translateY(-50%);
	}

	.action-box {
		display: flex;
		font-size: 13px;
		justify-content: space-between;
	}

	button a {
		color: #FFFFFF;
	}

	a {
		color: #000000;
		text-decoration: none;
	}
</style>
