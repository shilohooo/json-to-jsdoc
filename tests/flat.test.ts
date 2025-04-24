/**
 *
 * @author shiloh
 * @date 2025/4/23 17:30
 */

import { assert, test } from 'vitest'
import { flattenObject } from '../src/utils/flat'
import { JSON_OBJECT_TEST_STR } from '../src/constants/data'

test('flat obj with array and nested objects', () => {
  const flattenedObj = flattenObject(JSON.parse(JSON_OBJECT_TEST_STR))
  assert.ownInclude(flattenedObj, { id: 1 })
  assert.ownInclude(flattenedObj, { 'address.country': 'China' })
  assert.ownInclude(flattenedObj, { 'roles[0].roleName': 'admin' })
  assert.ownInclude(flattenedObj, { 'roles[1].roleName': 'user' })
  assert.ownInclude(flattenedObj, { 'roles[0].permissions[0].code': 'sys:user:view' })
  assert.ownInclude(flattenedObj, { 'roles[1].permissions[1].code': 'sys:user:create' })
})
