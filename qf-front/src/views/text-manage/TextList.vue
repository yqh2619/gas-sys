<template>
		<el-card>
			<el-page-header content="文章列表" icon="" title="文章管理" >
        <el-row :gutter="20">
          <el-col :span="6"> 
            <el-button type="primary" style="margin-top:10px; width:100px" @click="exportTableData">导出</el-button>
          </el-col>
          <el-col :span="8" style="padding: 10px;"> 
            <el-input
						v-model="searchValue"
						class="w-50 m-2"
						placeholder="请输入查询关键字"
						:prefix-icon="Search"
						type="search"
            @input="Search"
					/>
          </el-col>
          <el-col :span="4" style="padding: 10px;">
            <el-button type="primary" :icon="Search" >Search</el-button>
          </el-col>
        </el-row>
       
      </el-page-header>
			<el-table :data="tableData" stripe style="width: 100%" id="table">
				<el-table-column prop="title" label="标题" />
				<el-table-column prop="category" label="分类">
					<template #default="scope">
						{{ categoryFormat(scope.row.category) }}
					</template>
				</el-table-column>
				<el-table-column label="更新时间">
					<template #default="scope">
						{{ formatTime.getTime(scope.row.editTime) }}
					</template>
				</el-table-column>
				<el-table-column
					label="是否发布"
					v-if="$store.state.userInfo.role != 1"
				>
					<template #default="scope">
						<el-switch
							v-model="scope.row.isPublish"
							:active-value="1"
							:inactive-value="0"
							@change="handleSwichChange(scope.row)"
						/>
					</template>
				</el-table-column>
				<el-table-column fixed="right" label="操作">
					<template #default="scope">
						<el-button
							type="warning"
							circle
							:icon="Star"
							@click="handlePreView(scope.row)"
						/>
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

      <el-pagination
    v-model:currentPage="formJsonIn.page"
    :page-size="formJsonIn.page_size"
    :page-sizes="[1, 2, 5, 10, 15]"
    small
    background
    layout="total, sizes, prev, pager, next, jumper"
    :total="tableData.length"
    :current-page="formJsonIn.page"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
/>

		</el-card>
		<el-dialog v-model="dialogVisible" title="预览文章" width="80%">
			<div>
				<h2>{{ previewData.title }}</h2>
			</div>
			<div style="font-size: 12px; color: gray">
				{{ formatTime.getTime(previewData.editTime) }}
			</div>
			<el-divider>
				<el-icon><star-filled /></el-icon>
			</el-divider>
			<div v-html="previewData.content" class="htmlcontent"></div>
		</el-dialog>
</template>
<script setup>

import { ref, onMounted, reactive } from 'vue';
import formatTime from '@/util/formatTime.js';
// import inquireBox from "@/components/inquireBox/inquireBox.vue";
import axios from 'axios';
import { Star, Edit, Delete, StarFilled,Search } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import * as XLSX from 'xlsx'
import { ElMessage } from 'element-plus'

const store = useStore();
const dialogVisible = ref(false);
const tableData = ref([]);
const previewData = ref({});
const router = useRouter();
const searchValue =ref('')

onMounted(() => {
	getTableData();
});
const getTableData = async () => {
	const res = await axios.get('/frontapi/txts/list');
	// console.log(res.data);
	tableData.value = res.data.data;
};
//格式化分类信息
const categoryFormat = (category) => {
	const arr = ['最新动态', '典型案例', '通知公告'];
	return arr[category - 1];
};
//是否发布
const handleSwichChange = async (item) => {
	// console.log(isPublish);
	await axios.put('/frontapi/txts/publish', {
		_id: item._id,
		isPublish: item.isPublish,
	});
	await getTableData();
};
//预览回调
const handlePreView = (data) => {
	// console.log(data);
	previewData.value = data;
	dialogVisible.value = true;
};
//删除回调
const handleDelete = async (item) => {
	// console.log(item);
	await axios.delete(`/frontapi/txts/list/${item._id}`);
	await getTableData();
};
//编辑
const handleEdit = async (item) => {
	//跳转到新建页面
	router.push(`/text-manage/edittxts/${item._id}`);
};
//导出
// 导出table数据
  const exportTableData = async ()=> {
      let workbook = XLSX.utils.table_to_book(document.getElementById('table')); //需要在table上定义一个id
        try {
          XLSX.writeFile(workbook, '文章列表信息.xlsx');
          ElMessage({
            type: 'success',
            message: '导出成功!'
          });
        } catch (e) {
          ElMessage.error('导出失败,失败信息:!')
        }
    }
//分页
const formJsonIn = ref({
    page: 1,
    page_size: 10
})
// 选择每页多少条
const handleSizeChange = row => {
    formJsonIn.value.page_size = row
    formJsonIn.value.page = 1
    getTableData()
}
// 点击页面进行跳转
const handleCurrentChange = row => {
    formJsonIn.value.page = row
    getTableData()
}
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
