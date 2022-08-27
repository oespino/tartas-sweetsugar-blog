import Head from 'next/head'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import AboutMe from '../../components/AboutMe'

export default function Home({ posts }) {

    return (
        <div className='flex flex-col min-h-screen'>
            <Head>
                <title>Tartas Sweet Sugar</title>
                <link rel="icon" href="/favicon.png" />
            </Head>

            <Header />
            <AboutMe />
            <Footer />
        </div>
    )
}