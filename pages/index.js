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
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Header />

      <main className="bg-yellow-100 text-yellow-800 bottom-28 top-28 flex-grow">
        <div className='my-10 flex flex-wrap justify-center'>
          <div className="flex flex-wrap justify-center max-w-screen-xl mx-4 px-6 lg:px-12 pt-8 pb-2">
            {veryLastPost ? <PreviewDetailed id={veryLastPost.id} title={veryLastPost.title} contentHtml={veryLastPost.contentHtml} image={veryLastPost.image} />
              : ''}
          </div>
        </div>
        <h2 className='text-2xl text-center mt-10'>Últimas recetas</h2>
        <div className='mb-10 flex flex-wrap justify-center'>
          <div className="flex flex-wrap justify-between max-w-screen-xl mx-4 px-6 lg:px-12 py-8">
            {lastPosts && lastPosts.length ? lastPosts.map(post => (
              <div key={post.id} className='m-2'>
                <PreviewSmall id={post.id} title={post.title} date={post.date} category={post.category} image={post.image} />
              </div>
            )) : ''}
          </div>
        </div>
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