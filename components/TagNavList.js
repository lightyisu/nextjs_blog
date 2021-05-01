import Link from "next/link"

export default function TagNavList({ setTag ,filterTag}) {
    return (
        <ul className='p-10'>
            <li className={filterTag=='all'?'bg-white':''} onClick={() => { setTag('all') }}>
                <i className='bg-all-icon'></i>全部</li>
            <li className={filterTag=='react'?'bg-white':''} onClick={() => { setTag('react') }}> <i className='bg-react-icon'></i>React </li>
            <li className={filterTag=='vue'?'bg-white':''} onClick={() => { setTag('vue') }}><i className='bg-vue-icon'></i>Vue</li>
            <li className={filterTag=='node'?'bg-white':''} onClick={() => { setTag('node') }}><i className='bg-node-icon'></i>Node.js</li>
            <li className={filterTag=='list'?'bg-white':''} onClick={() => { setTag('list') }}><i className='bg-list-icon'></i>List</li>
            <li className={filterTag=='others'?'bg-white':''} onClick={() => { setTag('others') }}>Others</li>
        </ul>
    )
}