import { EMPTY_STR } from './constants'
import { flattenObject } from './utils/flat.ts'
import { convertToJsDoc } from './utils/convert.ts'
import type { ConvertOption } from './types/global'

/**
 * JSON to JSDoc
 *
 * Inspired by https://gitlab.com/nvidia1997/json-to-jsdoc-converter
 *
 * @param jsonStr JSON str
 * @param option convert option
 * @return JSDoc str
 * @author shiloh
 * @date 2025/4/16 17:31
 */
export function jsonToJSDoc(jsonStr: string, option?: ConvertOption): string {
  if (!jsonStr) {
    return EMPTY_STR
  }

  let jsonObj = JSON.parse(jsonStr)

  if (Array.isArray(jsonObj)) {
    jsonObj = jsonObj[0]
  }

  const flattenedObj = flattenObject(jsonObj)
  return convertToJsDoc(flattenedObj, option)
}
