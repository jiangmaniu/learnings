# Vue3 的特性

## 支持 Vue2 的大多数特性

因为Vue是渐进式框架，Vue3兼容Vue2的写法

## 性能提升

Vue3 代码库被重新编写成一系列分开的，实现不同功能的 `module`

1. 代码打包大小减少 41%
2. 初次渲染快 55%，更新快 133%
3. 内存使用减少 54%

## Composition API

Vue2 中的项目会遇到一个问题，就是复杂组件的代码会变得越来越难以维护，缺少比较干净的在多个组件之间提取和复用逻辑的机制，原有的重用机制都有一些弊端。现在Vue3推出的Composition API 来解决此类问题，它是新推出的一系列API的合集。包括：

1. ref 和 reactive
2. computed 和 watch
3. 新的生命周期函数
4. 支持自定义函数 - Hooks 函数
5. 其他新增特性
   1. Teleport 瞬移组件的位置
   2. Suspense 异步加载组件的新福音
   3. 全局 API 的修改和优化
   4. 更多的实验性特性

## 更好的 TypeScript 支持

Vue2 在推出的时候就没有把 `TS` 考量进去，所以在 Vue2 中继承 TS 会有很多痛点，所以开发者在开发 Vue3 的时候痛定思痛，使用 `TS` 来编写，提供了非常完备的类型定义，所以在使用 Vue3 开发中大型项目中，可以非常方便的享受类型推论等一系列TS红利，同时可以在VSCode 中安装一些TS的插件，这样就可以在编辑器中完美的享受各种TS的功能，更高效的集成和开发项目。

## 为什么要有 Vue3

<!-- 回头补写 -->

## 学习Vue3

### ref

`ref` 是一个方法，用来定义响应式变量，该方法接受一个参数（变量的默认值），它会返回一个响应式对象。通过 `.value` 属性访问和操作变量的值

```js
const count = ref(0)
console.log(count.value) // 0

count.value += 1
console.log(count.value) // 1
```

### reactive

`reactive` 是一个方法，用来定义响应式对象，该方法接受一个用于定义 `ref` 的对象参数，返回响应后的对象，可直接改变对象的属性值

```js
const refsData = reactive({ count: 0 })
console.log(refsData.count) // 0

refsData.count += 1
console.log(refsData.count) // 1
```

**返回方式**

通过 `reactive` 方法定义的响应式对象可以直接返回，模板中直接访问属性即可（任何用 `ref` 的场景都可用 `reactive` 代替）

```js
<template>
  <h1>{{count}}</h1>
</template>

setup() {
  const refsData = reactive({ count: 0 })
  return refsData
}
```

也可以通过返回对象的属性方式返回数据（一般用于多个模块逻辑区分）

```js
<template>
  <h1>模块一的值：{{module1.count}}</h1>
  <h1>模块二的值：{{module2.count}}</h1>
</template>

setup() {
  const module1 = reactive({ count: 0 })
  const module2 = reactive({ count: 1 })
  return {
    module1,
    module2
  }
}
```

**解构返回时注意**

在结构返回时，如果 `reactive` 定义的对象属性中有基本类型的值，则会直接返回基本类型的属性值，而非引用关系，这就导致响应链中断

```js
<template>
  <!-- 该变量不会响应 -->
  <h1>{{count}}</h1>
</template>

setup() {
  const data = reactive({ count: 0 })
  
  const { count } = data
  count = 2 // 不会响应
  console.log(data.count) // 0

  return {
    ...data
  }
  // or 
  // return {
  //   count: data.count
  // }
}
```

需要在返回前使用 `toRefs` 方法将基本类型的属性转成 `ref` 类型

```js
<template>
  <!-- 该变量会响应 -->
  <h1>{{count}}</h1>
</template>

setup() {
  const data = reactive({ count: 0 })
  // 转换属性类型
  const refsData = toRefs(data)
  return {
    ...refsData
  }
  // or 
  // return {
  //   count: refsData.count
  // }
}
```

### ref 和 reactive 区别

它们都是用来指定变量为响应变量的方法，若想在模板中使用响应变量，需要用该方法来指。否则模板中变量的响应会失去活性。

**区别**

将两者带入道普通的 js 代码中，可以将 ref 理解为定义一个单独的变量然后赋值

```js
let x = 0
let y = 0

function updateNumber () {
  x = 1
  y = 2
}
```

可将 `reactive` 理解为定义一个对象然后赋值

```js
let obj = {
  x: 0,
  y: 0
}

function updateNumber () {
  obj.x = 1
  obj.y = 2
}
```

**使用原则**

使用 `ref` 还是 `reactive` 可以遵循以下原则（选其一）：

1. 像上面 `js` 代码一样，可以使用基本类型和对象类型的思想选择使用 `ref` 还是 `reactive`
2. （强烈推荐）所有场景都使用 `reactive`，但要使用 `toRefs` 方法确保 `reactive` 对象属性保持响应活性。

### defaultProperty 和 Proxy 的区别

### 生命周期

[查看文档](https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html#beforecreate)

`Vue2` 与 `Vue3` 的生命更周期钩子

| Vue2 | Vue3 | 备注|
| ----- | ----- | ----- |
| beforeCreate |  |  |
| created | use setup() | 组件初始化时 |
| beforeMount | onBeforeMount | 挂载前 |
| mounted | onMounted | 挂载后 |
| beforeUpdate | onBeforeUpdate | 数据更新前 |
| updated | onUpdated | 数据更新并重新渲染后 |
| beforeDestroy | onBeforeDestroy | 卸载前 |
| destroyed | onDestroyed | 卸载后 |
| activated | onActivated | keep-alive 缓存组件激活时 |
| deactivated | onDestroyed | keep-alive 缓存组件停用时 |
| errorCaptured | onErrorCaptured | 子孙组件报错时 |
|  | **onRenderTracked** | 虚拟 DOM 重新渲染时 |
|  | **onRenderTriggered** | 虚拟 DOM 重新渲染为 triggered.Similarly 为renderTracked |

通过上面表格可以看出，`Vue3` 的生命周期与 `Vue2` 大体上一样，但是还是有些小区别

1. `Vue2` 中的 `beforeCreate` 和 `created` 在 `Vue3` 中被集成到 `use setup` 方法中
2. `Vue2` 的其他钩子的名称前缀在 `Vue3` 中多了个 `on`。其他方法必须在 `setup` 中调用

```js
import { setup, onMounted, onUpdated } from 'vue'
setup () {
 // 其他钩子在 setup 方法中监听调用
 onMounted(() => {
   console.log('mounted')
 })
 onUpdated(() => {
   console.log('updated')
 })
}
```

3. `Vue2` 中的组件销毁钩子 `beforeDestroy` 和 `destroyed` 名称，在 `Vue3` 中被改为 `onBeforeUnmount` 和 `onUmmounted`。（作者解释称是为了语义化，表明组件从mounted 到 Unmounted 的一个过程）
4. 相对`Vue2`，`Vue3` 中新增了两个调试用的Debug钩子函数，分别是 `onRenderTracked` 和 `onRenderTriggered`，以帮助开发者更高效的调试程序。

```js
import { onRenderTracked, onRenderTriggered } from 'vue'
setup () {
 // 其他钩子在 setup 方法中监听调用
 onRenderTracked((event) => {
   console.log(event)
 })

 onRenderTriggered((event) => {
   // 响应数据的操作步揍
   console.log(event')
 })
}
```

?> 因为 `Vue` 是一个渐进式框架，`Vue3` 的开发充分考虑到兼容兼容情况，所以在 `Vue3` 的项目中可以使用 `Vue2` 的开发方式和钩子。