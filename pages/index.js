import Head from 'next/head'
import { getAllSortedPostData } from '../lib/post';
import style from './next.module.css'
import Date from '../components/date'
import Link from 'next/link';
const next=({sortedPostsData})=>{
    return(
        <div>
            <Head>
                <title>Next generation of jiheon.tk</title>
            </Head>
            <header className={style.header}>
            <p>The Next Generation of jiheon.tk</p>
            </header>
            <div className={style.wrapper}>
                
               <div className={style.board}>
                  <h1>The Next Generation </h1>
                  <h2>of Jiheon.tk</h2> 
                  <img src='/images/blogging.png' alt='boardpng'/>
               </div>
               <div className={style.postWrapper}>
             
                {sortedPostsData.map((post,index)=>{
                    return (
                        <Link key={index} href={`posts/${post.fileId}`}>
                        <a  className={style.postblock}>
                        <div >
                        <h2>{post.title}</h2>
                        <Date dateString={post.date}/>
                     </div>
                     </a>
                     </Link>
                    )
                })}
             
                </div>
            </div>
        </div>
    )
}
export default next;

export async function getStaticProps(){
    const sortedPostsData=getAllSortedPostData()
    return {
        props:{
           sortedPostsData
        }
    }
}