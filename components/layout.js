import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import 'highlight.js/styles/atom-one-dark.css'
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
            </main>
            <div className={styles.backToHome} className='text-red-500'>
                <Link href='/'>
                    back to home
                </Link>
            </div>
        </div>
    )
}