import Head from 'next/head'
import Link from 'next/link'
import Layout,{siteTitle} from '../components/layout'
import Alert from '../components/alert'
import utilStyles from '../styles/utils.module.css'
import { getAllPostsList } from '../lib/post'


export default function Home({postsList}){
  return (
    <Layout home>
    <Head>
      <title>{siteTitle}</title>
    </Head>
    <section className={utilStyles.headingMd}>
      <p>jiheon</p>
      <p> (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)</p>
      <p>blog 
        </p>
      {postsList.map((post,index)=>{
        return (
          <h2 key={index}><Link href={`/posts/${post}`}>{post}</Link></h2>
        )
      })}
    </section>
    

    </Layout>
  )
}
export async function getStaticProps(){
    const postsList=getAllPostsList();
  
    return{
      props:{
          postsList
      }
    }
}