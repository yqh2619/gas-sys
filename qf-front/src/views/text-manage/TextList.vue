<template>
	<el-card>
		<el-page-header content="文章列表" icon="" title="文章管理">
			<el-row :gutter="20" justify="space-between">
        <el-col :span="16">
        <el-form :inline="true" ref="articleFormRef" :model="state.formData" class="demo-form-inline" style="margin-top:20px">
            <el-form-item label="标题" prop="title">
              <el-input
				 	    v-model="state.formData.title"
				 	    class="w-50 m-2"
				 	    placeholder="请输入标题"
				 	    :prefix-icon="Search"
				 	    type="search"
				 	    @input="Search"
				 	  />
            </el-form-item>
            <!-- 这里本来不应该直接写类型，但我不清楚你是怎么设计的，记得后面要改 -->
            <el-form-item label="类型" prop="category">
              <el-select v-model="state.formData.category" class="m-2" placeholder="请选择类型" size="large">
                 <el-option label="最新动态" :value="1" />
                 <el-option label="通知公告" :value="3"/>
                 <el-option label="典型案例" :value="2"/>
              </el-select>
            </el-form-item>
          </el-form>
          </el-col>
          <el-col :span="8" >              
              <el-button 
            type="primary" 
             style="margin-top: 25px; width: 100px" 
             :icon="Search"
             @click="searchHandle">搜索
           </el-button>
           <el-button 
            type="primary" 
             style="margin-top: 25px; width: 100px" 
             :icon="Refresh"
             @click="resetHandle(articleFormRef)">重置
           </el-button>
           <el-button
				 		type="primary"
             :icon="Download"
				 		style="margin-top: 25px; width: 100px"
				 		@click="exportTableData"
				 		>导出
            </el-button>
          </el-col>
			</el-row>
		</el-page-header>
		<el-table :data="tableData" stripe style="width: 100%" height="380px" max-height="380px" id="table">
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
        :filters="[
        { text: '发布', value: 1 },
        { text: '未发布', value: 0 },
      ]"
        :filter-method="filterIsPublish"
				v-if="$store.state.userInfo.role === 4"
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
      <el-table-column
				label="审核状态"
				v-if="$store.state.userInfo.role != 1"
			>
				<template #default="scope">
          <el-tag v-if="scope.row.verify === -2" type="danger">撤销</el-tag>
          <el-tag v-if="scope.row.verify === -1" type="danger">驳回</el-tag>
          <el-tag v-if="scope.row.verify === 0" type="info">待审批</el-tag>
          <el-tag v-if="scope.row.verify === 1" type="success">初审通过</el-tag>
          <el-tag v-if="scope.row.verify === 2" type="success">终审通过</el-tag>
				</template>
			</el-table-column>
			<el-table-column fixed="right" label="操作">
				<template #default="scope">
					<el-button
						type="warning"
						circle
						:icon="View"
						@click="handlePreView(scope.row)"
            
					/>
					<el-button
						type="primary"
						circle
						:icon="Edit"
						@click="handleEdit(scope.row)"
            v-if="$store.state.userInfo.role != 1"
					/>
					<el-popconfirm
						title="您确定要删除么?"
						confirm-button-text="确认"
						cancel-button-text="取消"
						@confirm="handleDelete(scope.row)"
            v-if="$store.state.userInfo.role != 1"
					>
						<template #reference>
							<el-button type="danger" circle :icon="Delete" />
						</template>
					</el-popconfirm>
				</template>
			</el-table-column>
		</el-table>
    <!-- 分页 -->
		<el-row class="row-bg" justify="center">
			<el-pagination
				v-model:currentPage="formJsonIn.page"
				:page-size="formJsonIn.page_size"
				:page-sizes="[1, 2, 5, 7, 10]"
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
import axios from 'axios';
import {
	Star,
	Edit,
	Delete,
	StarFilled,
	Search,
  Refresh,
  Download ,
  View
} from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import * as XLSX from 'xlsx';
import { ElMessage,ElForm} from 'element-plus';


const articleFormRef = ref(null) // 表单ref
const store = useStore();
const dialogVisible = ref(false);
const tableData = ref([]);
const previewData = ref({});
const router = useRouter();
// const searchValue = ref('');
const total = ref(0); // 数据总量

onMounted(() => {
	// getTableData();
  searchHandle();
});
// //原版
// const getTableData = async () => {
// 	// console.log('zty测试用');
// 	const res = await axios.get('/frontapi/txts/list', {
// 		params: { ...formJsonIn.value },
// 	});
//   // console.log(res.data.data);
// 	tableData.value = res.data.data;
// 	total.value = res.data.total;
// };

//表格筛选
const filterIsPublish = (value, row) => {
  // console.log(value);
  if (store.state.userInfo.role > 1) {
    return row.isPublish === value
}else{
  return row.isPublish === value[0]
}
  }
  
// 筛选过滤
const paramsFilter = (params) => {
  // console.log(params);
  const newParams = {}
  for (let i in params) {
    if(typeof params[i] === 'object'){
      let arr = JSON.parse(JSON.stringify(params[i]))
      if(arr.length > 0 ) {newParams[i] = arr}
    }
    else if (params[i] !== '') {
      newParams[i] = params[i]
    }
  }
  // console.log(newParams);
  return newParams
}
const state = reactive({
  formData:{
    title:'', // 标题
    category:'', // 类型
    isPublish: 0,
    time:[] // 时间
  }
})

// 搜索
const searchHandle = async() => {
  try {
    const obj = {
      ...state.formData,
      ...formJsonIn.value
    }
    const params = paramsFilter(obj)
    const res= await axios.post(
      '/frontapi/article/list',
      params
    );
    // console.log(state.formData);
    // tableData.value = params.data;
	  // total.value = params.data.total;
    tableData.value = res.data.data;
	  total.value = res.data.total;
  } catch (error) {
    console.log(error);

  }
}
// 重置
const resetHandle = (formRef) => {
  formRef.resetFields();
  searchHandle();
}
//格式化分类信息
const categoryFormat = (category) => {
	const arr = ['最新动态', '典型案例', '通知公告'];
	return arr[category - 1];
};
//是否发布
const handleSwichChange = async (item) => {
	await axios.put('/frontapi/txts/publish', {
		_id: item._id,
		isPublish: item.isPublish,
	});
	await  searchHandle();
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
	await  searchHandle();
};
//编辑
const handleEdit = async (item) => {
	//跳转到新建页面
	router.push(`/text-manage/edittxts/${item._id}`);
};
//导出
const exportTableData = async () => {
	let workbook = XLSX.utils.table_to_book(document.getElementById('table')); //需要在table上定义一个id
	try {
		XLSX.writeFile(workbook, '文章列表信息.xlsx');
		ElMessage({
			type: 'success',
			message: '导出成功!',
		});
    
	} catch (e) {
		ElMessage.error('导出失败,失败信息:!');
	}
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
	searchHandle(formJsonIn.value);
};
// 点击页面进行跳转
const handleCurrentChange = (row) => {
	formJsonIn.value.page = row;
	searchHandle();
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
