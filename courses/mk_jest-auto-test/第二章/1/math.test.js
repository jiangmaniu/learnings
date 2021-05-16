function test (desc, cb) {
  try {
    cb()
    console.log(`${desc} 测试成功`)
  } catch (e) {
    console.log(`${desc} 测试失败：${e}`)
  }
}

function expect (result) {
  return {
    toBe(actual) {
      if (actual !== result) {
        throw new Error(`测试结果${result}，与预期值 ${actual} 不一致 `)
      }
    }
  }
}

test('测试加法', () => {
  expect(add(1, 2)).toBe(3)
})

test('测试减法', () => {
  expect(minus(1, 2)).toBe(-1)
})

test('测试乘法', () => {
  expect(multi(1, 2)).toBe(2)
})