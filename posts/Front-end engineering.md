---
title: '前端工程化与周边'
date: '2021-02-20'
---

学习备忘

开发周边-前端工程化



### GULP

<img src='img/gulp-ex2.PNG'/>

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

<img src='img/gulp-ex1.PNG'/>

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

* 