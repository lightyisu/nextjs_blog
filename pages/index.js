import Head from 'next/head'
import { getAllSortedPostData } from '../lib/post';
import style from './next.module.css'
import DateComponent from '../components/date'
import Link from 'next/link';
const next = ({ sortedPostsData,buildTime}) => {
    return (
        <div>
            <Head>
                <title>Next generation of jiheon.tk</title>
            </Head>
            <header className={style.header}>
                <p>The Next Generation of jiheon.tk 2021</p>
            </header>
            <div className={style.wrapper}>

                <div className={style.board}>
                    <h1>The Next Generation </h1>
                    <h2>of Jiheon.tk</h2>
                    <img src='/images/blogging.png' alt='boardpng' />
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
                <h3>Powered By <a href='https://nextjs.org' className='nextjsColor'>Next.js</a></h3>
                <p >由<span className='nextjsColor'>Next.js</span>驱动</p>
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