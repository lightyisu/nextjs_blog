---
title: 'React/Record'
date: '2021-01-25'
bgurl: 'https://reactjs.org/logo-og.png'
---
# React

#### FLUX的简单构造

**View.js**

```js
import MyButton from './MyButton'
import {Component} from "react";
import {Dispatcher} from  'flux'
const appDispatcher=new Dispatcher();

const EventEmitter=require('events').EventEmitter;
let ListStore = Object.assign({}, EventEmitter.prototype, {
   items: ['a'],
   getAll() {

      return this.items
   },
   emitChange() {

      this.emit('change')
   },
    addItem(text){
      this.items.push(text)
    },
   addChangeListener(callback){
      this.on('change',callback)
   }
});

//DISPATCHER REGISTER(The exact way of change Data)
appDispatcher.register((action)=>{
   switch (action.actionType){
      case 'ADD_LIST':
      ListStore.addItem(action.text);
      ListStore.emitChange();
      break;
      default:
         return null;
   }
})

class View extends Component{
   constructor(props) {
      super(props);
      this.state={items:ListStore.getAll()}
      this.addNewItem=this.addNewItem.bind(this)
   }
   componentDidMount() {
      ListStore.addChangeListener(()=>{
         this.handleChange()
      })
   }
   addNewItem(text){
      appDispatcher.dispatch({
         actionType:'ADD_LIST',
         text:'dw2'
      })
   }
   handleChange(){
    this.setState({
       items:ListStore.getAll() //GET THE LATEST DATA TO MAKE REACT
    })
   }
   render() {
      return (
          <>
             {this.state.items.map((item,index)=>{return <p key={index}>{item}</p>})}
             <MyButton onClick={this.addNewItem}/>

          </>
          )
   }
}
export default View
```

**MyButton.js**

```js
function MyButton(props){
  return(
    <button onClick={props.onClick}>nihao</button>
  )
}


export default MyButton

```

来自:http://www.ruanyifeng.com/blog/2016/01/flux.html (flux-阮一峰)



## 容器组件（Smart/Container Components）和展示组件（Dumb/Presentational Components）

#### **容器组件与展示组件逻辑**

**store/state** =>reduce核心 数据来源

**展示组件**=>UI页面 显示效果提供 需要数据驱动 数据来自Props

**容器组件（最终需要组件）**=>引导作用 引导展示组件数据正确连接到store

容器组件引导方式：映射 

即将props正确引导到store数据上

方式：

```js
mapStateToProps=(state)=>{return{key:val}} 数据引导

mapDispatchToProps=(dispatch)=>{return{key:val}} 事件引导

key直接对应展示组件props
```

通过`connect(mapStateToProps,mapDispatchToProps)(展示组件)`将展示组件连接至store

即为展示组件注入数据

容器组件是最终部分合成了展示组件 并连接好了数据

|                    | 展示组件                     | 容器组件（最终组件）                                         |
| -----------------: | :--------------------------- | ------------------------------------------------------------ |
|           **作用** | 描述如何展现（骨架、样式）UI | 引导store注入展示组件（mapStateToProps...) 指引展示组件的props对应state的key-value |
| **直接使用 Redux** | 否                           | 是                                                           |
|       **数据来源** | props                        | 监听 Redux state(来自于store)                                |
|       **调用方式** | 手动                         | 通常由 React Redux 生成（connect)                            |

//update before 2021/1/25

索引自:

