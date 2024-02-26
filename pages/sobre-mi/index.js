import Head from 'next/head'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import AboutMe from '../../components/AboutMe'

export default function Home() {

    return (
        <div className='flex flex-col min-h-screen'>
            <Head>
                <title>Sobre mí | Tartas Sweet Sugar</title>
                <meta name="description" content="Web con recetas de postres, tartas y todo tipo de dulces. Aprende repostería siguiendo mis consejos." />
                <link rel="icon" href="/favicon.png" />
            </Head>

            <Header />
            <AboutMe />
            <Footer />
        </div>
    )
}