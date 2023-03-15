<template>
	<el-header>
		<div class="left">
			<el-icon @click="handleCollapse">
				<Menu />
			</el-icon>
			<span style="margin-left: 10px">加油站管理系统</span>
		</div>
		<div class="right">
			欢迎{{ store.state.userInfo.username }}回来!
			<el-dropdown :hide-on-click="false">
				<span class="el-dropdown-link">
					<el-icon :size="30" color="white" style="margin-left: 5px">
						<UserFilled />
					</el-icon>
				</span>

				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item @click="handleCenter"
							>个人中心</el-dropdown-item
						>
						<el-dropdown-item @click="handleLoginOut"
							>退出</el-dropdown-item
						>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</el-header>
</template>
<script setup>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { Menu, ArrowDown, UserFilled } from '@element-plus/icons-vue';
const store = useStore();
const router = useRouter();
const handleCollapse = () => {
	store.commit('changeCollapse');
};
const handleCenter = () => {
	router.push('/center');
};
const handleLoginOut = () => {
	localStorage.removeItem('token');
	store.commit('clearUserInfo');
	router.push('/login');
};
</script>
<style lang="scss" scoped>
.el-header {
	background-color: #2d3a4b;
	color: white;
	width: 100%;
	height: 60px;
	line-height: 60px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.left,
.right {
	display: flex;
}

.left {
	i {
		margin: auto;
		cursor: pointer;
	}
}

.right {
	.el-dropdown {
		margin: auto;
	}
}

.example-showcase .el-dropdown-link {
	cursor: pointer;
	color: var(--el-color-primary);
	display: flex;
	align-items: center;
}
</style>
