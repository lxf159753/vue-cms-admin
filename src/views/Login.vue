<template>
	<div class="picture">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>登录</span>
			</div>
			<el-form :model="ruleForm" :rules="rules" status-icon ref="ruleForm" label-width="60px" class="demo-ruleForm">
				<el-form-item label="账户" prop="username">
					<el-input clearable placeholder="请输入账号" prefix-icon="el-icon-user" v-model="ruleForm.username" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input placeholder="请输入密码" prefix-icon="el-icon-key" show-password v-model="ruleForm.password" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button class="btn" type="primary" @click="handleLogin('ruleForm')">
						登录
						<!-- <router-link to="/article/list">登录</router-link> -->
					</el-button>
				</el-form-item>
			</el-form>
			<div class="action-box">
				<router-link to="/register">注册账户</router-link>
				<router-link to="/">忘记密码</router-link>
			</div>
		</el-card>
	</div>
</template>
<script>
	// import命令，用于加载@/api/index文件，并从中输入变量。import命令接受一对大括号，
	// 里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块（@/api/index）对外接口的名称相同。
	import { Admin } from '@/api/index'

	console.log(Admin);

	export default {
		data() {
			return {
				ruleForm: {
					username: '',
					password: '',
				},
				rules: {
					username: [{
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
					password: [{
							type: 'string',
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							pattern: /^\d{3,}$/,
							message: '密码长度至少三位数字',
							trigger: 'blur'
						}
					],
				},
			}
		},
		methods: {
			handleLogin(formName) {
				// 表单验证 
				// async紧跟在await的前面
				this.$refs[formName].validate(async (valid) => {
					if (!valid) {
						// 校验失败
						return false;
					}
					// 获取表单数据发送ajax
					let { status, msg, data } = await Admin.login({ ...this.ruleForm });

					if (status) {
						// 登陆成功储存Token,id,editRole
						sessionStorage.token = data.token;
						sessionStorage.uid = data.id;
						sessionStorage.role = data.role;
						// 成功提示
						this.$message.success(msg);

						// 是否有redirect参数
						let { redirect } = this.$route.query;
						if (redirect) {
							this.$router.replace(redirect);
						} else {
							// 默认跳转路由
							this.$router.replace('/article/list');
						}

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
