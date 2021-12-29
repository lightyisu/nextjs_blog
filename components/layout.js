import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import 'highlight.js/styles/atom-one-dark.css'
import NavHead from './NavHead';
const name='jiheon';
export const siteTitle='Next of Jiheon.tk'
export default function Layout({children,bgUrl}){
    return (
        <div className={styles.container}>
            <Head>
                <link rel='icon' href='/favicon.ico'/>
                <meta name='description'
                      content='learn how 2 build using Next.js'/>
                <meta name='og:title' content={siteTitle}/>
                <meta name='twitter:card' content='summary_large_image'/>
            </Head>
            <NavHead/>
            <header className={styles.header}>
                {
                   
                        <>
                        <Link href='/'>
                                {/**PAGE BANNER MADED ON 21.4.11 STILL UNFINISHED */}
                                <div className={utilStyles.postPageBanner} style={bgUrl?{background:`url(${bgUrl})`}:{display:'none'}}>
                                    
                                </div>
                            
                        </Link>
                      
                        </>
                    
                }

            </header>
            <main>
                {children}
            
            
               
                <Link href='/' >
                    <div className='inline-block p-3 m-5 ml-7 text-white  fixed sm:ml-36 w-72 text-center bottom-0 rounded-3xl cursor-pointer  bg-red-500 font-bold
                    text-sm tracking-widest ' >
                       返回首页
                    </div>
                </Link>
                
               
            
            </main>
        </div>
    )
}