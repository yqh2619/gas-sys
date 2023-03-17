<template>
	<div>
		<el-carousel
			height="calc(100vh - 59px)"
			direction="vertical"
			:autoplay="false"
			v-if="loopList.length"
		>
			<el-carousel-item v-for="item in loopList" :key="item._id">
				<div
					class="item"
					:style="{
						backgroundImage: `url(http://localhost:3000${item.cover})`,
					}"
				>
					<el-card class="box-card">
						<template #header>
							<div class="card-header">
								<h2>{{ item.title }}</h2>
							</div>
						</template>
					<div>{{ item.introduction }}</div>
          <div class="detail" >
            {{ item.detail }}</div>
            <div class="more" >
              更多信息，请访问：
              <br>
              https://github.com/
            </div>
					</el-card>
				</div>
			</el-carousel-item>
		</el-carousel>
		<el-empty description="很遗憾，目前暂无产品..." v-else />
	</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const loopList = ref([]);
onMounted(async () => {
	const res = await axios.get('/webapi/product/list');
	// console.log(res);
	loopList.value = res.data.data;
	// console.log(_.groupBy(txtsList.value,item=>item.category));
});
</script>

<style lang="scss" scoped>
.item {
	width: 100%;
	height: 100%;
	background-size: cover;
}
.box-card{
  width: 50%;
  height: 100%;
  background-color: rgba(249, 246, 240, 0.822);
  .detail,.more{
margin-top:20px ;
  }
}
</style>
