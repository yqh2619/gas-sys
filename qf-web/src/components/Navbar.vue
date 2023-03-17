<template>
	<div class="navbar">
		<el-menu
			:default-active="route.fullPath"
			class="el-menu-demo"
			mode="horizontal"
			background-color="#545c64"
			text-color="#fff"
			active-text-color="#ffd04b"
			:router="true"
		>
			<el-menu-item index="/">首页</el-menu-item>
			<el-menu-item index="/txt">文章中心</el-menu-item>
			<el-menu-item index="/product">产品与服务</el-menu-item>
			<el-menu-item index="" @click="handleClick">后台登录</el-menu-item>
			<div class="right">企业门户官网</div>
		</el-menu>
	</div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const handleClick = () => {
	window.location = 'http://localhost:8080';
};
</script>

<style lang="scss" scoped>
.navbar {
	position: sticky;
	top: 0px;
	z-index: 1000;
}
.right {
	position: fixed;
	top: 0;
	right: 20px;
	widows: 100px;
	height: 59px;
	line-height: 59px;
	text-align: center;
	color: white;
}
</style>
