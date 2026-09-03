<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'

const router = useRouter()
const userStore = useUserStore()

const loginText = computed(() => (userStore.isLogin ? '退出模拟登录' : '模拟登录'))

function toggleLogin() {
  if (userStore.isLogin) {
    userStore.logout()
  } else {
    userStore.login('admin')
  }
}

function tryVisit() {
  // 重新触发路由守卫：先离开再回来
  router.push('/').then(() => router.push('/permission'))
}
</script>

<template>
  <div class="page-container">
    <h2 class="page-title">路由守卫鉴权演示</h2>
    <div class="card">
      <p>该页面在 <code>routes.ts</code> 中配置了 <code>meta.requiresAuth = true</code>。</p>
      <p>
        路由守卫 <code>permission.ts</code> 会检查 localStorage 中的 token，无 token 时拦截并提示。
      </p>
      <p style="margin-top: 12px">
        当前登录状态：
        <b :style="{ color: userStore.isLogin ? '#67c23a' : '#f56c6c' }">
          {{ userStore.isLogin ? '已登录' : '未登录' }}
        </b>
      </p>
      <p v-if="userStore.isLogin" style="margin-top: 8px">
        Token：{{ userStore.token }}<br />
        用户：{{ userStore.userInfo?.name }}
      </p>
      <div style="margin-top: 16px; display: flex; gap: 8px">
        <button class="btn" :class="{ 'btn-primary': !userStore.isLogin }" @click="toggleLogin">
          {{ loginText }}
        </button>
        <button class="btn" @click="tryVisit">重新触发路由守卫</button>
        <button class="btn" @click="router.push('/')">返回首页</button>
      </div>
    </div>
    <div class="card">
      <h3 style="margin-bottom: 8px">如何验证</h3>
      <ol style="padding-left: 20px; line-height: 1.8">
        <li>未登录状态下直接访问 <code>/permission</code> 会被拦截并提示</li>
        <li>点击"模拟登录"写入 token 后即可正常访问</li>
        <li>点击"退出模拟登录"清除 token，再次访问被拦截</li>
      </ol>
    </div>
  </div>
</template>
