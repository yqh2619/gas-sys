<template>
	<div class="container">
		<div
			class="txts-header"
			:style="{
				backgroundImage: `url(${require('@/assets/bgimg5.jpg')})`,
			}"
		/>
		<div class="search">
			<el-popover
				placement="bottom"
				title="搜索内容"
				width="70%"
				:visible="visible"
			>
				<template #reference>
					<el-input
						v-model="searchText"
						class="w-50 m-2"
						placeholder="请输入文章关键字"
						:prefix-icon="Search"
						type="search"
						size="large"
						@input="visible = true"
						@blur="visible = false"
					/>
				</template>
				<div v-if="searchTxtslist.length">
					<div
						v-for="data in searchTxtslist"
						:key="data._id"
						class="search-item"
            @click="handleChangePage(data._id)"
					>
						{{ data.title }}
					</div>
				</div>
				<div v-else="searchTxtslist.length">
					<el-empty
						description="暂无相关文章"
						:image-size="50"
					></el-empty>
				</div>
			</el-popover>
		</div>
		<div class="toptxts">
			<el-row :gutter="20">
				<el-col :span="6" v-for="item in topTxtslist" :key="item._id">
					<el-card :body-style="{ padding: '0px' }" shadow="hover"
          @click="handleChangePage(item._id)">
						<div
							class="image"
							:style="{
								backgroundImage: `url(http://localhost:3000${item.cover})`,
							}"
						/>
						<div style="padding: 14px">
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
		</div>
		<el-tabs v-model="whichTab" class="demo-tabs">
			<el-tab-pane
				:key="item.name"
				v-for="item in tabList"
				:label="item.label"
				:name="item.name"
			>
				<!-- {{item.label}} -->
				<el-row :gutter="20">
					<el-col :span="18">
						<div
							v-for="data in tabTxts[item.name]"
							:key="item._id"
							style="padding: 10px"
						>
							<!-- {{ data.title }} -->
							<el-card
								:body-style="{ padding: '0px' }"
								shadow="hover"
                @click="handleChangePage(data._id)"
							>
								<div
									class="tab-image"
									:style="{
										backgroundImage: `url(http://localhost:3000${data.cover})`,
									}"
								/>
								<div style="padding: 14px; float: left">
									<span>{{ data.title }}</span>
									<div class="bottom">
										<time class="tab-time">{{
											whichTime(data.editTime)
										}}</time>
									</div>
								</div>
							</el-card>
						</div>
					</el-col>
					<el-col :span="6">
						<el-timeline>
							<el-timeline-item
								v-for="(data, index) in tabTxts[item.name]"
								:key="index"
								:timestamp="whichTime(data.editTime)"
							>
								{{ data.title }}
							</el-timeline-item>
						</el-timeline>
					</el-col>
				</el-row>
			</el-tab-pane>
		</el-tabs>
    <el-backtop :visibility-height="100" />
	</div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue';
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';
import { useRouter } from 'vue-router';
const searchText = ref('');
const visible = ref(false);
const txtsList = ref([]);
moment.locale('zh-cn');
const whichTab = ref(1);
onMounted(async () => {
	const res = await axios.get('/webapi/txts/list');
	// console.log(res.data);
	txtsList.value = res.data.data;
	// console.log(_.groupBy(txtsList.value,item=>item.category));
});
const searchTxtslist = computed(() =>
	searchText.value
		? txtsList.value.filter((item) => item.title.includes(searchText.value))
		: []
);
const topTxtslist = computed(() => txtsList.value.slice(0, 4));
const whichTime = (time) => {
	return moment(time).format('lll');
};
const tabList = [
	{
		label: '最新动态',
		name: 1,
	},
	{
		label: '典型案例',
		name: 2,
	},
	{
		label: '通知公告',
		name: 3,
	},
];
const tabTxts = computed(() =>
	_.groupBy(txtsList.value, (item) => item.category)
);
const router= useRouter()
const handleChangePage=(id)=>{
  // console.log(id);
  router.push(`/txts/${id}`);
}
</script>

<style lang="scss" scoped>
.cotainer {
	position: relative;
}
.txts-header {
	width: 100%;
	height: 400px;
	background-size: 100%;
	background-position: center; /* 居中图像 */
	background-repeat: no-repeat; /* 不要重复图像 */
}
.search {
	position: absolute;
	top: 350px;
	width: 100%;
	text-align: center;
	.el-input {
		width: 70%;
	}
}
.search-item {
	height: 50px;
	line-height: 50px;
	&:hover {
		color: rgb(252, 167, 39);
		background: whitesmoke;
	}
}
.toptxts {
	margin: 20px;
	.image {
		width: 100%;
		height: 150px;
		background-size: cover;
	}
	.time {
		font-size: 12px;
		color: gray;
	}
}
.demo-tabs {
	margin: 20px;
}
.tab-image {
	width: 150px;
	height: 100px;
	background-size: cover;
	float: left;
}
.tab-time {
	font-size: 12px;
	color: gray;
}
</style>
