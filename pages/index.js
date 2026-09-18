import Head from 'next/head'
import Footer from '../components/Footer'
import Header from '../components/Header'
import PreviewDetailed from '../components/PreviewDetailed'
import PreviewSmall from '../components/PreviewSmall'
import { getLastPostsData, getPostData } from '../lib/posts'

export default function Home({ veryLastPost, lastPosts }) {

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>Tartas Sweet Sugar</title>
        <meta name="description" content="Web con recetas de postres, tartas y todo tipo de dulces. Aprende repostería siguiendo mis consejos." />
        <link rel="canonical" href="https://www.sweet-sugar.es/"></link>
        <meta property="og:title" content="Tartas Sweet Sugar"></meta>
        <meta property="og:description" content="Web con recetas de postres, tartas y todo tipo de dulces. Aprende repostería siguiendo mis consejos."></meta>
        <meta property="og:image" content="https://www.sweet-sugar.es/favicon.png"></meta>
        <meta property="og:type" content="website"></meta>
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta property="twitter:title" content="Tartas Sweet Sugar"></meta>
        <meta property="twitter:description" content="Web con recetas de postres, tartas y todo tipo de dulces. Aprende repostería siguiendo mis consejos."></meta>
        <meta property="twitter:image" content="https://www.sweet-sugar.es/favicon.png"></meta>
        <link rel="icon" href="/favicon.png" />
        <meta name="google-site-verification" content="r7uW_bdPUGlX8OrYugYNmMFRrW6DAZW1XVNSwERpvCI" />
      </Head>

      <Header />

      <main className="grow pb-16">
        <section className="mx-auto w-full max-w-3xl px-4 pt-16 sm:pt-20">
          {veryLastPost ? <PreviewDetailed id={veryLastPost.id} title={veryLastPost.title} contentHtml={veryLastPost.contentHtml} image={veryLastPost.image} />
            : ''}
        </section>
        <section className="mx-auto w-full max-w-screen-lg px-4 pt-14">
          <h2 className='text-center text-3xl font-bold'>Últimas recetas</h2>
          <div className="mx-auto mt-3 mb-10 h-1 w-16 rounded-full bg-yellow-800/30"></div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {lastPosts && lastPosts.length ? lastPosts.map(post => (
              <PreviewSmall key={post.id} id={post.id} title={post.title} date={post.date} category={post.category} image={post.image} />
            )) : ''}
          </div>
        </section>
      </main>

      <Footer />


    </div>
  )
}

export async function getStaticProps() {
  const posts = await getLastPostsData()
  const lastPosts = posts.slice(1, 7)
  const veryLastPostId = posts[0].id
  const veryLastPost = await getPostData(veryLastPostId)
  return {
    props: {
      veryLastPost,
      lastPosts
    }
  }
}