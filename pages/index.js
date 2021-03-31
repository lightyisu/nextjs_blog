import Head from 'next/head'
import Date from '../components/date'
import Link from 'next/link'

import Layout, { siteTitle } from '../components/layout'
import { getAllSortedPostData } from '../lib/post'

import utilStyles from '../styles/utils.module.css'



export default function Home({sortedPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>jiheon</p>
        <p> The migration Blog of Next.js
        </p>
        <ul  className={utilStyles.list}>
          {
            sortedPostsData.map((post,index)=>{
              return (
                <li key={index} className={utilStyles.listItem}>
                  <Link href={`posts/${post.fileId}`}>
                    <a>{post.title}</a>
                  </Link>
                  <br/>
                  <small className={utilStyles.lightText}>
                    <Date dateString={post.date}/>
                  </small>
                </li>
              )
            })
          }
        </ul>
      </section>


    </Layout>
  )
}
export async function getStaticProps(){
    const sortedPostsData=getAllSortedPostData();
   
   
  return{
      props:{
          sortedPostsData
      }
    }
}