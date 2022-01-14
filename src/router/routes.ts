import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
	},
]

export default routes
