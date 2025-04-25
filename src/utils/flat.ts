/**
 * 展开对象
 * @param obj 要展开的对象
 * @param prefix 展开后的 key 的统一前缀
 * @return 展开后的对象
 * @author shiloh
 * @date 2025/4/23 17:50
 */
export function flattenObject(obj: any, prefix: string = ''): Record<string, any> {
  const flattened: Record<string, any> = {}

  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) {
      continue
    }

    const value = obj[key]
    const newKey = prefix ? `${prefix}.${key}` : key

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      // Handle nested objects
      Object.assign(flattened, flattenObject(value, newKey))
      continue
    }

    if (Array.isArray(value)) {
      // Handle arrays
      const isPrimitiveArray = value.every(
        (item: any) => typeof item !== 'object' || item === null
      )

      if (isPrimitiveArray) {
        // Handle primitive arrays as single value
        flattened[newKey] = value
      } else {
        // Handle arrays containing objects
        value.forEach((item: any, index: number) => {
          if (item && typeof item === 'object' && !Array.isArray(item)) {
            Object.assign(flattened, flattenObject(item, `${newKey}[${index}]`))
          } else {
            flattened[`${newKey}[${index}]`] = item
          }
        })
      }
      continue
    }

    // Handle primitive values
    flattened[newKey] = value
  }

  return flattened
}
