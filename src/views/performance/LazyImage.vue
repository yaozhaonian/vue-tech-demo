<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { lazyImageDirective as vLazy } from '@/composables/useImageLazy'

// 生成 N 张图片地址，使用 picsum 公共图床 + 自定义尺寸（懒加载进入视口才请求）
// 注意：仍需联网加载真实图片。如完全离线可改为本地 test-demo.webp 重复展示。
const IMG_COUNT = 30
const images = Array.from({ length: IMG_COUNT }, (_, i) => ({
  id: i,
  url: `https://picsum.photos/seed/tech-demo-${i}/640/360.webp`,
  fallback: new URL('@/assets/images/test-demo.webp', import.meta.url).href,
}))

const loadedCount = ref(0)
const observer = ref<IntersectionObserver | null>(null)

onMounted(() => {
  // 计数器：观察真实 img 进入视口
  observer.value = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadedCount.value++
        observer.value?.unobserve(entry.target)
      }
    })
  })
  document.querySelectorAll<HTMLImageElement>('.lazy-item img').forEach((el) => {
    observer.value?.observe(el)
  })
})

onBeforeUnmount(() => {
  observer.value?.disconnect()
})
</script>

<template>
  <div class="page-container">
    <h2 class="page-title">图片懒加载 Demo</h2>
    <div class="card">
      <p>共 {{ images.length }} 张 webp 图片，进入视口才加载（含 v-lazy 指令实现）。</p>
      <p>已进入视口：{{ loadedCount }} / {{ images.length }}</p>
    </div>
    <div class="grid">
      <div v-for="img in images" :key="img.id" class="lazy-item">
        <img
          v-lazy="img.url"
          :alt="`pic-${img.id}`"
          @error="($event.target as HTMLImageElement).src = img.fallback"
        />
        <span class="label">#{{ img.id }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}
.lazy-item {
  position: relative;
  background: #f5f7fa;
  border-radius: 6px;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    min-height: 160px;
  }
  .label {
    position: absolute;
    left: 8px;
    top: 8px;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 12px;
  }
}
</style>
