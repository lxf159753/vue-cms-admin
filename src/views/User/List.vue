<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>用户列表</span>
		</div>
		<el-table :data="tableData" border style="width: 1241px">
			<el-table-column prop="id" label="#">
			</el-table-column>
			<el-table-column prop="username" label="用户名">
			</el-table-column>
			<el-table-column prop="nickname" label="昵称">
			</el-table-column>
			<el-table-column prop="sex" label="性别">
			</el-table-column>
			<el-table-column prop="tel" label="手机号">
			</el-table-column>
			<el-table-column prop="address" label="操作" width="250">
				<template slot-scope="scope">
					<el-link :href="`#/user/edit/${scope.row.id}`">
						<el-button type="primary" plain icon="el-icon-edit" size="mini" >编辑</el-button>
					</el-link>
					<el-button type="danger" plain icon="el-icon-delete" size="mini" @click="remove(scope.row.id,scope.$index)">删除</el-button>
				</template>
			</el-table-column>

			</el-table-column>
		</el-table>
	</el-card>
</template>

<script>
	import { User } from '@/api/index';
	export default {
		data() {
			return {
				tableData: [],

			}
		},
		created() {
			// 获取列表数据
			this.loadlist();
		},
		methods: {
			// 加载列表数据
			async loadlist() {
				let { status, total, data } = await User.list({});
				if (status) {
					this.tableData = data;
				}
			},
			remove(id, i) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
						type: 'warning'
					})
					.then(async () => {
						let { status } = await User.remove(id);
						if (status) {
							// 更新DOM
							this.tableData.splice(i, 1)
							this.$message.success('删除成功');
						}
					})
					.catch(() => {
						this.$message.info('已取消删除');
					})
			},
		}

	}
</script>

<style>
</style>
