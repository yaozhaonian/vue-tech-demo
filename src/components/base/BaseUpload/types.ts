export interface BaseUploadProps {
  /** 文件类型限制，例如 ['image/png','image/jpeg'] */
  accept?: string[]
  /** 最大文件大小（字节），默认 5MB */
  maxSize?: number
  /** 是否多选 */
  multiple?: boolean
  /** 按钮文案 */
  text?: string
}

export interface UploadFileItem {
  uid: string
  name: string
  size: number
  raw: File
  url?: string
  status: 'ready' | 'uploading' | 'done' | 'error'
}

export interface BaseUploadEmits {
  (e: 'change', files: UploadFileItem[]): void
  (e: 'success', file: UploadFileItem): void
  (e: 'error', file: UploadFileItem, message: string): void
  (e: 'exceed', file: File): void
}
