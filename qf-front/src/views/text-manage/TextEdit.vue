<template>
	<div>
		<el-row :gutter="20" justify="space-between">
			<el-col :span="$store.state.userInfo.role >= 2 ? 18 : 24">
				<el-card>
					<el-page-header
						content="编辑文章"
						title="文章管理"
						@back="handleBack()"
					/>
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
							<editor
								@event="handleChange"
								:content="txtForm.content"
								v-if="txtForm.content"
							/>
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
								:avatar="txtForm.cover"
								@yyychange="handleUploadChange"
							/>
						</el-form-item>
						<el-row justify="end">
							<el-button type="primary" @click="submitForm()"
								>修改文章</el-button
							>
						</el-row>
					</el-form>
				</el-card>
			</el-col>
			<el-col
				:span="$store.state.userInfo.role >= 2 ? 6 : 0"
				v-if="$store.state.userInfo.role >= 2"
			>
				<el-card class="box-card">
					<el-page-header
						content="审核文章"
						title="文章管理"
						icon=""
					/>
          <div class="verify">				
          <el-form-item label="审核状态" prop="verify">
						<el-select
							v-model="txtForm.verify"
							class="m-2"
							placeholder="Select"
							style="width: 100%"
						>
							<el-option
								v-for="item in SelectOption2()"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							/>
						</el-select>
					</el-form-item>
					<el-form-item label="驳回原因" prop="verifyContent">
						<el-input
							v-model="txtForm.verifyContent"
							type="textarea"
							placeholder="请输入打回原因"
						/>
					</el-form-item>
        </div>

					<el-row justify="end">
						<el-button type="primary" @click="submitForm()"
							>提交审批</el-button
						>
					</el-row>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import editor from '@/components/editor/Editor.vue';
import { useRouter, useRoute } from 'vue-router';
import upload from '@/util/upload';
import Upload from '@/components/upload/Upload';
import axios from 'axios';
import { useStore } from 'vuex';
const store = useStore();
const router = useRouter();
const route = useRoute();
const txtFormRef = ref();

const txtForm = reactive({
	title: '',
	content: '',
	category: 1, //1最新动态、2典型案例、3通知公告
	cover: '',
	file: null,
	isPublish: 0, //是否发布 0未发布，1已发
	verify: 0,
	verifyContent: '',
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
	txtForm.content = data;
  // txtForm.verifyContent =data;
};
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

//实现不同身份显示的审批条件不同
const SelectOption2 = () => {
	if (store.state.userInfo.role === 2) {
		const options2 = [
			{
				label: '撤销',
				value: -2,
			},
			{
				label: '待审核',
				value: 0,
			},
		];
		return options2;
	} else if (store.state.userInfo.role === 3) {
		const options2 = [
			{
				label: '驳回',
				value: -1,
			},
			{
				label: '初审通过',
				value: 1,
			},
		];
		return options2;
	} else if (store.state.userInfo.role === 4) {
		const options2 = [
			{
				label: '驳回',
				value: -1,
			},
			{
				label: '终审通过',
				value: 2,
			},
		];
		return options2;
	} else {
		const options2 = [
			{
				label: '待审批',
				value: 0,
			},
		];
		return options2;
	}
};

const handleUploadChange = (file) => {
	txtForm.cover = URL.createObjectURL(file);
	txtForm.file = file;
};
const submitForm = () => {
	txtFormRef.value.validate(async (valid) => {
		if (valid) {
			// 提交数据到后端
			// console.log(txtForm);
			//后台通信
			const res = await upload('/frontapi/txts/list', txtForm);
			router.back();
		}
	});
};
const handleBack = () => {
	router.back();
};
onMounted(async () => {
	// console.log(params);
	// console.log(route.params);
	const res = await axios.get(`/frontapi/txts/list/${route.params.id}`);
	// console.log(txtForm);
	Object.assign(txtForm, res.data.data[0]);
});
</script>

<style lang="scss" scoped>
.el-form {
	margin-top: 50px;
}
.box-card{
  height: 100%;
}
.verify{
  margin-top: 40px;
}
</style>
