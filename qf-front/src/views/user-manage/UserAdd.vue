<template>
  <div>
    <el-card shadow="always" :span="24" style="height: 620px;">
      <el-page-header content="添加用户" icon="" title="用户管理" />
    <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="80px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userForm.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="userForm.password" />
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-select v-model="userForm.role" class="m-2" placeholder="Select" style="width: 100%">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="个人简介" prop="introduction">
        <el-input v-model="userForm.introduction" type="textarea" />
      </el-form-item>

      <el-form-item label="头像" prop="avatar">
        <Upload 
        :avatar="userForm.avatar" @yyychange="handleChange" />
      </el-form-item>
      <el-row justify="end">
        <el-button type="primary" @click="submitForm()" style="width: 200px ;height: 40px;">添加用户</el-button>
      </el-row>
    </el-form>
  </el-card>

  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { computed, ref, reactive } from 'vue'
import upload from '@/util/upload'
import Upload from '@/components/upload/Upload'
const userFormRef = ref()
const store = useStore()

const avatarUrl = computed(() =>
  store.state.userInfo.avatar
    ? 'http://localhost:3000' + store.state.userInfo.avatar
    : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`
)
const handleChange = (file) => {
  userForm.avatar = URL.createObjectURL(file)
  userForm.file = file
}
const userForm = reactive({
  username: '',
  password: '',
  role: 1,
  introduction: '',
  avatar: '',
  file: null,
  gender: 0,
})
const userFormRules = reactive({
  username: [{ required: true, message: '请输入名字', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  role: [{ required: true, message: '请选择角色', trigger: 'blur' }],
  introduction: [{ required: true, message: '请输入介绍', trigger: 'blur' }],
  avatar: [{ required: true, message: '请上传头像', trigger: 'blur' }],
})

const options = [
  {
    label: '用户',
    value: 1,
  },
  {
    label: '加油站业务人员',
    value: 2,
  },
  {
    label: '片区油料销售分公司业务人员',
    value: 3,
  },
  {
    label: '省级油料销售公司业务人员',
    value: 4,
  },
]
const router = useRouter()
const submitForm = () => {
  userFormRef.value.validate(async (valid) => {
    if (valid)
    {
      // 提交数据到后端
      // console.log(userForm);
      const res = await upload('/frontapi/user/add', userForm)
      router.push(`/user-manage/userList`)
    }
  })
}
</script>

<style lang="scss" scoped>
.demo-ruleForm {
  margin-top: 50px;
}
</style>
