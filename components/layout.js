import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

const name='jiheon';
export const siteTitle='Next.js Sample website'
export default function Layout({children,home}){
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
                    home?(
                        <>
                        <Image priority src='/images/profile.png' className={utilStyles.borderCircle}
                            height={80} width={80} alt={name}/>
                        <h1 className={utilStyles.heading2Xl}>{name}</h1>
                        </>
                    ):(
                        <>
                        <Link href='/'>
                            <a>
                            <Image priority src='/images/profile.png' className={utilStyles.borderCircle} height={80} width={80} alt={name}/>
                            </a>
                        </Link>
                        <h2 className={utilStyles.headingLg}>
                            <Link href='/'>
                                <a className={utilStyles.colorInherit}>{name}</a>
                            </Link>
                        </h2>
                        </>
                    )
                }

            </header>
            <main>
                {children}
            </main>
            {!home&&(<div className={styles.backToHome}>
                <Link href='/'>
                    back to home
                </Link>
            </div>)}
        </div>
    )
}