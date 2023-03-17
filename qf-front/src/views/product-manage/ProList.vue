<template>
	<div>
		<el-card>
			<el-page-header content="产品列表" icon="" title="产品管理" />
			<el-table :data="tableData" stripe style="width: 100%" height="460px" max-height="460px">
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
      <el-row class="row-bg" justify="center">
			<el-pagination
				v-model:currentPage="formJsonIn.page"
				:page-size="formJsonIn.page_size"
				:page-sizes="[1, 2, 5, 10, 15]"
				small
				background
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
				:current-page="formJsonIn.page"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			/>
		</el-row>
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
const total = ref(0); // 数据总量

onMounted(() => {
	getTableData();
});
const getTableData = async () => {
	const res = await axios.get('/frontapi/product/list', {
		params: { ...formJsonIn.value },});
	// console.log(res.data);
	tableData.value = res.data.data;
  total.value = res.data.total;
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
//分页
const formJsonIn = ref({
	page: 1,
	page_size: 10,
});
// 选择每页多少条
const handleSizeChange = (row) => {
	formJsonIn.value.page_size = row;
	formJsonIn.value.page = 1;
	getTableData(formJsonIn.value);
};
// 点击页面进行跳转
const handleCurrentChange = (row) => {
	formJsonIn.value.page = row;
	getTableData();
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
.row-bg{
  margin: 20px;
}
</style>
