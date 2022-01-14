import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/post";
import Head from "next/head";
import Date from "../../components/date";
import utilstyles from "../../styles/utils.module.css";

export default function Post({ postData }) {
  return (
    <Layout bgUrl={postData.bgurl ? postData.bgurl : ""}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      
      <article>
        <h1 className={utilstyles.headingXl}>{postData.title}</h1>
        <div className={utilstyles.lightText}>
          <Date dateString={postData.date} />
        </div>

        <br />
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
      </article>
      <p className="font-bold italic text-right text-xl p-10">
        <span className=" text-red-500 text-4xl">.</span>Posted by time-lapse.tk{" "}
        <i className="bg-logo_ inline-block bg-75% bg-no-repeat w-6 h-6"></i>
      </p>
    </Layout>
  );
}
export async function getStaticPaths() {
  let paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}
