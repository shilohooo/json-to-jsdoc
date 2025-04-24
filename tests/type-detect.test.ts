/**
 *
 * @author shiloh
 * @date 2025/4/24 14:47
 */

import { expect, test } from 'vitest'
import { detectValType } from '../src/utils/type-detect'

test('detect value type', () => {
  // primitive types
  expect(detectValType('age', 1)).eq('number')
  expect(detectValType('name', 'tom')).eq('string')
  expect(detectValType('enabled', false)).eq('boolean')
  expect(detectValType('email', null)).eq('null')
  expect(detectValType('sex', undefined)).eq('undefined')

  // primitive array types
  expect(detectValType('ages', [1, 2, 3])).eq('number[]')
  expect(detectValType('names', ['tom', 'jerry'])).eq('string[]')
  expect(detectValType('checks', [true, false])).eq('boolean[]')

  // empty array
  expect(detectValType('list', [])).eq('[]')

  // custom object array types
  expect(detectValType('users', [{ name: 'tom', age: 18 }, { name: 'jerry', age: 16 }])).eq('User[]')

  // multidimensional array
  expect(detectValType('matrix', [[1, 2, 3], [4, 5, 6]])).eq('[][]')
})
