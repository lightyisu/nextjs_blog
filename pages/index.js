import Head from 'next/head'
import { getAllSortedPostData } from '../lib/post';
import style from './next.module.css'
import DateComponent from '../components/date'
import Link from 'next/link';
import NavBtn from '../components/Nav-btn'
import TagNavList from '../components/TagNavList';
import { useState } from 'react';
import NavHead from '../components/NavHead';
import JuejinIcon from '../components/svg-icon/juejin'
const next = ({ sortedPostsData, buildTime }) => {
    let [filterTag, setTag] = useState('all');
    let coverColor=['#FFEE58','#FF6958','#656CFF','#8D77FF','#D799FF','#D688FF'];

    return (
        <div>
            <Head >
                <title>LYRA blog</title>
            </Head>
            <NavHead/>
         
            <NavBtn setTag={setTag} filterTag={filterTag} />

            <div className='flex justify-center pt-28  bg-gray-200'>
                <div className='min-w-300 hidden sm:block mb-10'>
                    <TagNavList setTag={setTag} filterTag={filterTag} />
                    <div className='px-16 font-bold'><a href='https://github.com/lightyisu/nextjs_blog'><i className='bg-github-icon icon'></i>Github</a></div>
                    <div className='px-16 font-bold'><a href='https://juejin.cn/user/4212984289430941'><JuejinIcon/></a></div>
                </div>

                <div className='flex sm:w-1/3 w-10/12 flex-wrap ' >

                    {sortedPostsData.map((post, index) => {
                        if (post.tags != filterTag && filterTag != 'all') {
                            return null;
                        }
                        return (
                            <Link  key={index} href={`posts/${post.fileId}`}>

                                <a className='relative overflow-hidden  my-6 rounded-2xl text-white md:w-40  md:h-26 m-2  h-64 w-36  shadow-2xl' style={post.bgurl ? { background: `url(${post.bgurl})  ${post.bgoffset ? post.bgoffset : '-150px'}` } : {background:coverColor[Math.floor(Math.random()*coverColor.length)]}}>

                                    <div className='w-full p-5 absolute bottom-0  bg-white text-black' >
                                        <h2 className=' break-all w-full text-lg m-0 font-bold'>{post.title}</h2>
                                        <DateComponent   dateString={post.date} />
                                    </div>
                                </a>

                            </Link>
                        )
                    })}

                </div>
                </div>
            
            <footer className={style.footer}>
                <h3>Powered By <a href='https://nextjs.org' className='nextjsColor'>Next.js</a>&<a href='https://tailwindcss.com/' className='text-green-200'>Tailwind.css</a></h3>
                <p className='p-0'>由<span className='nextjsColor'>Next.js</span>驱动</p>
                <p className='p-0'>由<span className='text-green-200'>Tailwind.css</span>框架驱动样式</p>
                <p className='p-0'>Lapse of @2021-2022</p>
                <p className='p-0'>最后编译于{buildTime}</p>

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