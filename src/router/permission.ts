import type { Router } from 'vue-router'
import { useUserStore } from '@/store/modules/user'

/**
 * 路由守卫鉴权模拟
 * - 读取 localStorage 模拟 token
 * - 无 token 跳转提示并返回首页
 */
export function setupRouterGuard(router: Router) {
  router.beforeEach((to, _from, next) => {
    const userStore = useUserStore()
    const requiresAuth = to.meta.requiresAuth as boolean

    // 设置标题
    if (to.meta.title) {
      document.title = `${to.meta.title} - vue-tech-demo`
    }

    if (requiresAuth && !userStore.isLogin) {
      // 无 token 提示
      window.setTimeout(() => {
        window.alert('该页面需要登录后访问（模拟鉴权）。请在首页点击"模拟登录"。')
      }, 0)
      next({ path: '/' })
      return
    }
    next()
  })
}
