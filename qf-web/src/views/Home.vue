<template>
	<div class="container">
		<el-carousel height="calc(100vh - 59px)" >
			<el-carousel-item :key="1">
				<div
					:style="{
						backgroundImage: `url(${require('@/assets/home1.jpg')})`,
					}"
				></div>
			</el-carousel-item>
      <el-carousel-item :key="2">
				<div
					:style="{
						backgroundImage: `url(${require('@/assets/home2.jpg')})`,
					}"
				></div>
			</el-carousel-item>
      <el-carousel-item :key="3">
				<div
					:style="{
						backgroundImage: `url(${require('@/assets/home3.jpg')})`,
					}"
				></div>
			</el-carousel-item>
      <el-carousel-item :key="4">
				<div
					:style="{
						backgroundImage: `url(${require('@/assets/home4.jpg')})`,
					}"
				></div>
			</el-carousel-item>
      <el-carousel-item :key="5">
				<div
					:style="{
						backgroundImage: `url(${require('@/assets/home5.jpg')})`,
					}"
				></div>
			</el-carousel-item>
      <el-carousel-item :key="6">
				<div
					:style="{
						backgroundImage: `url(${require('@/assets/home6.jpg')})`,
					}"
				></div>
			</el-carousel-item>
		</el-carousel>
    <div class="center">
      速捷+油站
    </div>
	</div>
</template>

<script setup></script>

<style lang="scss" scoped>
.el-carousel div {
	width: 100%;
	height: 100%;
	background-size: cover;
}
.cotainer{
  position: relative;
}
.center{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  height: 100px;
  line-height: 100px;
  font-size: 60px;
  color: white;
  text-align: center;
}
</style>
