export interface BaseDialogProps {
  /** 是否显示 */
  modelValue: boolean
  /** 标题 */
  title?: string
  /** 宽度 */
  width?: string | number
  /** 是否显示关闭按钮 */
  closable?: boolean
  /** 是否点击遮罩关闭 */
  closeOnClickMask?: boolean
  /** 是否底部按钮 */
  showFooter?: boolean
  /** 确认按钮文案 */
  confirmText?: string
  /** 取消按钮文案 */
  cancelText?: string
}

export interface BaseDialogEmits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
  (e: 'close'): void
}
