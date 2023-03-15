import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Mainbox from '../views/Mainbox.vue';
import RoutesConfig from './config';
import store from '../store/index';
const routes = [
	{
		path: '/login',
		name: 'login',
		component: Login,
	},
	{
		path: '/mainbox',
		name: 'mainbox',
		component: Mainbox,
	},
	//mainbox的嵌套路由，后面根据权限动态添加
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});
// 动态路由
// RoutesConfig.forEach((item) => {
//   router.addRoute("mianbox", item);
// });
// 路由守卫
router.beforeEach((to, from, next) => {
	if (to.name === 'login') {
		next();
	} else {
		if (!localStorage.getItem('token')) {
			next({
				path: '/login',
			});
		} else {
			if (!store.state.isGetterRouter) {
				router.removeRoute('mainbox');
				ConfigRouter();
				next({
					path: to.fullPath,
				});
			} else {
				next();
			}
		}
	}
});
const ConfigRouter = () => {
	if (!router.hasRoute('mainbox')) {
		router.addRoute({
			path: '/mainbox',
			name: 'mainbox',
			component: Mainbox,
		});
	}
	RoutesConfig.forEach((item) => {
		checkPermission(item) && router.addRoute('mainbox', item);
	});
	//改变isGetterRouter = ture
	store.commit('changeGetterRouter', true);
};
const checkPermission = (item) => {
	if (item.auth) {
		return store.state.userInfo.role;
	}
	return true;
};
export default router;
