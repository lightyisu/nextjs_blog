---
title: '原生JS'
date: '2021-05-23'
tags: 'others'

---

## Vanilla JS

#### @keyframes/animation

keyframes:关键帧

```html
<template>
  <div>

      <div id="line1" ></div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

#line1{
   
    transform-origin: left;
    animation: 3s infinite ease-in-out  slidein;
    height: 12px;
    width: 70%;
    background: #007fff;
    margin: 20px;
    
    border-radius: 10px;
}
@keyframes slidein {
    0%{
        transform: scaleX(0);
    }
    100%{
        transform: scaleX(1) ;
    }
}
</style>
```

线性动画条 Composition @keyframes & animation in CSS

来自MDN @keyframes and animation

https://developer.mozilla.org/zh-CN/docs/Web/CSS/@keyframes