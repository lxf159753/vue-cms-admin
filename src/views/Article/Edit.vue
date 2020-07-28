<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>修改文章</span>
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
					<el-select v-model="form.cate_1st" @change="handleCate_1stChange" placeholder="请选择文章一级分类">
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
				<el-button type="primary" @click="submitForm('form')">保存修改</el-button>
			</el-form-item>


		</el-form>
	</el-card>
</template>

<script>
	import { Article } from '@/api/index';

	import { Category } from '@/api/index';
	
	import removePhoto from '@/components/removePhoto.vue';
	// 富文本框
	import E from 'wangeditor';


	export default {
		props: ['id'],
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
		async mounted() {
			//获取一级分类
			this.options_1st = await this.loadSubcate(0);
			//获取文章详情
			let article = await this.loadDetail(this.id);
			this.form = article;
			//获取二级分类
			this.options_2nd = await this.loadSubcate(article.cate_1st);
			var editor = new E(this.$refs.editor)
			editor.customConfig.onchange = (html) => {
				this.form.content = html
			}
			editor.create()
			editor.txt.html(this.form.content)

		},

		methods: {
			// 获取文章详情
			async loadDetail(id) {
				let { status, data } = await Article.detail({ id });
				if (status) {
					return data;
				}
			},
			// 获取一级分类
			async loadSubcate(id) {
				let { status, data } = await Category.subcate({ id });
				if (status) {
					return data;
				} //return出来得是promise对象
			},
			// 一级分类change
			async handleCate_1stChange(val) {
				let options = await this.loadSubcate(val);
				this.options_2nd = options;
				this.form.cate_2nd = options[0].id;
			},
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
						let { status,data } = await Article.edit(this.form);
						if (status) {
							this.$router.data = this.form
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

<style scoped>
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