[React 之容器组件和展示组件相分离解密](https://segmentfault.com/a/1190000006845396)

**不区分容器和展示组件**

```js
import {Component} from 'react'

class CommentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: []
        }
    }
    componentDidMount() {
       //模拟获取请求
        setTimeout(() => {
            this.setState({
                comments: [
                    {body: 'The story nice', author: 'john'},
                    {body: 'React is real tool', author: 'evan'},
                    {body: 'Good tool!', author: 'jane'}]
            })
        }, 2000)
    }

    render() {
        // map(callback(@comment-item)=>{}) real arguments pass
        return <ul>{this.state.comments.map(this.renderComments)}</ul>
    }

    renderComments({body, author}) {
        return <li>{body}-{author}</li>
    }
}

export default CommentList
```

缺点：CommentList过分依赖于写定数据 无法复用

**分离容器组件与展示组件**

*容器组件 CommentListContainer.js*

```js
import {Component } from 'react'
import CommentList from './CommentList'
class  CommentListContainer extends  Component{
   constructor(props) {
      super(props);
      this.state={
         comments:[]
      }
   }
   // Mock Fetch the data
   componentDidMount() {
      setTimeout(()=>{
         this.setState({
            comments:[
               {body: 'The story nice', author: 'john'},
               {body: 'React is real tool', author: 'evan'},
               {body: 'Good tool!', author: 'jane'}
            ]
         })
      },2000)
   }
   render() {
      return <CommentList comments={this.state.comments} />
   }
}
export default  CommentListContainer

```

负责展示数据层

*展示组件 CommentList.js*

```js
import {Component} from 'react'
class CommentList extends  Component{
    render() {
        return <ul>{this.props.comments.map(this.renderComment)}</ul>
    }
    renderComment({body,author}){
        return <li>{body}-{author}</li>
    }
}
export  default  CommentList

```

#### The terser redux example

```jsx
import {createStore} from 'redux'
import {Component} from 'react'
//原始的state=====>defaultState
const defaultState=0
const add=()=>{
    return{
        type:'ADD_COUNT'
    }
}
const minus=()=>{
    return{
        type:'MINUS_COUNT'
    }
}
const reducers=(state=defaultState,action)=>{
    switch (action.type){
        case 'ADD_COUNT':
            return state+1;
        case 'MINUS_COUNT':
            return state-1;
        default:
            return state;
    }
}
const store=createStore(reducers);

function CounterWidget({count}){
    return( <>
        <h1>{count}</h1>
        <button onClick={()=>{store.dispatch(add())}}>+</button>
        <button onClick={()=>{store.dispatch(minus())}}>-</button>
    </>)
}
class Counter extends Component{
    constructor(props) {
        super(props);
        this.state={
            countNum:store.getState()
        }
    }
    componentDidMount() {
        store.subscribe(()=>{
            this.setState({
                countNum:store.getState()
            })
        })
    }

    render() {
        return (
            <CounterWidget count={this.state.countNum}/>
        )
    }
}
export default Counter

```

简洁的计时器 redux案例

#### react-redux 绑定 计数器 (单js)

```jsx
import {createStore} from 'redux'
import {connect,Provider} from 'react-redux'

//ui 组件
function CounterWidget({countNum,add}){
    return(
        <>
            <h1>{countNum}</h1>
            <button onClick={add}>add</button>

            </>
    )
}
const reducers=(state={countNum:0},action)=>{
        switch (action.type){
            case 'ADD':

                return {countNum:state.countNum+2}
            default:
                return state;
        }
}
const store=createStore(reducers)

const mapStateToProps=(state)=>{
    return{
        countNum: state.countNum
    }
}
const mapDispatchToProp=(dispatch)=>{
    return {

        add:()=>{

            dispatch({type:'ADD'})}
    }
}
const ContainerOfCounter=connect(mapStateToProps,mapDispatchToProp)(CounterWidget)
const WrappedCounter=(
    <Provider store={store}>
        <ContainerOfCounter/>
    </Provider>
)
function WrappedCounterComponent(){
    return WrappedCounter
}
export  default  WrappedCounterComponent;
//在index.js中直接<WrappedCounterComponent/>

```

#### js reduce



假如运行下段`reduce()`代码：

```js
[0, 1, 2, 3, 4].reduce(function(accumulator, currentValue, currentIndex, array){
  return accumulator + currentValue;
});
```

callback 被调用**四次**，每次调用的参数和返回值如下表：

| callback    | accumulator | currentValue | currentIndex | array           | return value |
| ----------- | ----------- | ------------ | ------------ | --------------- | ------------ |
| first call  | 0           | 1            | 1            | [0, 1, 2, 3, 4] | 1            |
| second call | 1           | 2            | 2            | [0, 1, 2, 3, 4] | 3            |
| third call  | 3           | 3            | 3            | [0, 1, 2, 3, 4] | 6            |
| fourth call | 6           | 4            | 4            | [0, 1, 2, 3, 4] | 10           |

由`reduce`返回的值将是最后一次回调返回值（10）。

你还可以使用[箭头函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)来代替完整的函数。 下面的代码将产生与上面的代码相同的输出：

```js
[0, 1, 2, 3, 4].reduce((prev, curr) => prev + curr );
```



##### tip:

**注意每个 reducer 只负责管理全局 state 中它负责的一部分。每个 reducer 的 `state` 参数都不同，分别对应它管理的那部分 state 数据。**

#### redux middleware

https://zhuanlan.zhihu.com/p/85403048

https://github.com/reduxjs/redux-thunk/blob/master/src/index.js

https://zhuanlan.zhihu.com/p/85306555

需要使用applyMiddleware

```js
const store = createStore(reducer, applyMiddleware(thunkMiddleware))
```

redux-thunk中间件

```js
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
```

```js
//知乎版
// middlewares即redux-thunk这样的中间件
export default function applyMiddleware(...middlewares) {
 // applyMiddleware返回另一个函数，也就是`enhancer`。
 // `enhancer`接受原来的createStore函数为参数.
 return function enhancer(createStore) {
 // enhancer的返回值是另一个函数，其实就是`新的createStore`
  return function enhancedCreateStore(...args) {
 // 调用老的createStore，来获得store。
  const store = createStore(...args)
 // 定义新的dispatch函数，后边会被修改
 let dispatch = () => {
  throw new Error('Dispatching while constructing your middleware is not allowed.Other middleware would not be applied to this dispatch.')
 }
 // 暴露个每个middleware的API。
 const middlewareAPI = {
  getState: store.getState,
 dispatch: (...args) => dispatch(...args)
 }
 // 把所有传入的middlewares转为一个数组。
 const chain = middlewares.map(function(middleware) {
  return middleware(middlewareAPI)
 })
 // 新的dispatch函数，其实就是把所有middleware的调用链加入dispatch的执行过程中。
 dispatch = compose(...chain)(store.dispatch)
 // 新的createStore的返回值，其实唯一变化的就是dispatch字段。
 return {
  ...store,
 dispatch,
 }
 }
 }
}
//阮一峰版
export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, preloadedState, enhancer) => {
    var store = createStore(reducer, preloadedState, enhancer);
    var dispatch = store.dispatch;
    var chain = [];

    var middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    };
    chain = middlewares.map(middleware => middleware(middlewareAPI));
    dispatch = compose(...chain)(store.dispatch);

    return {...store, dispatch}
  }
}
```

使用此中间件可在action creator中使用异步操作 不一定必须为action对象 

实际上

在判断action是否是函数 如果是函数则执行此函数 并给予store.dispatch

## HOOK(函数式组件钩入react特性)

> *Hook* 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

***useEffect的性能优化***

在某些情况下，每次渲染后都执行清理或者执行 effect 可能会导致性能问题。在 class 组件中，我们可以通过在 `componentDidUpdate` 中添加对 `prevProps` 或 `prevState` 的比较逻辑解决：

```js
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}
```

这是很常见的需求，所以它被内置到了 `useEffect` 的 Hook API 中。如果某些特定值在两次重渲染之间没有发生变化，你可以通知 React **跳过**对 effect 的调用，只要传递数组作为 `useEffect` 的第二个可选参数即可：

```js
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 仅在 count 更改时更新
```

上面这个示例中，我们传入 `[count]` 作为第二个参数。这个参数是什么作用呢？如果 `count` 的值是 `5`，而且我们的组件重渲染的时候 `count` 还是等于 `5`，React 将对前一次渲染的 `[5]` 和后一次渲染的 `[5]` 进行比较。因为数组中的所有元素都是相等的(`5 === 5`)，React 会跳过这个 effect，这就实现了性能的优化。



example=>当处于0状态下点击reset并不会触发effect回调函数

```js
import React,{useEffect, useState} from 'react'

const Home=(props)=>{
  
    const [count,setCount]=useState(0)
    useEffect(()=>{
        console.log('aoligei');
    },[count])
    return (<div>
            <p>{count}</p>
            <button onClick={()=>{setCount(count+1)}}>+</button>
            <button onClick={()=>{setCount(count-1)}}>-</button>
            <button onClick={()=>{setCount(0)}}>reset</button>
    </div>)
}
export default Home;

```



> **React 靠的是 Hook 调用的顺序** 来确定hook 

[react-doc]: https://react.docschina.org/docs/hooks-rules.html

**HOOK两大规则：1.顶层使用 2.只在React函数调用**

```js
function Example() {
  const [count, setCount] = useState(0);

  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + count);
    }, 3000);
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <button onClick={handleAlertClick}>
        Show alert
      </button>
    </div>
  );
}
```

如果你先点击「Show alert」然后增加计数器的计数，那这个 alert 会显示**在你点击『Show alert』按钮时**的 `count` 变量。这避免了那些因为假设 props 和 state 没有改变的代码引起问题。

#### 异步获取最新数据=>通过**React/useRef()**

```js
//改进为可在异步后获得最新count/state 使用useRef进行实现
const Home=props=>{
    const [count,setCount]=useState(0);
    let countRef=useRef(count)
    //count 更新 ref也更新 这是普通变量无法做到的/若将其改为普通变量则普通变量会在每次effect之后重置
    //ref则不会
	useEffect(()=>{
        countRef.current=count;
    },[count])
    function handleAlertClick(){
        setTimeout(() => {
            alert(countRef.current)
        }, 3000);
        console.log(countRef.current)
    }
    return(
        <div>
            <p>you clicked {count} times</p>
            <button onClick={()=>{setCount(count+1)}}>
                +
            </button>
            <button onClick={handleAlertClick}>
                show alert 
            </button>
        </div>
    )
}

```

useRef可在函数组件中钩子中保持最新 相当于createRef 数据保存在current即可

因为ref具有此特性 所以还可以通过ref进行prevProps的记录

-------

`useState`可以用最简单的方式更新状态，但是状态更新的逻辑（例如上面例子中的加减一运算）散落在UI中，不能独立复用，也不便于测试。

```js
import React, { useReducer } from 'react'

const initialState = {num: 0};

const reducer = (state, action) => {
  switch(action.type) {
    case 'decrement':
      return {...state, num: state.num - 1}
    case 'increment':
      return {...state, num: state.num + 1}
    default:
      return state;
  }
}

const ComponentUseReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { num } = state
  return (
    <div>
      <h2>Using useReducer</h2>
      Number: {num}
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
    </div>
  );
};

export default ComponentUseReducer;
```

`useReducer`的逻辑脱离了UI，可以独立复用。reducer就是一个单纯的Js方法，我们可以对reducer进行单独测试，甚至可以在chrome中进行调试

`useReducer`虽然很好地分离了逻辑和UI，但是无法像redux一样进行跨组件的状态共享，例如子组件无法方便的访问到`num