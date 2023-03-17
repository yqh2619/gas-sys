<template>
  <div>
    <el-page-header content="编辑产品"  @back="handleBack()" title="产品管理" />
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
        <el-button type="primary" @click="submitForm()">更新产品</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRouter,useRoute} from 'vue-router'
import { computed, ref, reactive,onMounted } from 'vue'
import axios from 'axios';
import upload from '@/util/upload'
import Upload from '@/components/upload/Upload'
const proFormRef = ref()
const store = useStore()
const route = useRoute();
const proForm = reactive({
  title: '',
  introduction: '',
  detail: '',
  cover: '',
  file: null,
})
onMounted(async() => {
  const res =await axios.get(`/frontapi/product/list/${route.params.id}`)
  // console.log(res.data.data[0]);
  Object.assign(proForm,res.data.data[0])
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
      const res = await upload('/frontapi/product/list', proForm)
      router.push(`/product-manage/prolist`)
    }
  })
}

const handleBack =() => {
  router.back()
}
</script>

<style lang="scss" scoped>
.demo-ruleForm {
  margin-top: 50px;
}
</style>
