const math = require('./math')
const { add, minus, multi } = math

test('测试加法', () => {
  expect(add(1, 2)).toBe(3)
})

test('测试减法', () => {
  expect(minus(1, 2)).toBe(-1)
})

test('测试乘法', () => {
  expect(multi(1, 2)).toBe(2)
})