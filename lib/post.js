import path from 'path'
import fs from 'fs'
import matter from 'gray-matter';
import html from 'remark-html'
import remark from 'remark';
const postsDirectory=path.join(process.cwd(),'/posts')
export function getAllPostIds(){
    let fileNames=fs.readdirSync(postsDirectory);
    let  names= fileNames.map((fileName)=>{
        return {
            params:{
                id:fileName.replace(/\.md$/,'')
            }
        }
        
    })   


    return names; 
}
export function getAllSortedPostData(){
    let fileNames=fs.readdirSync(postsDirectory);
    
    const postsData=fileNames.map((filename)=>{
        let fileId=filename.replace(/\.md$/,'');
        let fileContent=fs.readFileSync(path.join(postsDirectory,`${filename}`));
        let matterRes=matter(fileContent);
        return{
            ...matterRes.data,
            fileId
        }
    })
    return postsData.sort((a,b)=>{
        if(a.date<b.date){
            return 1;
        }
        else{
            return -1;
        }
    })
}


export async function getPostData(id){
    const fullPath=path.join(postsDirectory,`${id}.md`);
    const fileContent=fs.readFileSync(fullPath);
    const matterRes=matter(fileContent);
   
    const processedContent=await remark().use(html).process(matterRes.content);
    const contentHtml=processedContent.toString()
    return{
        id,
        ...matterRes.data,
        contentHtml
    }
}