<template>
  <div>
    <el-card>
      <el-page-header content="用户列表" icon="" title="用户管理" />
      <el-table :data="tableData" stripe style="width: 100%" height="460px" max-height="460px">
        <el-table-column label="头像">
          <template #default="scope">
            <div v-if="scope.row.avatar">
              <el-avatar :size="50" :src="'http://localhost:3000' + scope.row.avatar"></el-avatar>
            </div>
            <div v-else>
              <el-avatar :size="50" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" />
        <el-table-column label="角色">
          <template #default="scope">
            <!-- {{ scope.row === 1 ? '管理员' : '用户' }} -->
            <el-tag v-if="scope.row.role === 1">用户</el-tag>
            <el-tag v-if="scope.row.role === 2" type="danger">加油站业务人员</el-tag>
            <el-tag v-if="scope.row.role === 3" type="warning">片区油料销售分公司业务人员</el-tag>
            <el-tag v-if="scope.row.role === 4" type="success">省级油料销售公司业务人员</el-tag>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作">
          <template #default="scope">

            <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-popconfirm title="您确定要删除么?" confirm-button-text="确认" cancel-button-text="取消"
              @confirm="handleDelete(scope.row)">
              <template #reference>
                <el-button type="danger" size="small">删除</el-button>
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
    <el-dialog v-model="dialogVisible" title="编辑用户" width="50%">
      <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="80px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="userForm.password" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="userForm.role" class="m-2" placeholder="Select" style="width:100%">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="个人简介" prop="introduction">
          <el-input v-model="userForm.introduction" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleEditConfirm()">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { onMounted, ref, reactive } from "vue";
import axios from "axios";
const dialogVisible = ref(false);
const tableData = ref();
const userFormRef = ref();
const total = ref(0); 

let userForm = ref({
  username: "",
  password: "",
  role: 1,
  introduction: "",
});
const userFormRules = reactive({
  username: [{ required: true, message: "请输入名字", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  role: [{ required: true, message: "请选择角色", trigger: "blur" }],
  introduction: [{ required: true, message: "请输入介绍", trigger: "blur" }],
});
const options = [
  {
    label: "用户",
    value: 1
  },
  {
    label: "加油站业务人员",
    value: 2
  },
  {
    label: "片区油料销售分公司业务人员",
    value: 3
  },
  {
    label: "省级油料销售公司业务人员",
    value: 4
  }
];

onMounted(() => {
  getTableData()
})
const getTableData = async () => {
  const res = await axios.get("/frontapi/user/list",{
		params: { ...formJsonIn.value },
	})
  // console.log(res.data.data);
  // console.log(res.data.total);

  tableData.value = res.data.data;
	total.value = res.data.total;
}
//编辑回调
const handleEdit = async (data) => {
  console.log(data);
  await axios.get(`/frontapi/user/list/${data._id}`);
  // console.log(res.data);
  userForm.value = data
  // Object.assign(userForm.value, data)
  dialogVisible.value = true;
}
//确认回调
const handleEditConfirm = () => {
  userFormRef.value.validate(async (valid) => {
    if (valid)
    {
      // console.log(userForm);
      await axios.put(`/frontapi/user/list/${userForm.value._id}`, userForm.value)
      //2弹窗隐藏
      dialogVisible.value = false;
      //3、刷新页面
      getTableData()
    }

  })

}
const handleDelete = async (data) => {
  // console.log(data);
  await axios.delete(`/frontapi/user/list/${data._id}`);
  getTableData()
}
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
.row-bg{
  margin: 20px;
}
</style>
