---
title: '零碎'
date: '2021-02-06'
---

React和Redux

零碎记录



* **slug**在前端中指的是有效URL的一部分（除主域名的其他部分），能使URL清晰易懂

  omit 消除;省略

  例如：/posts/2124214141,/music/fromis_9/feel_good

* **ceil**意为[向正无穷取整](javascript:;) 寻找向上方向(>方向)最近的整数 js中使用Math.ceil()

* **SaaS PasS IasS(infrastructure基础设施)**

  <img src='img/what-is-saas.png'/>

* 1、JS中的||符号：

  运算方法：

     只要“||”前面为false,不管“||”后面是true还是false，都返回“||”后面的值。

     只要“||”前面为true,不管“||”后面是true还是false，都返回“||”前面的值。

  总结：真前假后

  2、JS中的&&符号：

  运算方法：

     只要“&&”前面是false，无论“&&”后面是true还是false，结果都将返“&&”前面的值;

     只要“&&”前面是true，无论“&&”后面是true还是false，结果都将返“&&”后面的值;

  总结：假前真后
  
  
  
* **memoize** 函数

  来自：https://www.wenjiangs.com/doc/memoize

  原理：记录函数最近的返回结果存储为数组 作为缓存 尝试用缓存寻求执行结果

  ```js
  //核心代码 *****
      const memoize = (fn) => {
              const cache = new Map();
              const cached = function (val) {
                  return cache.has(val) ?
                      cache.get(val) :
                      cache.set(val, fn.call(this, val)) && cache.get(val);
              };
              return cached;
          };
  ```

  ```js
      const memoize = (fn) => {
              const cache = new Map();
              const cached = function (val) {
                  return cache.has(val) ?
                      cache.get(val) :
                      cache.set(val, fn.call(this, val)) && cache.get(val);
              };
              cached.cache = cache;
              return cached;
          };
          const mult2 = (a) => (a * 2);
  
  
         function mult() {
              console.time('time');
              mult2(3)
              console.timeEnd('time')
          }
          const mult2memoized=memoize(mult2);
       function multBoost(){
              console.time('timex');
            
              mult2memoized(3);
              console.log(mult2memoized.cache)
              console.timeEnd('timex')
          }
         //mult()
         console.log(mult2memoized.cache)
        
         multBoost()
  ```

* **XSS攻击** 例互动式Web应用 一用户在post区域上传恶意代码 其他用户会下载这段留言代码 可通过这段恶意代码进行窃取攻击

* **冷启动**：当启动应用时，后台没有该应用的进程，这时系统会重新创建一个新的进程分配给该应用，这个启动方式就是冷启动。（从0到有）

  **热启动**：当启动应用时，后台已有该应用的进程，所以在已有进程的情况下，这种启动会从已有的进程中来启动应用，这个方式叫热启动。  

* **ESM**浏览器原生支持无法本地启动 原因

  module 类型需要

  `本地加载Html 文件 (比如一个 `file://` 路径的文件), 你将会遇到 CORS 错误，因为Javascript 模块安全性需要。你需要通过一个服务器来测试。`

  关于 ESM / DYNAMIC IMPORT 

  FROM https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules#%E5%8A%A8%E6%80%81%E5%8A%A0%E8%BD%BD%E6%A8%A1%E5%9D%97
  
* **redux-immutable 功能：**

  把state也变成immutable对象而不是js对象

  使得数据获取行为一致

  **原行为**：state.student.get('name') //获取student的分reducer下的name属性值

  **使用redux-immutable后的行为**:state.get('student').get('name') 

  参考来自 ：https://www.cnblogs.com/superlizhao/p/9474859.html
  
* **记一次useCallback优化方案**

  在开发仿网易云PC网页时，轮播（走马灯）需要切换时更换其父元素的background背景，如果不使用**useCallback**方案 每次切换走马灯 父元素背景会闪烁（原因应该为每次重新读取新图所必须的闪烁读取图片）

  如果使用**useCallback** HOOK及类似缓存方案 可解决此问题 因为这些图片数据或是图片URL被缓存 无需重新再费力读图 自然就不会闪烁了

  UseCB效果为第一次 全部闪烁 多重复几次 闪烁现象无

  原理是图片url或数据被缓存 浏览器无需此前费力读取

  此为**useCallback**可视优化的体现
  
* 在开发时 若想用服务器可访问的静态资源 直接`href:'/img/dw'`即可 这样是绝对路径

  日常开发./ 带句号是相对路径

  ## PRE-RENDERING

* [**Static Generation**](https://nextjs.org/docs/basic-features/pages#static-generation-recommended) is the pre-rendering method that generates the HTML at **build time**. The pre-rendered HTML is then *reused* on each request.

  静态生成式的预渲染

* [**Server-side Rendering**](https://nextjs.org/docs/basic-features/pages#server-side-rendering) is the pre-rendering method that generates the HTML on **each request**.

  有服务端的预渲染

  ![](https://nextjs.org/static/images/learn/data-fetching/static-generation.png)
  
  ![](https://nextjs.org/static/images/learn/data-fetching/server-side-rendering.png)
