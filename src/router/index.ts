import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Login from '@/components/login/Login.vue';
import Home from '../components/home/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
