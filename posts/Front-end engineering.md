---
title: '前端工程化与周边'
date: '2021-02-20'
bgurl: '/images/gulp-ex2.PNG'
bgoffset: '-10px 0px'
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

