---
title: 'Vue/record'
date: '2020-12-02'
bgurl: 'https://th.bing.com/th/id/Rec462f671df6ce4ba915e746b1977c56?rik=OsE0zuATe%2fbYTQ&pid=ImgRaw'
tags: 'vue'
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
  

### Vue3

###### setup

From:

https://v3.cn.vuejs.org/guide/composition-api-introduction.html#watch-%E5%93%8D%E5%BA%94%E5%BC%8F%E6%9B%B4%E6%94%B9

```js
setup (props) {
  // 使用 `toRefs` 创建对prop的 `user` property 的响应式引用
  const { user } = toRefs(props)

  const repositories = ref([])
  const getUserRepositories = async () => {
    // 更新 `prop.user` 到 `user.value` 访问引用值
    repositories.value = await fetchUserRepositories(user.value)
  }

  onMounted(getUserRepositories)

  // 在用户 prop 的响应式引用上设置一个侦听器
  watch(user, getUserRepositories)

  return {
    repositories,
    getUserRepositories
  }
}
```

**The Reason Why it use toRefs to handle the props data:**

```js
import { toRefs,onUpdated,reactive} from 'vue'
export default {
    props:['msg'],
    setup(props){
        onUpdated(()=>{
            console.log(props.msg)
        })
        return reactive({msg:props.msg})
    }
}
```

**setup**中

从父组件下行的props 可以在setup以函数形式获得最新值

props.msg也不是一个响应式对象 只是单独的值 未被附加proxy不能进行视图更新(proxy附加用以进行视图响应式更新 / attach the proxy)

setup return的对象也不是一个响应式的对象 无法进行更新的派发（非响应式，不会触发试图更新）

如果直接`return {xxx:props.xxx}`

视图将不会进行xxx的更新

**响应式:**数据模型是被代理的 JavaScript 对象。而当你修改它们时，视图会进行更新。这让状态管理非常简单直观。

https://v3.cn.vuejs.org/guide/reactivity.html#%E4%BB%80%E4%B9%88%E6%98%AF%E5%93%8D%E5%BA%94%E6%80%A7

> ref与reactive 区别：https://zhuanlan.zhihu.com/p/267967246

##### Teleport

```html
<template>
  <teleport to='body'>
      <div>
          <h1>kei</h1>
      </div>
  </teleport>
</template>

<script>
export default {
    
}
</script>

<style>

</style>
```

```html
<html lang="en">

<head>
  <script type="module" src="/@vite/client"></script>
  <meta charset="UTF-8">
  <link rel="icon" href="/favicon.ico">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vite App</title>
  <style type="text/css">

  </style>
  <style type="text/css">

  </style>
  <style type="text/css">

  </style>
</head>

<body>
  <div id="app" data-v-app="">
    <!--teleport start-->
    <!--teleport end-->
  </div>
  <script type="module" src="/src/main.js"></script>


  <div>
    <h1>kei</h1>
  </div>
</body>

</html>
```

### VUE 2022 重学

#### DOM (即非字符串的模板) 对大小写不敏感 只喜欢小写

