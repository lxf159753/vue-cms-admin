<template>
	<div>
		<el-card class="box-card">
			<div slot="header">
				<span>分类列表</span>
			</div>
			<!-- 树形组件   -->
			<el-tree ref="tree" lazy :load="loadNode" node-key="id" :default-expanded-keys="[0]" :props="defaultProps">
				<span class="custom-tree-node" slot-scope="{ node, data }">
					<span>{{ node.label }}</span>
					<span>
						<!-- :disabled="node.level==1"让第一个编辑无法选中 -->
						<el-button @click.stop="openEditModal(node,data)" type="text" icon="el-icon-edit" :disabled="node.level==1" size="mini">
							编辑
						</el-button>
						<el-button type="text" @click.stop="openInsertModal(node,data)" icon="el-icon-plus" size="mini">
							添加
						</el-button>
						<el-button type="text" @click.stop="handleRemove(node,data)" icon="el-icon-delete" size="mini">
							删除
						</el-button>
					</span>
				</span>
			</el-tree>
		</el-card>
		<!-- 添加弹窗 -->
		<el-dialog title="添加分类" :visible.sync="insertModalShow">
			<el-form :model="insertForm">
				<el-form-item label="分类名称" label-width="120px">
					<el-input v-model="insertForm.name" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="insertModalShow = false">取 消</el-button>
				<el-button type="primary" @click='handleInsertNode'>添 加</el-button>
			</div>
		</el-dialog>
		<!-- 编辑弹窗 -->
		<el-dialog title="编辑分类" :visible.sync="editModalShow">
			<el-form :model="editForm">
				<el-form-item label="分类名称" label-width="120px">
					<el-input v-model="editForm.name" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editModalShow = false">取 消</el-button>
				<el-button type="primary" @click='handleUpdateNode'>保 存</el-button>
			</div>
		</el-dialog>
	</div>

</template>

<script>
	import { Category } from '@/api/index'
	export default {
		data() {
			return {
				defaultProps: {
					label: 'name'
				},
				insertForm: {
					name: '',
					parent_id: '',
				},
				editForm: {
					id: '',
					name: '',
					parent_id: '',
				},
				nodeData: {}, //节点数据
				node: {}, //节点
				insertModalShow: false,
				editModalShow: false,
			};
		},
		methods: {
			async loadNode(node, resolve) {
				// node:节点对象
				// resolve:返回下一级节点数据的方法
				if (node.level == 0) {
					return resolve([{ id: 0, name: "全部分类" }]);
				}
				let { id } = node.data;

				let { status, data } = await Category.subcate({ id });
				if (status) {
					return resolve(data);
				}
			},
			// 编辑
			openEditModal(node, data) {
				this.editForm = { ...data };
				this.node = node;
				this.editModalShow = true;
			},

			// 编辑节点
			async handleUpdateNode() {
				let { status, msg, data } = await Category.edit({ ...this.editForm });
				if (status) {
					this.$message.success(msg);
					// 更新节点
					this.node.data = this.editForm;
					this.editModalShow = false;
				}
			},

			// 打开插入model
			openInsertModal(node, data) {
				// node:节点对象
				// data:节点数据
				console.log(node, data);
				// 转存
				this.node = node;
				this.insertForm.parent_id = data.id;
				this.insertModalShow = true;
			},

			// 插入节点
			async handleInsertNode() {
				let { status, msg, data } = await Category.add({ ...this.insertForm });
				if (status) {
					this.$message.success(msg);
					// 插入新的节点
					this.$refs.tree.append({ ...data, ...this.insertForm }, this.node);
					this.insertModalShow = false;
				}

			},
			// 删除
			handleRemove(node, data) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
						type: 'warning'
					})
					.then(async () => {
						let { status, msg } = await Category.remove({ ...data });
						if (status) {
							this.$refs.tree.remove({...data})
							this.$message.success(msg);
						}
					})
					.catch(() => {
						this.$message.info('取消删除');
					})
			}
		}
	};
</script>

<style>
	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
	}
</style>
