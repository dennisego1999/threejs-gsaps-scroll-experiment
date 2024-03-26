import { createRouter, createWebHistory } from 'vue-router';
import Landing from '@/pages/Landing.vue';

const routes = [
	{
		path: '/',
		name: 'landing',
		component: Landing
	},
	{
		path: '/:catchAll(.*)',
		redirect: '/'
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;
