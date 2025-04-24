/**
 *
 * @author shiloh
 * @date 2025/4/24 16:06
 */
import { expect, test } from 'vitest'
import { JSON_OBJECT_TEST_STR } from '../src/constants/data'
import type { ConvertOption } from '../src/types/global'
import { ROOT_TYPE_NAME } from '../src/constants'
import { jsonToJSDoc } from '../src'

test('JSON to JSDoc', () => {
  const option: ConvertOption = { rootTypeName: ROOT_TYPE_NAME }
  const jsDoc = jsonToJSDoc(JSON_OBJECT_TEST_STR, option)
  expect(jsDoc).toBeDefined()

  expect(jsDoc).contains('* @typedef {RootType} RootType')
  expect(jsDoc).contains('* @typedef {Address} Address')
  expect(jsDoc).contains('* @typedef {Role} Role')
  expect(jsDoc).contains('* @typedef {Permission} Permission')


  expect(jsDoc).contains('* @property {number} id')
  expect(jsDoc).contains('* @property {string} username')
  expect(jsDoc).contains('* @property {null} [email]')
  expect(jsDoc).contains('* @property {number[]} intArr')
  expect(jsDoc).contains('* @property {Role[]} roles')

  expect(jsDoc).contains('* @property {string} roleName')
  expect(jsDoc).contains('* @property {Permission[]} permissions')
})

test('JSON to JSDoc with custom root type name', () => {
  const option: ConvertOption = { rootTypeName: 'User' }
  const jsDoc = jsonToJSDoc(JSON_OBJECT_TEST_STR, option)
  expect(jsDoc).toBeDefined()

  expect(jsDoc).contains('* @typedef {User} User')
})

test('JSON to JSDoc with custom type prefix', () => {
  const option: ConvertOption = { typePrefix: 'My' }
  const jsDoc = jsonToJSDoc(JSON_OBJECT_TEST_STR, option)
  expect(jsDoc).toBeDefined()

  expect(jsDoc).contains('* @typedef {MyRootType} MyRootType')
  expect(jsDoc).contains('* @typedef {MyAddress} MyAddress')
  expect(jsDoc).contains('* @typedef {MyRole} MyRole')
  expect(jsDoc).contains('* @typedef {MyPermission} MyPermission')
})

test('JSON to JSDoc with custom type suffix', () => {
  const option: ConvertOption = { typeSuffix: 'Type' }
  const jsDoc = jsonToJSDoc(JSON_OBJECT_TEST_STR, option)
  expect(jsDoc).toBeDefined()

  expect(jsDoc).contains('* @typedef {RootTypeType} RootTypeType')
  expect(jsDoc).contains('* @typedef {AddressType} AddressType')
  expect(jsDoc).contains('* @typedef {RoleType} RoleType')
  expect(jsDoc).contains('* @typedef {PermissionType} PermissionType')
})

test('JSON to JSDoc with custom option', () => {
  const option: ConvertOption = { rootTypeName: 'User', typePrefix: 'My', typeSuffix: 'Type' }
  const jsDoc = jsonToJSDoc(JSON_OBJECT_TEST_STR, option)
  expect(jsDoc).toBeDefined()

  expect(jsDoc).contains('* @typedef {MyUserType} MyUserType')
  expect(jsDoc).contains('* @typedef {MyAddressType} MyAddressType')
  expect(jsDoc).contains('* @typedef {MyRoleType} MyRoleType')
  expect(jsDoc).contains('* @typedef {MyPermissionType} MyPermissionType')
})
