<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'

const router = useRouter()
const userStore = useUserStore()

const navList = [
  {
    name: '虚拟滚动表格',
    desc: '手写大数据表格，1200+条数据流畅滚动',
    path: '/demo/virtual-table',
  },
  { name: 'ECharts 图表', desc: '折线/柱状图切换、时间筛选', path: '/demo/echarts' },
  { name: '弹窗与上传', desc: 'BaseDialog + BaseUpload 联动', path: '/demo/dialog-upload' },
  { name: '分页组件', desc: 'BasePagination 完整分页', path: '/demo/pagination' },
  { name: '图片懒加载', desc: 'webp 图片 + IntersectionObserver', path: '/performance/lazy-image' },
  { name: '路由懒加载', desc: '动态 import 演示', path: '/performance/lazy-route' },
  { name: '权限演示', desc: '路由守卫鉴权（需登录）', path: '/permission' },
]

function go(path: string) {
  router.push(path)
}

function toggleLogin() {
  if (userStore.isLogin) {
    userStore.logout()
  } else {
    userStore.login('admin')
  }
}

const loginText = computed(() => (userStore.isLogin ? '退出模拟登录' : '模拟登录'))
</script>

<template>
  <div class="home page-container">
    <header class="home__header">
      <div>
        <h1 class="home__title">vue-tech-demo</h1>
        <p class="home__subtitle">技术演示项目 · 工程化实践与通用组件封装</p>
      </div>
      <div class="home__user">
        <span v-if="userStore.isLogin" class="user-info">
          <img :src="userStore.userInfo?.avatar" alt="avatar" class="avatar" />
          {{ userStore.userInfo?.name }}
        </span>
        <button class="btn" :class="{ 'btn-primary': !userStore.isLogin }" @click="toggleLogin">
          {{ loginText }}
        </button>
      </div>
    </header>

    <section class="home__grid">
      <div v-for="item in navList" :key="item.path" class="home__card" @click="go(item.path)">
        <h3>{{ item.name }}</h3>
        <p>{{ item.desc }}</p>
        <span class="home__path">{{ item.path }}</span>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.home {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }
  &__title {
    font-size: 28px;
    color: #303133;
  }
  &__subtitle {
    color: #909399;
    margin-top: 6px;
  }
  &__user {
    display: flex;
    align-items: center;
    gap: 12px;
    .user-info {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .avatar {
      width: 28px;
      height: 28px;
      border-radius: 50%;
    }
  }
  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 16px;
  }
  &__card {
    background: #fff;
    border-radius: 6px;
    padding: 16px;
    box-shadow: var(--shadow-base);
    cursor: pointer;
    transition:
      transform 0.15s,
      box-shadow 0.15s;
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
    }
    h3 {
      font-size: 16px;
      margin-bottom: 6px;
      color: #303133;
    }
    p {
      color: #606266;
      font-size: 13px;
      min-height: 40px;
    }
  }
  &__path {
    display: inline-block;
    margin-top: 8px;
    color: #409eff;
    font-size: 12px;
    font-family: monospace;
  }
}
</style>
