---
title: 'Node/Tip/Record'
date: '2020-11-30'
bgurl: 'https://th.bing.com/th/id/R5bf41d022ce10ad2445d7a3c2449f017?rik=wbHJ9i9j%2fwAq0Q&pid=ImgRaw'
---


### node小tip

- 如果想使用服务端传html设置header头`res.setHeader('Content-Type','text/html;charset=utf-8');`


即可

- 一个服务端传输cookie的例子

  

***./index.html***

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    Cookie demo
    <script>
        fetch('http://127.0.0.1:3000/givemeacookie').then(res=>{
            
            return res.json()
           
        }).then(data=>{
            console.log(data)
            const cookies=document.cookie;
            console.log('cookies',cookies)
        }).catch(err=>{
            console.log('err',err)
        })
    </script>
</body>
</html>
```

***nodejs***

```js
const http=require('http');
const url=require('url');
const util=require('util');
const fs=require('fs')
const server=http.createServer((req,res)=>{
   
    const {pathname}=url.parse(req.url,true);
   
    if(pathname==='/givemeacookie'){
        res.statusCode=200;
        res.setHeader('Content-Type','application/json;charset=utf-8');
        res.setHeader('Access-Control-Allow-Origin','*');
        console.log('receive request and make a cookie now!');
        res.setHeader('set-cookie','key1=va1');
        res.end(JSON.stringify({result:'ok'}))
    }
    else{
        res.statusCode=200;
        res.setHeader('Content-Type','text/html;charset=utf-8');
        let content=fs.readFileSync('./index.html')
        res.end(content)
    }

})
server.listen(3000,'127.0.0.1',()=>{
    console.log(`Server running on 3000`)
})

```

**服务端与客户端必须同源HOST 同端口！**