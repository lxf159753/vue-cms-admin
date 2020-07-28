<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>管理员角色</span>
			<el-button type="primary" @click="openInsertModel" icon="el-icon-circle-plus-outline">添加角色</el-button>
		</div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="id" label="#" width="105px">
			</el-table-column>
			<el-table-column label="分类" prop="name">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<!-- scope.row是一个对象 -->
					<el-button type="danger" plain icon="el-icon-delete" size="mini" @click="removeRole(scope.row.id,scope.$index)">删除</el-button>

					<el-button type="primary" plain icon="el-icon-edit" size="mini" @click="editRole(scope.row.id,scope.row,scope.$index)">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
	</el-card>
</template>

<script>
	import { Authority } from '@/api/index'
	export default {
		data() {
			return {
				tableData: []
			}
		},
		created() {
			// 获取列表数据
			this.loadlist();
		},
		methods: {
			// 加载列表数据
			async loadlist() {
				let { status, total, data } = await Authority.list({});
				if (status) {
					this.tableData = data;
				}
			},
			// 添加
			openInsertModel() {
				this.$prompt("请输入添加的角色名称", "添加角色", {
						inputPattern: /\S/,
						inputErrorMessage: '角色名称格式不正确'
					})
					.then(async ({ value }) => {

						let { status, data } = await Authority.insert({ name: value });

						if (status) {
							// 更新DOM
							this.tableData.push({ name: value, ...data }) //三个点是解析data
							this.$message.success('添加成功');
						}
					})
					.catch(() => {
						this.$message.info('取消添加');
					})
			},
			// 删除
			removeRole(id, i) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
						type: 'warning'
					})
					.then(async () => {
						let { status } = await Authority.remove(id);
						if (status) {
							// 更新DOM
							this.tableData.splice(i, 1) //三个点是解析data
							this.$message.success('删除成功');
						}
					})
					.catch(() => {
						this.$message.info('已取消删除');
					})
			},
			// 编辑
			editRole(id,data, i) {
				console.log(data)
				this.$prompt("请输入添加的角色名称", "添加角色", {
						inputValue: data.name,
						inputPattern: /\S/,
						inputErrorMessage: '角色名称格式不正确'
					})
					.then(async ({value}) => {
						let { status, data } = await Authority.edit(id,{name:value});
						if (status) {
							// 更新DOM
							this.tableData[i].name = value;
							this.$message.success('添加成功');
						}
					})
					.catch(() => {
						this.$message.info('取消添加');
					})
			}



		}

	}
</script>

<style scoped>
	button {
		float: right;
	}

	.box-card {
		width: 600px;
	}

	.box-card table tr td button {
		margin-right: 25px;
	}

	.box-card table tr td:nth-child(2) button {
		margin-right: 120px;
	}
</style>
