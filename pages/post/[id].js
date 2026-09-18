import Head from 'next/head'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Detail from '../../components/Detail'
import { getAllPostIds, getPostData } from '../../lib/posts'

export default function PostDetail({ post }) {

    const pageTitle = `${post.title} | Tartas Sweet Sugar`
    const pageURL = `https://www.sweet-sugar.es/post/${post.id}`

    return (
        <div className='flex flex-col min-h-screen'>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content="Web con recetas de postres, tartas y todo tipo de dulces. Aprende repostería siguiendo mis consejos." />
                <link rel="canonical" href={pageURL}></link>
                <meta property="og:title" content={pageTitle}></meta>
                <meta property="og:description" content="Web con recetas de postres, tartas y todo tipo de dulces. Aprende repostería siguiendo mis consejos."></meta>
                <meta property="og:image" content="https://www.sweet-sugar.es/favicon.png"></meta>
                <meta property="og:type" content="website"></meta>
                <meta name="twitter:card" content="summary_large_image"></meta>
                <meta property="twitter:title" content={pageTitle}></meta>
                <meta property="twitter:description" content="Web con recetas de postres, tartas y todo tipo de dulces. Aprende repostería siguiendo mis consejos."></meta>
                <meta property="twitter:image" content="https://www.sweet-sugar.es/favicon.png"></meta>
                <link rel="icon" href="/favicon.png" />
            </Head>

            <Header />

            <main className="flex grow items-start justify-center px-4">
                <div className="my-12 w-full max-w-3xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-yellow-800/10 sm:my-16 sm:p-10">
                    <Detail id={post.id} title={post.title} date={post.date} image={post.image} contentHtml={post.contentHtml} />
                </div>
            </main>

            <Footer />

        </div>
    )
}

export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const post = await getPostData(params.id)
    return {
        props: {
            post
        }
    }
}