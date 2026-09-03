export type EchartsType = 'line' | 'bar'

export interface EchartsSeries {
  name: string
  /** 与 xAxis data 一一对应的数值数组 */
  data: number[]
}

export interface EchartsWrapperProps {
  /** 图表类型 */
  type?: EchartsType
  /** X 轴类目数据 */
  xAxisData: string[]
  /** 系列数据 */
  series: EchartsSeries[]
  /** 标题 */
  title?: string
  /** 图表高度 */
  height?: number | string
  /** 是否堆叠 */
  stack?: boolean
  /** 是否平滑曲线（折线图生效） */
  smooth?: boolean
}

export interface TimeChangePayload {
  /** 选中的天数（7 / 30 / 90） */
  days: number
  /** 起始日期 YYYY-MM-DD */
  start: string
  /** 结束日期 YYYY-MM-DD */
  end: string
}

export interface EchartsWrapperEmits {
  (e: 'time-change', payload: TimeChangePayload): void
  (e: 'legend-select', name: string): void
  (e: 'update:type', type: EchartsType): void
}
