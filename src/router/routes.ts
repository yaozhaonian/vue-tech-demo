import type { RouteRecordRaw } from 'vue-router'

/**
 * 路由表
 * - 公开页面：requiresAuth = false
 * - 需权限访问页面：requiresAuth = true（meta 字段，路由守卫使用）
 * - 全部使用懒加载
 */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { title: '首页', requiresAuth: false },
  },
  {
    path: '/permission',
    name: 'PermissionDemo',
    component: () => import('@/views/PermissionDemo.vue'),
    meta: { title: '权限演示', requiresAuth: true },
  },
  {
    path: '/demo/virtual-table',
    name: 'DemoVirtualTable',
    component: () => import('@/components/demo-pages/DemoVirtualTable.vue'),
    meta: { title: '虚拟滚动表格', requiresAuth: false },
  },
  {
    path: '/demo/echarts',
    name: 'DemoEcharts',
    component: () => import('@/components/demo-pages/DemoEcharts.vue'),
    meta: { title: 'ECharts图表', requiresAuth: false },
  },
  {
    path: '/demo/dialog-upload',
    name: 'DemoDialogUpload',
    component: () => import('@/components/demo-pages/DemoDialogUpload.vue'),
    meta: { title: '弹窗与上传', requiresAuth: false },
  },
  {
    path: '/demo/pagination',
    name: 'DemoPagination',
    component: () => import('@/components/demo-pages/DemoPagination.vue'),
    meta: { title: '分页组件', requiresAuth: false },
  },
  {
    path: '/performance/lazy-image',
    name: 'LazyImage',
    component: () => import('@/views/performance/LazyImage.vue'),
    meta: { title: '图片懒加载', requiresAuth: false },
  },
  {
    path: '/performance/lazy-route',
    name: 'LazyRoute',
    component: () => import('@/views/performance/LazyRoute.vue'),
    meta: { title: '路由懒加载', requiresAuth: false },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/Home.vue'),
    meta: { title: '页面不存在', requiresAuth: false },
  },
]

export default routes
