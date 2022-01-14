import routes from '@/router/routes'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router
