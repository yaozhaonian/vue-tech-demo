<script setup lang="ts">
import { ref } from 'vue'
import type { BaseUploadProps, BaseUploadEmits, UploadFileItem } from './types'
import { mockUploadFile } from '@/api/mockApi'
import { uniqueId } from '@/utils'

const props = withDefaults(defineProps<BaseUploadProps>(), {
  accept: () => ['image/png', 'image/jpeg', 'image/webp'],
  maxSize: 5 * 1024 * 1024,
  multiple: false,
  text: '点击上传',
})

const emit = defineEmits<BaseUploadEmits>()

const inputRef = ref<HTMLInputElement | null>(null)
const fileList = ref<UploadFileItem[]>([])

function trigger() {
  inputRef.value?.click()
}

function handleChange(e: Event) {
  const target = e.target as HTMLInputElement
  const files = target.files
  if (!files || files.length === 0) return
  const incoming = Array.from(files)
  target.value = ''
  incoming.forEach((file) => {
    if (props.accept.length && !props.accept.includes(file.type)) {
      emit('error', makeItem(file, 'error'), `不支持的文件类型：${file.type}`)
      return
    }
    if (file.size > props.maxSize) {
      emit('exceed', file)
      emit(
        'error',
        makeItem(file, 'error'),
        `文件大小超过限制：${(props.maxSize / 1024 / 1024).toFixed(1)}MB`
      )
      return
    }
    upload(file)
  })
}

function makeItem(file: File, status: UploadFileItem['status']): UploadFileItem {
  return {
    uid: uniqueId('upload'),
    name: file.name,
    size: file.size,
    raw: file,
    status,
  }
}

async function upload(file: File) {
  const item = makeItem(file, 'uploading')
  fileList.value.push(item)
  emit('change', fileList.value)
  try {
    const res = await mockUploadFile(file)
    item.url = res.data.url
    item.status = 'done'
    emit('success', item)
  } catch (err) {
    item.status = 'error'
    emit('error', item, (err as Error).message)
  } finally {
    emit('change', fileList.value)
  }
}

function remove(uid: string) {
  fileList.value = fileList.value.filter((f) => f.uid !== uid)
  emit('change', fileList.value)
}

function formatSize(size: number) {
  if (size < 1024) return `${size}B`
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)}KB`
  return `${(size / 1024 / 1024).toFixed(2)}MB`
}
</script>

<template>
  <div class="base-upload">
    <input
      ref="inputRef"
      type="file"
      class="base-upload__input"
      :accept="accept.join(',')"
      :multiple="multiple"
      @change="handleChange"
    />
    <button class="btn btn-primary" @click="trigger">{{ text }}</button>
    <ul v-if="fileList.length" class="base-upload__list">
      <li v-for="f in fileList" :key="f.uid" class="base-upload__item">
        <span class="name" :title="f.name">{{ f.name }}</span>
        <span class="size">{{ formatSize(f.size) }}</span>
        <span class="status" :class="f.status">
          {{ f.status === 'uploading' ? '上传中...' : f.status === 'done' ? '完成' : '失败' }}
        </span>
        <button class="remove-btn" @click="remove(f.uid)">移除</button>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.base-upload__input {
  display: none;
}
.base-upload__list {
  margin-top: 12px;
}
.base-upload__item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 0;
  border-bottom: 1px dashed #ebeef5;
  .name {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .size {
    color: #909399;
    font-size: 12px;
  }
  .status {
    font-size: 12px;
    &.done {
      color: #67c23a;
    }
    &.error {
      color: #f56c6c;
    }
    &.uploading {
      color: #e6a23c;
    }
  }
  .remove-btn {
    border: none;
    background: transparent;
    color: #f56c6c;
    cursor: pointer;
  }
}
</style>
