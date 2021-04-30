import { useState } from "react"

export default function NavBtn(){
    let [navState,setNavState]=useState(false)
    return (
        <>
        <div className='rounded-3xl block sm:hidden fixed w-10 cursor-pointer h-10 z-20 bottom-3 right-3 bg-black text-2xl  text-white text-center'
         onClick={()=>{setNavState(!navState)}}>{navState?'×':'='}</div>
         <div className='fixed w-full h-full top-0 text-center bg-blue-100  bg-opacity-75 z-10' style={navState?{display:'block'}:{display:'none'}}>
         <ul className='p-10'>
                        <li ><i className='bg-react-icon'></i>React</li>
                        <li ><i className='bg-vue-icon'></i>Vue</li>
                        <li><i className='bg-node-icon'></i>Node.js</li>
                        <li ><i className='bg-list-icon'></i>List</li>
                    </ul>
         </div>
        </>
    )
}