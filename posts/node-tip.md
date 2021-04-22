---
title: 'Node/Tip/Record'
date: '2020-11-30'
bgurl: 'https://th.bing.com/th/id/R5bf41d022ce10ad2445d7a3c2449f017?rik=wbHJ9i9j%2fwAq0Q&pid=ImgRaw'
---

### Node_Cookie

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

### Node

#### Process.argv

```js
[
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\lightyisu\\Desktop\\temp\\node-7day\\index.js'
]
```

 `process`是一个全局变量，可通过`process.argv`获得命令行参数。由于`argv[0]`固定等于NodeJS执行程序的绝对路径，`argv[1]`固定等于主模块的绝对路径，因此第一个命令行参数从`argv[2]`这个位置开始。

#### 一个简单的Node.js/CopyFiles功能模块

```js
//index.js
//The Copy Process
const fs=require('fs');
function copyFile(src,des){
    fs.writeFileSync(des,fs.readFileSync(src,'utf-8'))
}
const argv=process.argv.slice(2);
copyFile(argv[0],argv[1]);
console.log('File Copied');
```

**使用**:

```shell
node index.js ./m1.js ./mm.js
```

##### **With Stream** 

##### 减少一次大量内存占用

```js
//The Stream of Copy Process
const fs=require('fs');
function copy(src,dst){
    fs.createReadStream(src).pipe(fs.createWriteStream(dst))
}
const argv=process.argv.slice(2);
copy(argv[0],argv[1]);
console.log('File Copied with Stream');
```

**注**:有时要表示一个很大的数字，比如255，如果要用二进制表示，就是8个1，即11111111，而如果用十六进制表示就是0xff，对于越大的数，用十六进制来表示相对二进制就更加显得简洁。
那为什么不用十进制呢？因为二进制数是计算机语言，而十六进制 16是2的4次方，这样系统在转换数制时会更加快捷。

