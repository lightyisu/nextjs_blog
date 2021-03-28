import Layout from '../../components/layout'
import {getAllPostIds, getPostData} from '../../lib/post'

export default function Post({postData}){
    return (
        <Layout>
            <h3>{postData.title}</h3>
            <p>{postData.id}</p>
            <p>{postData.date}</p>
            <div dangerouslySetInnerHTML={{__html:postData.contentHtml}}>
             
            </div>
        </Layout>
    )
}
export async function getStaticPaths(){
    let paths=getAllPostIds()
    
    return{
        paths,
        fallback:false
    }
}
export async function getStaticProps({params}){
   const postData=await getPostData(params.id)
  
    return{
        props:{
            postData
        }
    }
}