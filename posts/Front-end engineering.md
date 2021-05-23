---
title: '前端工程化与周边'
date: '2021-02-20'
bgurl: '/images/gulp-ex2.PNG'
bgoffset: '-10px 0px'
tags: 'others'
---

学习备忘

开发周边-前端工程化



### GULP

<img src='/images/gulp-ex2.PNG'/>

用于前端自动化流程 类似于`npm script`

旧有api/gulp.task 现可更换为`exports.taskname` 并且使用gulp cli命令行执行

`gulp` 执行 gulp `exports.default`导出任务

`gulp xxx`执行gulp `exports.xxx`导出任务

```js
const gulp=require('gulp');
const concat=require('gulp-concat');


gulp.task('concat',()=>{
    return gulp.src('./src/*.txt').pipe(concat('bundle.txt')).
    pipe(gulp.dest('./dist/')).on('end',()=>{
        console.log('合成完毕');
    })
})
gulp.task('watch',()=>{
    gulp.watch('./src/*.txt',gulp.series('concat',(cb)=>{
        cb()
    }))
})
```

该段代码作用 监听src文件夹下的txt文件内容变动 并将其合并到一个text即dist/bundle.txt

执行 `gulp watch` 即可

效果

<img src='/images/gulp-ex1.PNG'/>

### VITE

* **ESM不支持裸模块导入** 

  ```js
  import { someMethod } from 'my-dep'  //NOT SUPPORT IN NATIVE ESM (CAN BE USED IN WEBPACK.SYS)
  ```

  即无法像`webpack`构建的项目一样能够自动在node_modules里找到相应的module

  ***VITE为此提供了解决方法:***

  1.预构建(powered by **esbuild**)

   * 转化依赖为ESM模式

   * 减轻浏览器请求负担 大量的依赖若不捆绑成一个模块会减缓速度

     通过预构建 `lodash-es` 成为一个模块，我们就只需要一个 HTTP 请求了

   2.重写路径 给予裸模块正确的新路径 合法的URL 如`/node_modules/.vite/my-dep.js?v=f3sf2ebd`

  

### NGINX

* **Nginx** 与 **RTMP(协议)** 搭建实施串流

  https://www.cnblogs.com/linuxAndMcu/p/12517787.html

* **NGINX**  可实现 **反向代理,跨域**

  跨域实现 : 通过配置Nginx实现访问localhost:80 (即Nginx服务器) Nginx通过代理使其访问到 localhost:3000 （即 React的客户端口) 实现了前端通过Nginx展示

  ​      

  ```nginx
  //NOT REAL CONFIG
  	{ listen 80
      location / {proxy=>localhost:3000}
      location /api {proxy=>localhost:4000}
      location /thumbnails {proxy=>localhost:4000}}
  //localhost:3000 : 前端入口
  //localhost:4000 : 后端入口
  ```

  项目启动通过 Nginx的80端口启动

  通过 `Nginx`  解决了跨域问题

### 前端测试

简单的测试代码

来自：https://juejin.cn/post/6844904196244766728

```js
const add=(a,b)=>{
    return a+b;
}
function test(funRes){
    return{
        toBe:(expectValue)=>{
            if(funRes===expectValue){
                console.log('Test Pass')
            }
            else{
                console.log('Fail Test')
            }
        }
    }
}
test(add(3,2)).toBe(5)
```

#### 使用CRA/JEST的前端测试

见:https://juejin.cn/post/6894234532224958478

源组件

```js
//MessageControl.js
//The feature of the component is to show msg through the checkbox to display it or not
const MessageControl=({children})=>{
  const [showMessage,setShowMessage]=useState(false)
  return(
    <div>
      <label htmlFor='toggle'>Show Mes</label>
       <input id='toggle' type='checkbox'
         onChange={(e)=>setShowMessage(e.target.checked)
         }
         checked={showMessage}/>
         {showMessage?children:null}
    </div>
  )
}
export default MessageControl;


```

测试代码

```js
//MessageControl.test.js
import '@testing-library/jest-dom'
import React from 'react';
import {render,fireEvent,screen} from '@testing-library/react'
import {MessageControl} from './App'
it('shows the children when checkbox is checkes',()=>{
  const testMessage='Test Message';
  //render的作用：在NODE环境下还原DOM 
  render(<MessageControl>{testMessage}</MessageControl>)
  expect(screen.queryByText(testMessage)).toBeNull();
  fireEvent.click(screen.getByLabelText(/Show/i));
  expect(screen.getByText(testMessage)).toBeInTheDocument()

})
 //query* 类型的 API 在被调用的时候，如果没有找到对应的 DOM，会返回 null，但是 get* 在没有找到对应的 DOM 时会直接报错。
```

#### Vnode/Virtual DOM

> vnode 作用:使用DIFF算法以寻求最大效率的DOM更新替换 提升DOM的重绘重排效率 减少DOM更新开销，使得简单数据的更新变得高效

现有成型库:**snabbdom**(Vue采用)

diff算法中关注的三个核心：节点类型，属性数据，子节点对象

**目的：**

**提升前端渲染性能**！

**提升前端渲染性能**！

**提升前端渲染性能**！

```js
//From article:https://juejin.cn/post/6844903609667321863#heading-4
//snabbdom api: v 3.0.1
import {init,classModule,propsModule,styleModule,eventListenersModule,h} from 'snabbdom'
const patch=init([
    classModule,
    propsModule,
    styleModule,
    eventListenersModule
])
const container=document.getElementById('root');

function View(name){
    return h('div',null,[
        h('input',{props:{type:'text',placeholder:'Enter your name'},on:{
            input:updateText
        }}),
        h('p',null,'your name is '+name)
    ])
}
const updateText=(e)=>{
    let newVnode=View(e.target.value);
    currentVnode=patch(currentVnode,newVnode);
}
let currentVnode=patch(container,View(''))
```

以上是一个Input 表单元素值如何与 p 中的name值保持一致，

表单事件触发Input表单事件导致重绘Vnode 再通过新旧Vnode比较**(DIFF)**进行最终的实际DOM绘制

最终呈现的DOM重绘来自Vnode的DIFF算法结果

使得实际绘制编排效率提升,DOM重绘量减少

即Vue中`V-model`原理实现

Vue,React中的key能够帮助我们在DIFF时效率更高 因为DIFF部分算法基于Key的比较

#### Vue响应式探索

> 前端/数据响应式

基于**Proxy**的响应式数据

简单示例/by self

```html
 <div id="app"></div>
```



```js
   let obj={a:2021};
   
    let objProxy=new Proxy(obj,{
        set(target,prop,val,receiver){
            document.getElementById('app').innerHTML=val;
            return Reflect.set(...arguments);
        }
    })
    document.getElementById('app').innerHTML=objProxy.a;
//修改objProxy.a='Hello world'此时DOM也会同步更新
```

每当设置新值(更改objProxy.a)后DOM中的数据会相应更新

基于**Object.defineProperty**

```js
	var a=2021
    let obj={}
    Object.defineProperty(obj,'a',{
        get(){
            return a
        },
      
        set(val){
            document.getElementById('app').innerHTML=val;
            a=val;
            
        }
    })
    document.getElementById('app').innerHTML=obj.a;
    document.querySelector('button').onclick=()=>{
        obj.a='I clicked it!'
    }
```

