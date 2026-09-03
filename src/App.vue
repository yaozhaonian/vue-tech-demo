<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const isHome = computed(() => route.path === '/')
</script>

<template>
  <div class="app-layout">
    <header class="app-header">
      <RouterLink to="/" class="app-logo">vue-tech-demo</RouterLink>
      <nav class="app-nav">
        <RouterLink to="/">首页</RouterLink>
        <RouterLink to="/demo/virtual-table">虚拟表格</RouterLink>
        <RouterLink to="/demo/echarts">图表</RouterLink>
        <RouterLink to="/demo/dialog-upload">弹窗上传</RouterLink>
        <RouterLink to="/demo/pagination">分页</RouterLink>
        <RouterLink to="/performance/lazy-image">图片懒加载</RouterLink>
        <RouterLink to="/performance/lazy-route">路由懒加载</RouterLink>
        <RouterLink to="/permission">权限演示</RouterLink>
      </nav>
    </header>
    <main class="app-main" :class="{ 'is-home': isHome }">
      <RouterView v-slot="{ Component }">
        <component :is="Component" />
      </RouterView>
    </main>
  </div>
</template>

<style scoped lang="scss">
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.app-header {
  display: flex;
  align-items: center;
  gap: 24px;
  height: 56px;
  padding: 0 20px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 100;
  .app-logo {
    font-size: 18px;
    font-weight: 700;
    color: #409eff;
  }
  .app-nav {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    a {
      color: #606266;
      font-size: 14px;
      &:hover,
      &.router-link-active {
        color: #409eff;
      }
    }
  }
}
.app-main {
  flex: 1;
}
</style>
