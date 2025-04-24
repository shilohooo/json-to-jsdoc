/**
 *
 * @author shiloh
 * @date 2025/4/24 11:02
 */

import { expect, test } from 'vitest'
import { generateJsDocForType, generateProps, generateTypes } from '../src/utils/convert'
import { ROOT_TYPE_NAME } from '../src/constants'
import type { ConvertOption, Property } from '../src/types/global'
import { flattenObject } from '../src/utils/flat'
import { JSON_OBJECT_TEST_STR } from '../src/constants/data'

const USER_PROPS_TO_TEST: Property[] = [
  {
    path: 'id',
    value: 1,
    type: 'number',
    parentPath: ROOT_TYPE_NAME
  },
  {
    path: 'username',
    value: 'shiloh',
    type: 'string',
    parentPath: ROOT_TYPE_NAME
  },
  {
    path: 'enabled',
    value: true,
    type: 'boolean',
    parentPath: ROOT_TYPE_NAME
  },
  {
    path: 'email',
    value: null,
    type: 'null',
    parentPath: ROOT_TYPE_NAME
  },
  {
    path: 'age',
    value: undefined,
    type: 'undefined',
    parentPath: ROOT_TYPE_NAME
  },
  {
    path: 'roles',
    value: [],
    type: 'Role[]',
    parentPath: ROOT_TYPE_NAME
  },
]

const ROLE_PROPS_TO_TEST: Property[] = [
  {
    path: 'id',
    value: 1,
    type: 'number',
    parentPath: 'Role'
  },
  {
    path: 'roleName',
    value: 'admin',
    type: 'string',
    parentPath: 'Role'
  },
  {
    path: 'permissions',
    value: [],
    type: 'Permission[]',
    parentPath: 'Role'
  },
]

test('generate JsDoc code string for a single custom type', () => {
  const jsDocStr = generateJsDocForType({
    typeName: ROOT_TYPE_NAME,
    props: USER_PROPS_TO_TEST
  })
  expect(jsDocStr).toBeDefined()
  expect(jsDocStr).eq(`
/**
 * @typedef {${ROOT_TYPE_NAME}} ${ROOT_TYPE_NAME}
 * @property {number} id
 * @property {string} username
 * @property {boolean} enabled
 * @property {null} [email]
 * @property {undefined} [age]
 * @property {Role[]} roles
 */
  `.trim())
})

test('generate custom types', () => {
  const customTypes = generateTypes(USER_PROPS_TO_TEST.concat(ROLE_PROPS_TO_TEST), {})
  expect(customTypes).toBeDefined()
  expect(customTypes.length).eq(2)

  expect(customTypes.map(t => t.typeName)).contains('Role')

  const props = customTypes.find(t => t.typeName === 'Role')?.props
  expect(props?.length).eq(3)
})

test('generate properties', () => {
  const flattenedObj = flattenObject(JSON.parse(JSON_OBJECT_TEST_STR))
  const option: ConvertOption = { rootTypeName: ROOT_TYPE_NAME }
  const properties = generateProps(flattenedObj, option)
  expect(properties.length).gt(0)

  const paths = properties.map(p => p.path)
  expect(paths).contains('id')
  expect(paths).contains('username')
  expect(paths).contains('address')
  expect(paths).contains('roles')
  expect(paths).contains('permissions')

  const types = properties.map(p => p.type)
  expect(types).contains('Address')
  expect(types).contains('Role[]')
  expect(types).contains('Permission[]')
})
