<template>
  <div>
    <el-card shadow="always" :span="24">
      <el-page-header content="添加产品" icon="" title="产品管理" />
    <el-form ref="proFormRef" :model="proForm" :rules="proFormRules" label-width="80px" class="demo-ruleForm">
      <el-form-item label="产品名" prop="title">
        <el-input v-model="proForm.title" />
      </el-form-item>
      <el-form-item label="产品简介" prop="introduction">
        <el-input v-model="proForm.introduction" type="textarea" />
      </el-form-item>
      <el-form-item label="产品详细描述" prop="detail">
        <el-input v-model="proForm.detail" type="textarea" />
      </el-form-item>
      <el-form-item label="产品图片" prop="cover">
        <Upload 
        :avatar="proForm.cover" @yyychange="handleChange" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm()">添加产品</el-button>
      </el-form-item>
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
const proFormRef = ref()
const store = useStore()
const proForm = reactive({
  title: '',
  introduction: '',
  detail: '',
  cover: '',
  file: null,
})
const proFormRules = reactive({
  title: [{ required: true, message: '请输入名字', trigger: 'blur' }],
  introduction: [{ required: true, message: '请输入介绍', trigger: 'blur' }],
  detail: [{ required: true, message: '请输入具体介绍', trigger: 'blur' }],
  cover: [{ required: true, message: '请上传产品图片', trigger: 'blur' }],
})
const avatarUrl = computed(() =>
  store.state.userInfo.avatar
    ? 'http://localhost:3000' + store.state.userInfo.avatar
    : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`
)
const handleChange = (file) => {
  proForm.cover = URL.createObjectURL(file)
  proForm.file = file
}

const router = useRouter()
const submitForm = () => {
  proFormRef.value.validate(async (valid) => {
    if (valid)
    {
      // 提交数据到后端
      // console.log(proForm);
      const res = await upload('/frontapi/product/add', proForm)
      router.push(`/product-manage/prolist`)
    }
  })
}
</script>

<style lang="scss" scoped>
.demo-ruleForm {
  margin-top: 50px;
}
</style>
