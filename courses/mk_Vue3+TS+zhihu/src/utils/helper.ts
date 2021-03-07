import { ColumnProps, UserProps } from '@/store'

export interface CheckCondition {
  format?: string[];
  size?: number;
}

export type ErrorType = 'format' | 'size' | null

export const beforeUploadCheck = (file: File, condition: CheckCondition) => {
  const { format, size } = condition
  const isValidFormat = format ? format.includes(file.type) : true
  const isValidSize = size ? (file.size / 1024 / 1024) < size : true
  let error: ErrorType = null
  if (!isValidFormat) {
    error = 'format'
  } else if (!isValidSize) {
    error = 'size'
  }
  return {
    passed: isValidSize && isValidFormat,
    error
  }
}

export const generateFitUrl = (column: ColumnProps | UserProps, width: number, height: number) => {
  if (column.avatar) {
    column.avatar.fitUrl = column.avatar.url + `?x-oss-process=image/resize,w_${width},h_${height}`
  } else {
    column.avatar = {
      fitUrl: require('@/assets/column.jpg')
    }
  }
}

export const arrToObj = <T extends { _id?: string }>(arr: Array<T>) => {
  return arr.reduce((prev, current) => {
    if (current._id) {
      prev[current._id] = current
    }
    return prev
  }, {} as { [key: string]: T })
}
