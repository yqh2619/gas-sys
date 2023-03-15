<template>
	<div>
		<el-page-header content="添加文章" icon="" title="文章管理" />
		<el-form
			ref="txtFormRef"
			:model="txtForm"
			:rules="txtFormRules"
			label-width="80px"
			class="demo-ruleForm"
		>
			<el-form-item label="标题" prop="title">
				<el-input v-model="txtForm.title" />
			</el-form-item>
			<el-form-item label="内容" prop="content">
				<editor @event="handleChange" />
			</el-form-item>
      <el-form-item label="类别" prop="category">
				<el-select
					v-model="txtForm.category"
					class="m-2"
					placeholder="Select"
					style="width: 100%"
				>
					<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					/>
				</el-select>
			</el-form-item>
      <el-form-item label="封面" prop="cover">
        <Upload 
        :avatar="txtForm.cover" @yyychange="handleUploadChange" />
			</el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">添加文章</el-button>
      </el-form-item>
		</el-form>
	</div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import editor from '@/components/editor/Editor.vue';
import { useRouter } from 'vue-router'
import upload from '@/util/upload';
import Upload from '@/components/upload/Upload';
const router = useRouter()
const txtFormRef = ref();
const txtForm = reactive({
	title: '',
	content: '',
	category: 1, //1最新动态、2典型案例、3通知公告
	cover: '',
	file: null,
	isPublish: 0, //是否发布 0未发布，1已发
});
const txtFormRules = reactive({
	title: [
		{
			required: true,
			message: '请输入标题',
			trigger: 'blur',
		},
	],
	content: [
		{
			required: true,
			message: '请输入内容',
			trigger: 'blur',
		},
	],
	category: [
		{
			required: true,
			message: '请选择分类',
			trigger: 'blur',
		},
	], //1最新动态、2典型案例、3通知公告
	cover: [
		{
			required: true,
			message: '请上传图片',
			trigger: 'blur',
		},
	],
});
//每次editor内容改变的回调
const handleChange = (data) => {
  // console.log(data);
  txtForm.content=data
}
const options = [
	{
		label: '最新动态',
		value: 1,
	},
	{
		label: '典型案例',
		value: 2,
	},
	{
		label: '通知公告',
		value: 3,
	},
];
const handleUploadChange = (file) => {
  txtForm.cover = URL.createObjectURL(file)
  txtForm.file = file
}
const submitForm = () => {
  txtFormRef.value.validate(async (valid) => {
    if (valid)
    {
      // 提交数据到后端
      // console.log(txtForm);
      //后台通信

      const res = await upload('/frontapi/txts/add', txtForm)
      router.push(`/text-manage/TextList`)
    }
  })
}
</script>

<style lang="scss" scoped>
.el-form {
	margin-top: 50px;
}
</style>
