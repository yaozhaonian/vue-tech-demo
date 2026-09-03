<script setup lang="ts">
import { computed } from 'vue'
import type { BaseDialogProps, BaseDialogEmits } from './types'

const props = withDefaults(defineProps<BaseDialogProps>(), {
  title: '提示',
  width: 480,
  closable: true,
  closeOnClickMask: false,
  showFooter: true,
  confirmText: '确认',
  cancelText: '取消',
})

const emit = defineEmits<BaseDialogEmits>()

const visible = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})

const dialogWidth = computed(() =>
  typeof props.width === 'number' ? `${props.width}px` : props.width
)

function close() {
  visible.value = false
  emit('close')
}
function onMaskClick() {
  if (props.closeOnClickMask) close()
}
function onConfirm() {
  emit('confirm')
}
function onCancel() {
  emit('cancel')
  close()
}
</script>

<template>
  <Teleport to="body">
    <Transition name="base-dialog">
      <div v-if="visible" class="base-dialog__mask" @click.self="onMaskClick">
        <div class="base-dialog" :style="{ width: dialogWidth }">
          <div class="base-dialog__header">
            <span class="base-dialog__title">{{ title }}</span>
            <button v-if="closable" class="base-dialog__close" @click="close">×</button>
          </div>
          <div class="base-dialog__body">
            <slot></slot>
          </div>
          <div v-if="showFooter || $slots.footer" class="base-dialog__footer">
            <slot name="footer">
              <button class="btn" @click="onCancel">{{ cancelText }}</button>
              <button class="btn btn-primary" @click="onConfirm">{{ confirmText }}</button>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.base-dialog__mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}
.base-dialog {
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border-bottom: 1px solid #ebeef5;
  }
  &__title {
    font-size: 16px;
    font-weight: 600;
  }
  &__close {
    border: none;
    background: transparent;
    font-size: 22px;
    line-height: 1;
    color: #909399;
    &:hover {
      color: #303133;
    }
  }
  &__body {
    padding: 16px;
    overflow: auto;
    flex: 1;
  }
  &__footer {
    padding: 12px 16px;
    border-top: 1px solid #ebeef5;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }
}
.base-dialog-enter-active,
.base-dialog-leave-active {
  transition: opacity 0.2s;
}
.base-dialog-enter-from,
.base-dialog-leave-to {
  opacity: 0;
}
</style>
