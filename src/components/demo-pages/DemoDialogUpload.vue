<script setup lang="ts">
import { ref } from 'vue'
import BaseDialog from '@/components/base/BaseDialog/index.vue'
import BaseUpload from '@/components/base/BaseUpload/index.vue'
import type { UploadFileItem } from '@/components/base/BaseUpload/types'

const dialogVisible = ref(false)
const formVisible = ref(false)
const form = ref({ name: '', remark: '' })

const fileList = ref<UploadFileItem[]>([])

function onBaseConfirm() {
  dialogVisible.value = false
}

function onFormConfirm() {
  window.alert(`表单提交：${JSON.stringify(form.value)}`)
  formVisible.value = false
}

function onUploadChange(files: UploadFileItem[]) {
  fileList.value = files
}
function onUploadSuccess(file: UploadFileItem) {
  // eslint-disable-next-line no-console
  console.log('上传成功:', file.name)
}
</script>

<template>
  <div class="page-container">
    <h2 class="page-title">弹窗 + 上传组件 Demo</h2>
    <div class="card">
      <h3 style="margin-bottom: 12px">BaseDialog 基础用法</h3>
      <button class="btn btn-primary" @click="dialogVisible = true">打开基础弹窗</button>
      <button class="btn" style="margin-left: 8px" @click="formVisible = true">打开表单弹窗</button>

      <BaseDialog v-model="dialogVisible" title="基础弹窗" :width="420" @confirm="onBaseConfirm">
        <p>这是一个通用弹窗组件，支持 v-model 控制显隐、自定义标题与宽度、具名插槽 footer。</p>
      </BaseDialog>

      <BaseDialog v-model="formVisible" title="表单弹窗" :width="500" @confirm="onFormConfirm">
        <div style="display: flex; flex-direction: column; gap: 12px">
          <label>姓名：<input v-model="form.name" class="ipt" /></label>
          <label>备注：<textarea v-model="form.remark" class="ipt" rows="3"></textarea></label>
        </div>
      </BaseDialog>
    </div>

    <div class="card">
      <h3 style="margin-bottom: 12px">BaseUpload 文件上传</h3>
      <BaseUpload
        :max-size="2 * 1024 * 1024"
        :accept="['image/png', 'image/jpeg', 'image/webp']"
        multiple
        text="选择文件"
        @change="onUploadChange"
        @success="onUploadSuccess"
      />
      <p v-if="fileList.length" style="margin-top: 12px; color: #909399">
        已上传 {{ fileList.filter((f) => f.status === 'done').length }} /
        {{ fileList.length }} 个文件（mock 上传，不真实请求外部）
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ipt {
  width: 100%;
  padding: 6px 8px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
}
</style>
