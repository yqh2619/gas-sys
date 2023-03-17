import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Text from '../views/Text.vue';
import Textdetail from '../views/Textdetail.vue';
import Product from '../views/Product.vue';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
	},
	{
		path: '/txt',
		name: 'txt',
		component: Text,
	},
	{
		path: '/txts/:id',
		name: 'txts',
		component: Textdetail,
	},
	{
		path: '/product',
		name: 'product',
		component: Product,
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	NProgress.start();
	next();
});
router.afterEach((to, from, next) => {
	NProgress.done();
});
export default router;
