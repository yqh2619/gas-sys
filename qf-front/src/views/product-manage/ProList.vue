<template>
	<div>
		<el-card>
			<el-page-header content="产品列表" icon="" title="产品管理" />
			<el-table :data="tableData" stripe style="width: 100%">
				<el-table-column prop="title" label="产品名称" />
        <el-table-column prop="introduction" label="简要描述" />
				<el-table-column label="更新时间">
					<template #default="scope">
						{{ formatTime.getTime(scope.row.editTime) }}
					</template>
				</el-table-column>
				<el-table-column fixed="right" label="操作">
					<template #default="scope">
						<el-button
							type="primary"
							circle
							:icon="Edit"
							@click="handleEdit(scope.row)"
						/>
						<el-popconfirm
							title="您确定要删除么?"
							confirm-button-text="确认"
							cancel-button-text="取消"
							@confirm="handleDelete(scope.row)"
						>
							<template #reference>
								<el-button
									type="danger"
									circle
									:icon="Delete"
								/>
							</template>
						</el-popconfirm>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
	</div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import formatTime from '@/util/formatTime.js';
import axios from 'axios';
import {  Edit, Delete } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const tableData = ref([]);
const router = useRouter();
onMounted(() => {
	getTableData();
});
const getTableData = async () => {
	const res = await axios.get('/frontapi/product/list');
	// console.log(res.data);
	tableData.value = res.data.data;
};
//删除回调
const handleDelete = async (item) => {
	// console.log(item);
	await axios.delete(`/frontapi/product/list/${item._id}`);
	await getTableData();
};
//编辑
const handleEdit = async (item) => {
	//跳转到新建页面
	router.push(`/product-manage/editproduct/${item._id}`);
};
</script>

<style lang="scss" scoped>
.el-table {
	margin-top: 20px;
}
::v-deep.htmlcontent {
	img {
		max-width: 100%;
	}
}
</style>
