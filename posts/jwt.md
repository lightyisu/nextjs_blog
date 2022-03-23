---
title: 'jwt认证'
date: '2022-03-23'
tags: 'node'
---



参考：https://www.bilibili.com/video/BV1KY4y1q7PU?spm_id_from=333.1007.top_right_bar_window_history.content.click

#### jwt的原理

node version:

由于我对其他常见的后端语言实在不是很熟悉，就用node下实现的jwt来概述一下：

###### jwt系统：

- 前端用户登录
- 后端验证密码
- 成功后通过Node的jwt库结合私匙生成jwt字符串(即所说的token)
- 发放给前端用户
- 用户收到token记录在cookie或者localstorage
- 用户再次请求api携带token
- 后端检查token代入私匙放入检查函数
- 通过检查发放用户数据

**jwt的形式（头部.负载.签名)** 

```js
const koa = require("koa");
const app = new koa();
const Router = require("koa-router");
const jwt = require("jsonwebtoken");
const router = new Router();
const bodyParser = require("koa-bodyparser");

const jwtkey = "e21dwqfvces2";
const database = {
  name: "lightyisu",
  password: 20220323,
};
router.post("/login", async (ctx, next) => {
  const { name, password } = ctx.request.body;
  if (name == database.name && password == database.password) {
    let token = await jwt.sign({ name }, jwtkey, { expiresIn: "30s" });
    ctx.body = {
      name,
      message: "登录成功",
      token,
    };
  } else {
    ctx.body = "密码错误";
  }
});
router.get("/index", async (ctx) => {
  let payload;
  const token = ctx.request.headers.authorization.split(" ")[1];
try{
      payload= await new Promise((res, rej) => {
    jwt.verify(token, jwtkey, (err, payload) => {
      if (err) rej(err);
      res(payload);
    });
  });
}
catch(err){
  if(err){
    ctx.body={
      message:'TOKEN过期'
    }
  }

}
if(payload){
  ctx.body={
    message:'成功登录',
    payload
  }
}


 
});
app.use(bodyParser());
app.use(router.routes());
app.listen(9999, () => {
  console.log("port 9999");
});

```

```http
##test.http
#send Request
GET  http://localhost:9999/index
authorization:Bearer eyJhbGciOiJjkljakljdklwjkla9.eyJuYW1lIjoibGlnaHR5aXN1IiwiaWF0IjoxNjQ4MDQwNDc1LCJleHAiOjE2NDgwNDA1MDV9.5i3wDh66m2l8dwadwad221312312n00U

```

