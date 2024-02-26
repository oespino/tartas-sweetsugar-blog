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
                <link rel="canonical" href="https://www.sweet-sugar.es/sobre-mi"></link>
                <meta property="og:title" content="Sobre mí | Tartas Sweet Sugar"></meta>
                <meta property="og:description" content="Web con recetas de postres, tartas y todo tipo de dulces. Aprende repostería siguiendo mis consejos."></meta>
                <meta property="og:image" content="https://www.sweet-sugar.es/favicon.png"></meta>
                <meta property="og:type" content="website"></meta>
                <meta name="twitter:card" content="summary_large_image"></meta>
                <meta property="twitter:title" content="Sobre mí | Tartas Sweet Sugar"></meta>
                <meta property="twitter:description" content="Web con recetas de postres, tartas y todo tipo de dulces. Aprende repostería siguiendo mis consejos."></meta>
                <meta property="twitter:image" content="https://www.sweet-sugar.es/favicon.png"></meta>
                <link rel="icon" href="/favicon.png" />
            </Head>

            <Header />
            <AboutMe />
            <Footer />
        </div>
    )
}