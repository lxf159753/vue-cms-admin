<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>文章列表</span>
		</div>
		<el-table :data="tableData" border style="width: 1241px">
			<el-table-column prop="id" label="#" width="40">
			</el-table-column>
			<el-table-column prop="cate_1st_name" label="一级分类">
			</el-table-column>
			<el-table-column prop="cate_2nd_name" label="二级分类">
			</el-table-column>
			<el-table-column prop="photo" label="主图" width="100">
				<template slot-scope="scope">
					<el-image style="width: 100px;" :src="scope.row.main_photo"></el-image>
				</template>
			</el-table-column>
			<el-table-column prop="title" label="标题" width="260">
			</el-table-column>
			<el-table-column prop="create_time" label="发布日期">
			</el-table-column>
			<el-table-column prop="update_time" label="更新日期">
			</el-table-column>
			<el-table-column prop="address" label="操作" width="250">
				<template slot-scope="scope">
					<el-link :href="`#/article/edit/${scope.row.id}`">
						<el-button type="primary" plain icon="el-icon-edit" size="mini" >编辑</el-button>
					</el-link>
					<el-button type="danger" plain icon="el-icon-delete" size="mini" @click="remove(scope.row.id,scope.$index)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</el-card>

</template>

<script>
	import { Article } from "@/api/index";

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
				let { status, total, data } = await Article.list({ pagesize: 100, pageindex: 1 });
				if (status) {
					this.tableData = data;
				}
			},
			remove(id,i) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
						type: 'warning'
					})
					.then(async () => {
						let { status,data } = await Article.remove({id:id});
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
