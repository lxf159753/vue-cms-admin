<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>管理员列表</span>
		</div>
		<el-table :data="tableData" border style="width: 1241px">
			<el-table-column prop="id" label="#" width="40">
			</el-table-column>
			<el-table-column prop="username" label="用户名">
			</el-table-column>
			<el-table-column prop="fullname" label="姓名">
			</el-table-column>
			<el-table-column prop="sex" label="性别">
			</el-table-column>
			<el-table-column prop="tel" label="手机号">
			</el-table-column>
			<el-table-column prop="email" label="邮箱">
			</el-table-column>
			<el-table-column prop="avatar" label="主图">
				<template slot-scope="scope">
					<el-image style="width: 100px;" :src="scope.row.avatar"></el-image>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="200">
				<template slot-scope="scope">
					<el-link :href="`#/admin/edit/${scope.row.id}`">
						<el-button type="primary" plain icon="el-icon-edit" size="mini" >编辑</el-button>
					</el-link>
					<el-button type="danger" plain icon="el-icon-delete" size="mini" @click="remove(scope.row.id,scope.$index)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</el-card>
</template>

<script>
	import { Admin } from '@/api/index';
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
				let { status, total, data } = await Admin.list({});
				if (status) {
					this.tableData = data;
				}
			},
			// 删除
			remove(id,i) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
						type: 'warning'
					})
					.then(async () => {
						let { status,data } = await Admin.remove({id:id});
						if (status) {
							// 更新DOM
							this.tableData.splice(i, 1) 
							this.$message.success('删除成功');
						}
					})
					.catch(() => {
						this.$message.info('已取消删除');
					})
			}
		}
	}
</script>

<style>
</style>
