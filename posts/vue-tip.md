---
title: 'Vue/record'
date: '2020-12-02'
---
### vue destroy和beforeDestroy钩子在路由中作用比较大

因为在路由切换时，之前创建的定时器之类的副作用代码不会随路由切换消失，而destroy会在切换时被调用

### vue的异步更新数据

因为vue的数据更新是异步的所以无法确定何时更新结束，同步任务一般会在更新之前完成。

如果要确定在更新后做些什么，nextTick是个不错的选择

------



## Vue-router

### **多个视图出口的命名视图**

使用多个命名视图时

`<router-view name='xxx'></router-view>`

```js
let routes=[
    {path:"/xxx",components:{
      xxx:xxx,
      default:xxxa
    }}
]
```



### redirect重定向

重定向指的是"/a"重定向到"/b"

则访问/a直接跳转到/b


---


### 全局前置守卫

```javascript
const router = new VueRouter({ ... })
router.beforeEach((to, from, next) => {
  // ...
})
```

**当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 等待中。**

### router.beforeEach（(to,from,next)=>{}）

* `to: Route`: 即将要进入的目标[路由对象](https://router.vuejs.org/zh/api/#%E8%B7%AF%E7%94%B1%E5%AF%B9%E8%B1%A1)
* `from: Route`: 当前导航正要离开的路由
* `next: Function`: 一定要调用该方法来 resolve 这个钩子。执行效果依赖`next`方法的调用参数。
  * `next()`: 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
  * `next(false)`: 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到`from`路由对应的地址。
  * `next('/')`或者`next({ path: '/' })`: 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向`next`传递任意位置对象，且允许设置诸如`replace: true`、`name: 'home'`之类的选项以及任何用在`router-link`的`to`prop或`router.push`中的选项。
  * `next(error)`: (2.4.0+) 如果传入`next`的参数是一个`Error`实例，则导航会被终止且该错误会被传递给`router.onError()`注册过的回调。

**若不使用next()方法 则无法进行下一个导航**

**to ,from**-两个路由**对象**

**next**-resolve解析钩子

### 路由记录

```javascript
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      children: [
        {
          path: 'bar',
          component: Bar,
          // a meta field
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})
```

`routes`配置中的每个路由对象为 路由记录。路由记录可以是嵌套的
**当嵌套路由时 路由记录是多条的**

/foo/bar 匹配的路由记录为Array(2)（数组成员为路由记录对象）即守卫中的to中的**to.matched**

'/foo'与'/foo/bar'两条路由记录


---

# 守卫

### 全局前置守卫 router.beforeEach((to,from,next)=>{})

### 全局解析守卫  router.beforeResolve((to,from,next)=>{})

### 全局后置钩子 router.afterEach((to,from)=>{})

### 路由独享守卫 routes:[{path:'/',component:...,beforeEnter:(to,from,next)=>{}}]

### 组件守卫

1. beforeRouteEnter(...)
2. beforeRouteUpdate(...)
3. beforeRouteLeave(...)

**其中**

`beforeRouteEnter`**是支持给**`next`**传递回调的唯一守卫******

#### next回调

通过传一个回调给`next`来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。

```plain
beforeRouteEnter (to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
}
```

------



## Vue SSR

```js
// entry-server.js
import { createApp } from './app'
export default context => {
  // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
    // 以便服务器能够等待所有的内容在渲染前，
    // 就已经准备就绪。
  return new Promise((resolve, reject) => {
    const { app, router } = createApp()
    // 设置服务器端 router 的位置
    router.push(context.url)
    // 等到 router 将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      // 匹配不到的路由，执行 reject 函数，并返回 404
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }
      // Promise 应该 resolve 应用程序实例，以便它可以渲染
      resolve(app)
    }, reject)
  })
}
```

#### 1.router.push()服务端的作用:使得`<router-view>`确定组件内容成功获取渲染。


#### 2.返回promise的原因是，异步组件无法确定解析时间，放入onReady后(此时异步组件已被解析=>app可以完整解析)可异步成同步等待解析完成才正确给到app数据传给后面。

----



## VueX

**vuex的module在state上具有局部性**

this.$store.state.a.xxx(模块a上的xxx)

**默认情况下，模块内部的action,mutation,getter全局性，注册在全局命名空间**。

this.$store.commit('xxx')

模块a上的mutation: xxx

------



## vue的完全版=runtime(运行时)+compiler(编译器)

即

**完整版**：同时包含编译器和运行时的版本。

**编译器**：用来将模板字符串编译成为 JavaScript 渲染函数的代码。

**运行时**：用来创建 Vue 实例、渲染并处理虚拟 DOM 等的代码。基本上就是除去编译器的其它一切。


---


```js
// 需要编译器
new Vue({
  template: '<div>{{ hi }}</div>'
})
// 不需要编译器
new Vue({
  render (h) {
    return h('div', this.hi)
  }
})
```

编译器负责将template字符串模板转化为渲染函数后的vnode

**单文件:**

单vue文件则不需要在构建后引用完整版，因为打包后已经被编译成vnode

当使用 vue-loader 或 vueify 的时候，*.vue 文件内部的模板会在构建时预编译成 JavaScript。你在最终打好的包里实际上是不需要编译器的，所以只用运行时版本即可。


---


当使用`vue-loader`或`vueify`的时候，`*.vue`文件内部的模板会在构建时预编译成 JavaScript。你在最终打好的包里实际上是不需要编译器的，所以只用运行时版本即可。

因为运行时版本相比完整版体积要小大约 30%，所以应该尽可能使用这个版本。如果你仍然希望使用完整版，则需要在打包工具里配置一个别名

```js
module.exports = {
  // ...
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // 用 webpack 1 时需用 'vue/dist/vue.common.js'
    }
  }
}
```

**link⚡**
vue单文件中若使用template选项(option级)可由cli中的vue.config.js的runtimeCompiler选项开启，此时最终的构建文件引入的vue会加入编译器使得选项字符串模板可行(但需要解除单文件`<template>`)，若不开启编译器，则template选项级无效



## vue-admin-template

- #### SVG-SPRITE


项目中的icon

iconfont中产生的iconfont.js是已经具有symbol标签的svg文件

只需要使用此js文件

在项目中使用`<use xlink:href='#icon-xxx'></use>`

引用即可

而真正需要单个svg只有路径的svg文件使用此use的话

需要将多个svg组合成一堆symbol标签

使用`<use>`引用这些symbol

而具有这些symbol的整体svg成为**svg sprite**

**可以通过**[svg-sprite-loader](https://github.com/kisenka/svg-sprite-loader)制作



- #### 为什么！！+'str'为false


贴出这张图✨

主要因为+运算基于Number遇到字符串会变成NaN

<img src='/images/str-logic.png'/>

!!+0===false（作用等于Boolean(0)）

主要目的为了取boolean值的直接符号型写法



- #### router表中的resetRouter()

```js
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
```

根据在组件中的 $router.matcher属性得到对象`{addRoutes(function),match(function)}`

其中match函数里包含了路由routes 路由表

对router.matcher属性做修改 新的routes就会替换老的routes

参见：https://segmentfault.com/a/1190000019386190?utm_source=tag-newest

**resetRouter的运用目的和意义**

**去除已经动态添加(addRoutes)的路由 将其恢复到出厂设定默认值**

例子：当设定访问到example页时`addRoutes({path:'/xxx',component:....})`

此时路由表添加动态路由

当结束logout出去时通过resetRouter()可以解决再次登录后不用访问example页却仍然能够访问

path:'/xxx'的问题

- #### url EncodeComponent类

  <img src='/images/urlandencode.jpg'/>
  
  