意为**纯在**/**直接在**html编写的，**非**模板字符串/单文件组件（这类会经过一层编译再传给html)

**纯在html**（文件）编写的所有关于vue的代码是必须要小写的 无论是组件名还是attributes都是不敏感大写的

#### 动态组件(keep-alive)

vue内置的component组件 辅以is的attribute进行动态切换组件

注意的是使用 `<keep-alive>` 包裹component组件可以保持组件的数据域

这可能比vue文档更好理解 自己写了个更好理解的动态组件案例

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    li{
      list-style: none;
      display: inline-block;
      padding: 10px;
      cursor: pointer;
    }
    .active{
      color: red;
    }
  </style>
</head>

<body>
  <div id="app">
    <ul>
      <li @click='currentTitle=item' :class='currentTitle==item?"active":""' v-for='(item,index) in title' :key='index'>{{item}}</li>
    </ul>
    <keep-alive>
      <component :is='currentTitle'></component>
    </keep-alive>
   

  </div>
  <script src="https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vue@3.2.25/dist/vue.global.js"></script>
  <script src="./index.js"></script>
</body>

</html>
```



```js
//index.js
const app=Vue.createApp({
    data(){
        return{
            title:['home','posts','archive'],
            currentTitle:'home'
        }
    }
})
app.component('home',{
    template:`This is home component`
})
app.component('posts',{
    data(){
        return{
            date:'2022/01/06'
        }
    },
    template:`
    
    <input type='text' v-model='date'/>
    This is posts component
    <p>{{date}}</p>
    `
})
app.component('archive',{
    template:`This is archive component`
})
app.mount('#app');
```

当处在posts组件时并改变日期（date) 此时再去切换component也就是is的值改变后 我们仍然能够保持改变posts里的 `data` 中的日期会完好无损地保存下来 所做的所有改变也就是changed后的 posts 的数据能够保存，也就是很好地体现了keep-alive的作用。

### Ref

在Vue 3.0中有两种Ref引用：

1.**响应式引用** 对基本数据类型的响应式包裹 包裹之后的返回响应式对象 数据值存在此对象的属性value中

常用

```js
//setup语法
let temp=ref(2022);
console.log(temp.value);
return{
    temp
}
```

2.**模板引用** 对DOM元素的引用 用以在js访问DOM元素/组件

```js
//2.0中的选项式语法
app.component('base-input', {
  template: `
    <input ref="input" />
  `,
  methods: {
    focusInput() {
      this.$refs.input.focus()
    }
  },
  mounted() {
    this.focusInput()
  }
})
```

 这是在**组件里访问自己** `this.$refs.input`

```html
<base-input ref="usernameInput"></base-input>
```

这是在**父级组件用ref引用** ，该引用可以访问到在此子组件里定义暴露的方法和数据。

#### setup的统一级语法

setup语法将这俩整到一块 不过我觉得还是基于ref的数据也就是响应式引用的部分比重更大，实质可能更类似与把组件当作数据,即 `const temp=ref(模板)`

不过这个模板参数怎么得到呢 不可能在js处写一遍吧 这样在模板端我们用这个attr也就是ref绑定暴露出的

```js
<template>
	<div ref='root'>这是要被引用的模板</div>    
</template>
<script>
        export default{
			setup(){
                const root=ref(null);
                return{
					root	
                }
                
            }
}
</script>
```

这就是其核心语法 首先在setup时 把模板绑向暴露的root这个ref对象 之后在挂载`onMounted`后 我们可以看到 `root.value` 已经绑定上去了DOM 

*这里我们在渲染上下文中暴露 `root`，并通过 `ref="root"`，将其绑定到 div 作为其 ref。在虚拟 DOM 补丁算法中，如果 VNode 的 `ref` 键对应于渲染上下文中的 ref，则 VNode 的相应元素或组件实例将被分配给该 ref 的值。这是在虚拟 DOM 挂载/打补丁过程中执行的，因此模板引用只会在初始渲染之后获得赋值。*--来自官网

```vue
<template>
  <div ref="root">This is a root element</div>
</template>

<script>
  import { ref, watchEffect } from 'vue'

  export default {
    setup() {
      const root = ref(null)

      watchEffect(() => {
        console.log(root.value) // => <div>This is a root element</div>
      }, 
      {
        flush: 'post'
      })

      return {
        root
      }
    }
  }
</script>

```

这里为什么需要 `watchEffect` 增加一个参数选项呢 因为默认`watchEffect` 的行为

——`watch()` 和 `watchEffect()` 在 DOM 挂载或更新*之前*运行副作用，所以当侦听器运行时，模板引用还未被更新。

怎样改变这个行为在挂载之后调用呢，flush 流出抽水的意思，虽然我也不知道什么关系啊哈哈，但是post有介词在.....之后的意思，这个参数选项就是改变默认行为在挂载之后运行副作用，被调用。这里可以用`onMounted`等钩子替代。
