import { DOT, EMPTY_STR, ROOT_TYPE_NAME } from '../constants'
import { ConvertOption, type CustomType, type Property } from '../types/global'
import { detectValType } from './type-detect'
import { pascalCase } from 'change-case'
import pluralize from 'pluralize-esm'

/**
 * Convert flattened object to JSDoc
 * @param flattenedObj flattened object, this obj should not have any nested properties
 * @param option convert option
 * @return JSDoc str
 * @author shiloh
 * @date 2025/4/24 10:43
 */
export function convertToJsDoc(
  flattenedObj: Record<string, any>,
  option: ConvertOption = { rootTypeName: ROOT_TYPE_NAME }
): string {
  if (!flattenedObj || Object.keys(flattenedObj).length === 0) {
    return EMPTY_STR
  }

  option.rootTypeName ??= ROOT_TYPE_NAME
  const props = generateProps(flattenedObj, option)
  const types = generateTypes(props, option)
  return types.map(t => generateJsDocForType(t)).join('\n\n')
}

/**
 * Generate properties from a flattened object
 * @param flattenedObj flattened object
 * @param option convert option
 * @return properties
 * @author shiloh
 * @date 2025/4/24 10:55
 */
export function generateProps(flattenedObj: Record<string, any>, option: ConvertOption): Property[] {
  const props: Property[] = []
  for (const key in flattenedObj) {
    if (!key) {
      continue
    }

    // primitive types
    if (key.indexOf(DOT) === -1) {
      const parentPath = option.rootTypeName ?? ROOT_TYPE_NAME
      // skip duplicated property
      if (props.some(p => p.path === key && p.parentPath === parentPath)) {
        continue
      }

      props.push({
        parentPath,
        path: key,
        value: flattenedObj[key],
        type: detectValType(key, flattenedObj[key]),
      })
      continue
    }

    // object or array
    const keyArr = key.split(DOT)
    for (let i = keyArr.length - 1; i >= 0; i--) {
      let path = keyArr[i]
      const parentPath = keyArr[i - 1]?.replace(/\[\d+]/, EMPTY_STR) ?? option.rootTypeName
      // @ts-ignore
      const pathWithoutBrackets = path.replace(/\[\d]/, EMPTY_STR)
      // skip duplicated property
      if (props.some(p => p.path === pathWithoutBrackets && p.parentPath === parentPath)) {
        continue
      }

      const property: Property = {
        // @ts-ignore
        parentPath,
        path: pathWithoutBrackets,
        value: flattenedObj[key],
        type: '',
      }

      if (i !== keyArr.length - 1) {
        property.type = pascalCase(pluralize.singular(pathWithoutBrackets))
        // array
        // @ts-ignore
        if (/\w\[\d+]/.test(path)) {
          property.type = `${property.type}[]`
        }
      } else {
        // @ts-ignore
        property.type = detectValType(path, property.value)
      }

      props.push(property)
    }
  }

  return props
}

/**
 * Generate custom types
 * @param props properties
 * @param option convert option
 * @return custom types
 * @author shiloh
 * @date 2025/4/24 11:24
 */
export function generateTypes(props: Property[], option: ConvertOption): CustomType[] {
  const parentPaths = [...new Set(props.map(p => p.parentPath))]
  return parentPaths.map(path => {
    const typeName = pascalCase(pluralize.singular(path))
    return ({
      typeName: `${option.typePrefix ?? ''}${typeName}${option.typeSuffix ?? ''}`,
      props: props.filter(p => p.parentPath === path),
    })
  })
}

/**
 * Generate JSDoc code string for a custom type
 * @param customType custom type
 * @return JSDoc code string
 * @author shiloh
 * @date 2025/4/24 11:19
 */
export function generateJsDocForType(customType: CustomType): string {
  const lines: string[] = []
  lines.push('/**')
  lines.push(` * @typedef {${customType.typeName}} ${customType.typeName}`)

  customType.props.forEach(prop => {
    const path = prop.value ? prop.path : `[${prop.path}]`
    lines.push(` * @property {${prop.type}} ${path}`)
  })

  lines.push(' */')

  return lines.join('\n')
}
