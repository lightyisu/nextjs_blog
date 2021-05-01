import Head from 'next/head'
import { getAllSortedPostData } from '../lib/post';
import style from './next.module.css'
import DateComponent from '../components/date'
import Link from 'next/link';
import NavBtn from '../components/Nav-btn'
import TagNavList from '../components/TagNavList';
import { useState } from 'react';
const next = ({ sortedPostsData, buildTime }) => {
    let [filterTag,setTag]=useState('all');
    return (
        <div>
            <Head >
                <title>Next generation of jiheon.tk</title>
            </Head>
            <header className='text-red-500 p-4 border-solid border-b flex relative  font-bold'>
                <p className='text-2xl'>Next.jiheon.tk</p>
                <button className='absolute right-6 bg-red-500 shadow-lg  text-white top-2 rounded-xl p-2'>Dark Mode(soon)</button>
            </header>
            <NavBtn setTag={setTag} filterTag={filterTag} />
            
            <div className='flex justify-center bg-gray-200'>
                <div className='min-w-300 hidden sm:block'>
                   <TagNavList setTag={setTag} filterTag={filterTag}/>
                </div>

                <div className='flex sm:w-1/3 w-10/12 flex-wrap ' >

                    {sortedPostsData.map((post, index) => {
                        if(post.tags!=filterTag&&filterTag!='all'){
                            return null;
                        }
                        return (
                            <Link key={index} href={`posts/${post.fileId}`}>

                                <a  className='relative overflow-hidden bg-red-500 my-6 rounded-2xl text-white w-full  h-80 shadow-2xl' style={post.bgurl ? { background: `url(${post.bgurl})  ${post.bgoffset ? post.bgoffset : '-150px'}` } : {}}>

                                    <div className='w-full p-4 absolute bottom-0  bg-white text-black' >
                                        <h2 className='text-xl font-bold'>{post.title}</h2>
                                        <DateComponent dateString={post.date} />
                                    </div>
                                </a>

                            </Link>
                        )
                    })}

                </div>
            </div>
            <footer className={style.footer}>
                <h3>Powered By <a href='https://nextjs.org' className='nextjsColor'>Next.js</a>&<a href='https://tailwindcss.com/' className='text-green-200'>Tailwind.css</a></h3>
                <p >由<span className='nextjsColor'>Next.js</span>驱动</p>
                <p>由<span className='text-green-200'>Tailwind.css</span>框架驱动样式</p>

                <p>最后编译于{buildTime}</p>

            </footer>
        </div>
    )
}
export default next;

export async function getStaticProps() {
    const sortedPostsData = getAllSortedPostData()
    // calculate The compiled time
    const buildTime = new Date().toLocaleString()
    return {
        props: {
            buildTime,
            sortedPostsData
        }
    }
}