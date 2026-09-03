import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { setupRouterGuard } from './permission'

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

setupRouterGuard(router)

export default router
