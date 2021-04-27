import Head from 'next/head'
import { getAllSortedPostData } from '../lib/post';
import style from './next.module.css'
import DateComponent from '../components/date'
import Link from 'next/link';
const next = ({ sortedPostsData,buildTime}) => {
    return (
        <div>
            <Head >
                <title>Next generation of jiheon.tk</title>
            </Head>
            <header className='text-red-500 p-4 border-solid border-b flex relative border-gray-200 font-bold  text-white'>
                <p className='text-2xl'>Next.jiheon.tk</p>
                <button className='absolute right-6 bg-red-500 shadow-lg  text-white top-2 rounded-xl p-2'>Dark Mode(soon)</button>
            </header>
            <div className={style.wrapper}>

                <div className={style.board}>
                    <h1 className='font-bold h-40'>The Next Generation </h1>
                    <h2>of Jiheon.tk</h2>
                   
                </div>
                <div className={style.postWrapper}>

                    {sortedPostsData.map((post, index) => {
                        return (
                            <Link key={index} href={`posts/${post.fileId}`}>
                                <a className={style.postblock} style={post.bgurl ? { background: `url(${post.bgurl})  ${post.bgoffset?post.bgoffset:'-150px'}` } : {}}>
                                    
                                    <div >
                                        <h2>{post.title}</h2>
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
    const buildTime=new Date().toLocaleString()
    return {
        props: {
            buildTime,
            sortedPostsData
        }
    }
}