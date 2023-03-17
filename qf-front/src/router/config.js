import Home from '../views/home/Home.vue';
import Center from '../views/center/Center.vue';
import UserAdd from '../views/user-manage/UserAdd.vue';
import UserList from '../views/user-manage/UserList.vue';
import TextAdd from '../views/text-manage/TextAdd.vue';
import TextList from '../views/text-manage/TextList.vue';
import TextEdit from '../views/text-manage/TextEdit.vue';
import ProAdd from '../views/product-manage/ProAdd.vue';
import ProList from '../views/product-manage/ProList.vue';
import ProEdit from '../views/product-manage/ProEdit.vue';
import Notfound from '../views/notfound/NotFound.vue';

const routes = [
	{
		path: '/index',
		component: Home,
	},
	{
		path: '/center',
		component: Center,
	},
	{
		path: '/user-manage/useradd',
		component: UserAdd,
		auth: true,
	},
	{
		path: '/user-manage/userlist',
		component: UserList,
		auth: true,
	},
	{
		path: '/text-manage/textadd',
		component: TextAdd,
		auth: true,
	},
	{
		path: '/text-manage/textlist',
		component: TextList,
	},
	{
		path: '/text-manage/edittxts/:id',
		component: TextEdit,
	},
	{
		path: '/product-manage/proadd',
		component: ProAdd,
	},
	{
		path: '/product-manage/prolist',
		component: ProList,
	},
	{
		path: '/product-manage/editproduct/:id',
		component: ProEdit,
	},
	{
		path: '/',
		redirect: '/index',
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'Notfound',
		component: Notfound,
	},
];
export default routes;
