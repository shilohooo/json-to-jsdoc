import { pascalCase } from 'change-case'
import pluralize from 'pluralize-esm'

/**
 * Detect the type of the value
 * @param key key
 * @param value value
 * @return type name
 * @author shiloh
 * @date 2025/4/24 14:24
 */
export function detectValType(key: string, value: any): string {
  if (value === null) {
    return 'null'
  }

  // primitive type: string, number, boolean, undefined
  if (typeof value !== 'object') {
    return typeof value
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return '[]'
    }

    const arrayEle = value[0]

    // multidimensional array
    if (Array.isArray(arrayEle)) {
      return '[][]'
    }

    if (typeof arrayEle !== 'object') {
      return `${typeof arrayEle}[]`
    }

    return `${pascalCase(pluralize.singular(key))}[]`
  }

  // unknown type
  return 'object'
}
