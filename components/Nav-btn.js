import { useState } from "react"
import TagNavList from './TagNavList'
export default function NavBtn(props){
    let [navState,setNavState]=useState(false)
    return (
        <>
        <div className='p-1 rounded-3xl block sm:hidden fixed w-10 cursor-pointer h-10 z-20 bottom-3 right-3 bg-black text-2xl  text-white text-center'
         onClick={()=>{setNavState(!navState)}}>{navState?'×':'='}</div>
         <div className='fixed w-full h-full top-0 text-center bg-blue-100  bg-opacity-75 z-10' style={navState?{display:'block'}:{display:'none'}}>
         <TagNavList {...props} />
         </div>
        </>
    )
}