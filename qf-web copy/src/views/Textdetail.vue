<template>
	<div class="container">
	<el-row :gutter="20">
		<el-col :span="17" :offset="1" style="overflow-x: hidden">
			<h2>{{ currentTxts.title }}</h2>
			<div class="time">
				{{ whichTime(currentTxts.editTime) }}
			</div>
			<el-divider>
				<el-icon><star-filled /></el-icon>
			</el-divider>
			<div v-html="currentTxts.content" class="htmlcontent"/>
		</el-col>
		<el-col :span="4" :offset="1" :pull="1" >
			<el-card class="box-card">
				<template #header>
					<div class="card-header">
						<span style="font-size: 16px; font-weight: bold">
							最近上传文章
						</span>
					</div>
				</template>
				<div 
        v-for="item in topTxts" :key="item._id" 
        class="text item" 
        style="padding:14px"
        @click="handleChange(item._id)"
        >
					<span>{{ item.title }}</span>
					<div class="bottom">
						<time class="time">{{
							whichTime(item.editTime)
						}}</time>
					</div>
				</div>
			</el-card>
		</el-col>
	</el-row>
	<!-- <el-backtop :visibility-height="100" /> -->
</div>
</template>

<script setup>
import { StarFilled } from '@element-plus/icons-vue';
import { ref, onMounted, watchEffect,onBeforeUnmount } from 'vue';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';
import { useRoute ,useRouter} from 'vue-router';
import { Star } from '@element-plus/icons-vue';
moment.locale('zh-cn');
const route = useRoute();
const router = useRouter();
const currentTxts = ref({});
const topTxts = ref([]);
const stop= watchEffect(async () => {
  if(!route.params.id) return;
	const res1 = await axios.get(`/webapi/txts/list/${route.params.id}`);
	const res2 = await axios.get(`/webapi/txts/toplist?limit=6`);
	// console.log(res2.data.data);
	currentTxts.value = res1.data.data[0];
	topTxts.value = res2.data.data;
	// console.log(_.groupBy(txtsList.value,item=>item.category));
});
onBeforeUnmount(() => {
  console.log("onBeforeUnmount");
  stop()
} )
const whichTime = (time) => {
	return moment(time).format('lll');
};
const handleChange=(id) => {
  // console.log(id);
  router.push(`/txts/${id}`);
}
</script>

<style lang="scss" scoped>
.container{
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 5px;
  padding: 0 10px; /* 给gutter留padding */
}
.el-row {
	margin-top: 30px;
  box-sizing: border-box;
}
.time {
	font-size: 12px;
	color: gray;
}
::v-deep.htmlcontent {
  width: 100%;
	img {
		max-width: 100%;
	}
}
</style>
