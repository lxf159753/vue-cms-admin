<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>发布文章</span>
		</div>
		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="标题">
				<el-input clearable placeholder="请输入标题" v-model="form.title" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="摘要">
				<el-input placeholder="请输入摘要" v-model="form.description" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="分类">
				<el-col :span="6">
					<el-select v-model="form.cate_1st" placeholder="请选择文章一级分类">
						<el-option v-for="option in options_1st" :key="option.id" :label="option.name" :value="option.id"></el-option>
					</el-select>
				</el-col>
				<el-col :span="6">
					<el-select v-model="form.cate_2nd" placeholder="请选择文章二级分类">
						<el-option v-for="option in options_2nd" :key="option.id" :label="option.name" :value="option.id"></el-option>
					</el-select>
				</el-col>
			</el-form-item>
			<el-form-item label="主图">
				<removePhoto :url="form.main_photo" @success="handleUploadSuccess($event)" @remove="form.main_photo=''"></removePhoto>
			</el-form-item>
			<el-form-item label="内容">
				<div ref="editor"></div>
				<!-- 等价于 -->
				<!-- <div id="editor"></div> -->
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('form')">发布文章</el-button>
			</el-form-item>


		</el-form>
	</el-card>
</template>

<script>
	// 富文本框
	import E from 'wangeditor';

	import { Category, Article } from '@/api/index';

	import removePhoto from '@/components/removePhoto.vue';

	export default {
		components: {
			removePhoto
		},
		data() {
			return {
				form: {
					title: '',
					description: '',
					cate_1st: '',
					cate_2nd: '',
					content: '',
					main_photo: ''
				},
				options_1st: [],
				options_2nd: [],
			};
		},
		// 富文本框
		mounted() {
			var editor = new E(this.$refs.editor)
			//同步form数据
			editor.customConfig.onchange = (html) => {
				this.form.content = html
			}
			// 使用 base64 保存图片
			// editor.customConfig.uploadImgShowBase64 = true  
			// 配置图片的api接口
			editor.customConfig.uploadImgServer = '/upload/editor/';
			// 配置上传的filename
			editor.customConfig.uploadFileName = 'file';
			// 自定义header
			editor.customConfig.uploadImgHeaders = {
				'Authorization': `Bearer ${sessionStorage.token}`
			};
			editor.create()
		},
		async created() {
			let options = await this.loadSubcate(0);
			this.options_1st = options;
		},
		watch: {
			'form.cate_1st': async function(val) {
				// 获取二级分类
				let options = await this.loadSubcate(val);
				this.options_2nd = options;
				this.form.cate_2nd = options[0].id
			}
		},
		methods: {
			// 获取子分类
			async loadSubcate(id) {
				let { status, data } = await Category.subcate({ id });
				return data; //return出来得是promise对象
			},
			//
			// 图片验证
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			handleAvatarSuccess(res, file, fileList) {
				if (res.status) {
					this.form.avatar = res.data;
				}
			},
			//头像上传成功 console.log(res)打印res,出来的是一个对象，对里面的属性进行解构
			handleUploadSuccess({ status, msg, data }) {
				this.form.main_photo = data;
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			// 上传
			submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						let { status } = await Article.add(this.form);
						if (status) {
							this.$router.push({ path: '/article/list' })
							this.$message.success('修改成功');
						}
					} else {
						this.$message.info('修改失败');
					}

				});
			},
			

		}
	}
</script>

<style>
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>
