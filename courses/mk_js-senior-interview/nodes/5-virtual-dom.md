# 虚拟DOM（virtual dom 简称 vdom）

## vdom 是什么？ 为何会存在vdom？

虚拟DOM顾名思义，不是真正在页面渲染的DOM树，而是用JS模拟DOM结构。将DOM的变化对比放在JS层来做，这样的好处是可以提高重绘性能。

在现代的网页中，由V8等引擎的支持，执行JS代码是非常快的。反而最消耗性能的事情就是渲染DOM和操作DOM，如果直接如果在每次执行JS的时候都操作DOM，会使页面一直重绘渲染，页面在渲染的时候，又会反过来限制JS的执行（页面渲染跟JS不能同步执行），一来二去就会导致网页卡顿。如果把多个DOM的操作在JS中模拟一遍，然后将操作后的模拟DOM进行diff差异化算法一次，将更改的虚拟DOM节点渲染到页面中，这样可以很好的解决卡顿问题。

使用jquery来执行业务渲染操作

```html
<div id="container"></div>
<button id="btn-change">change<button>
```

```js
  var data = [{
    name: '张三',
    age: '20',
    address: '北京'
  }, {
    name: '李四',
    age: '19',
    address: '上海'
  }, {
    name: '王五',
    age: '30',
    address: '深圳'
  }]

  // 渲染函数
  function render (data) {
    var $container = $('#container')

    // 清空容器数据，非常重要，如果不清空会将新节点追加到老节点的后面
    $container.html('')

    // 拼接 table
    var $table = $('<table>')

    // 添加表头
    $table.append($('<tr><td>name</td><td>age</td><td>address</td></tr>'))
    // 添加表哥内容
    data.forEach(function (item) {
      $table.append($(`<tr><td>${item.name}</td><td>${item.age}</td><td>${item.address}</td></tr>`))
    })

    // 将 table 渲染到页面
    $container.append($table)
  }

  // 页面加载完立刻执行的最初始渲染
  render(data)

  $('#btn-change').on('click', function () {
    data[1].age = 22
    data[2].address = '广州'
    // re-render 重新渲染
    render(data)
  })

```

上面代码可以看出，虽然使用jquery可以完成一个业务需求，但每次render操作的时候都需要先进行节点清空（`$container.html('')`）。如果我们进行一个最小的数据项更改，都会请管控全部的节点，然后重新渲染此次。每次更改数据，不管是改了多少，哪怕一个最小的item想，都需要全部重新渲染，这就导致很多无意义的数据重绘，这非常消耗性能。在少量数据的情况下可能看不出来，如果一个列表由成千上万个item项的话，如果只是更改一个很小的数据，也会导致全部重绘，这种场景的重绘的速度非常慢，同时代价是非常大（重绘期间无法执行JS）。

## vdom 如何应用？核心 API 是什么？

vdom表示一类的技术实现，有很多相关的开源库，其中[snabbdom](https://github.com/snabbdom/snabbdom)是总多开源vdom库中的其中一个，它在开源社区很活跃，使用的人也不较多，其中vue2的vdom实现就是借鉴了snabbdom库的思想。通过`h`方法创建`vnode`节点，该方法可传要模拟的节点信息，包括子节点。然后通过`patch`函数将创建好的`vnode`注入到页面的容器节点中。如果要更改数据则继续用`h`方法根据新的数据创建出`new vnode`节点，然后继续使用`patch`函数，将`new vnode`注入到老的`vnode`，snabbdom库会根据复杂的diff算法，算出`vnode`和`new vnode`中的差异化，只做差异化`vnode`的数据重绘，原来没有变的`vnode`不做任何更改。

相同的业务场景使vdom实现：

```js

```

## 介绍一个 diff 算法

