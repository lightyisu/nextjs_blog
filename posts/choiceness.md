---
title: '前端一揽子精选文章'
date: '2022-01-11'
tags: 'others' 
---


### JS作用域

https://juejin.cn/post/6844903797135769614

#### **深入理解JavaScript作用域和作用域链** 

简单概述：电面提的问题没回答上来的一个知识点。

**作用域是在运行时代码中的某些特定部分中变量，函数和对象的可访问性**

#### 三大作用域

1.**块级**作用域（ES6 新增`let/const`实现）

**块语句（大括号“｛｝”中间的语句）**

自从有了 `let` 以后块里面的变量就只能真的在块里了

```js
{
  let a='nihao2022';
  console.log(a); //output:nihao2022
}
console.log(a) //a是没有被定义的 找不到a
```

而`var` 这个老的变量定义方式 还是可以冲破这个限制的,块限制不住它,作用域大于块

```js
if (true) {
     //'if' 条件语句块不会创建一个新的作用域
    var name = 'Hammad'; // name 依然在全局作用域中
}
console.log(name); // logs 'Hammad'
```

2.**全局**作用域 :主要还是暴露在最外层的所有定义 ,都是全局的 ,然后几乎哪都能get到这些函数/变量，都有权限访问到这些被全局声明的

3.**局部**作用域

也称之为**函数作用域** 在一个函数里定义的 外边是访问不到函数里面定义的变量的



#### PS

牵扯到面试另一个没回答的问题，IIFE立即执行`(()=>{})()` 这个可以很好地封闭函数里的变量不被污染 外边是访问不到内部的变量的,现代工具库喜欢弄这个，jq就是这样的。

**for循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。**

```js
for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
// abc
// abc
// abc
```

**1.  js引擎子作用域优先 输出abc说明循环体内部是子作用域** 

**2.  i 可以被 `let` 两次说明分属两个作用域**

（ **let 不能在同一作用域内重复声明一个已有标识符**：会报错）

#### 作用域链

就是使用一个变量但本作用域无此变量（即自由变量） 就像链上寻找（父级）之类的 

特殊：在函数里找父级链上变量是基于**定义时**的作用域（称之为静态作用域）

```js
var x=100;
const f1=()=>{
	console.log(x);
}
const f2=()=>{
	let x=999;
	f1();
}
f2(); //输出100
```

**与调用时作用域无关/与定义时作用域相关**

原理：js的运行机制时**解释+执行** 解释时就已经确定了作用域！！！！！

执行时自然按照解释后的作用域来执行（this的指向是执行时确定的，而作用域访问的变量是编写代码的结构确定的）

### Proxy与this

proxy与this有这奇妙关系 为啥这么说呢 因为proxy代理后的对象运行this与源对象运行时的this并不相同

这会造成一些问题 比如原生隐藏的内部属性需要用到this 而 通过代理这层访问不到真this也就是源对象 代理后this也成为了proxy

**有些原生对象的内部属性，只有通过正确的`this`才能拿到，所以 Proxy 也无法代理这些原生对象的属性。**

代理前：obj的this  =>obj

代理后：proxy的this =>proxy   

> 一个原生Date对象的代理

```js
const d1=new Date()
const p1=new Proxy(d1,{})
p1.getDate(); // TypeError: this is not a Date object.
```

```js
const target = new Date();
const handler = {
  get(target, prop) {
    if (prop === 'getDate') {
      return target.getDate.bind(target);
    }
    return Reflect.get(target, prop);
  }
};
const proxy = new Proxy(target, handler);

proxy.getDate() // get到的
```

我们需要自己**手动绑定真对象**才能拿到内部函数属性

**Reflect**实际作用是一个**基础的默认操作**，通过基础操作Reflect叠加我们可以在默认操作做一点副作用 也就是在trap函数加点东西+一个返回Reflect的默认操作就是我们完整所要写的代理逻辑了，不过不用默认操作也是可以。

### Vue响应式

Vue3.0的响应式我认为更像是一个**连锁反应** ，一个带动另一个 ，一个值的变化带动依赖该值的另一个值变化，从而形成响应式。原理基于ES6推出的Proxy代理，就是给默认行为添加副作用，这些副作用是实现连锁反应的逻辑操作。可能是以前学过的发布订阅模型实现~ 现在印象不是很深。



来自VUE文档

>1. **当一个值被读取时进行追踪**：proxy 的 `get` 处理函数中 `track` 函数记录了该 property 和当前副作用。
>2. **当某个值改变时进行检测**：在 proxy 上调用 `set` 处理函数。
>3. **重新运行代码来读取原始值**：`trigger` 函数查找哪些副作用依赖于该 property 并执行它们。

```js
const dinner = {
  meal: 'tacos'
}

const handler = {
  get(target, property, receiver) {
    track(target, property)
    return Reflect.get(...arguments)
  },
  set(target, property, value, receiver) {
    trigger(target, property)
    return Reflect.set(...arguments)
  }
}

const proxy = new Proxy(dinner, handler)
console.log(proxy.meal)

// tacos
```

用自己的话翻译一下:

其中有两个trap函数  

1.**(get)**当有地方读取这个响应式数据时，代理的hadler的get函数的副作用用`track`函数记录下这个值在哪里被用到，告诉声明Vue我这里用了这个响应式数据，到时候更新带我一个的意思。

（记录位置）

2.**(set)**当该响应式数据被改变时,trigger函数被触发,随即会寻找哪些需要使用这个响应式数据的地方。去找那些喊着更新带我一个的地方。

（找位置）

3.OK现在也找到它们的位置了，直接进行新值的更新。

（换新值）

因为完全没看过vue的源码，猜测的抽象模型应该是这样，挺像多米诺骨牌啊哈哈，纯连锁反应。

**track实际上就是订阅的动作，响应式的更新trigger就是发布的意思，响应式的过程就是向所有订阅者发布新值的过程。**这个过程在Vue3是`proxy`实现，而2.6是`Object.defineProperties`实现的

