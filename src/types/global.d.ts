/**
 * Type definitions
 * @author shiloh
 * @date 2025/4/24 10:48
 */

export interface ConvertOption {
  rootTypeName?: string
  typePrefix?: string,
  typeSuffix?: string,
}

export interface CustomType {
  typeName: string,
  props: Property[],
}

export interface Property {
  path: string,
  parentPath: string,
  value: any
  type: string
}
