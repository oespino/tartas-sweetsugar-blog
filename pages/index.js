import Head from 'next/head'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Preview from '../components/Preview'
import { getLastPostsData } from '../lib/posts'

export default function Home({ posts }) {

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>Tartas Sweet Sugar</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Header />

      <main className="bg-yellow-100 text-yellow-800 bottom-28 top-28 flex-grow">
        <h2 className='text-2xl text-center mt-10'>Últimas recetas</h2>
        <div className='mb-10 flex flex-wrap justify-center'>
          {posts && posts.length ? posts.map(post => (
            <div key={post.id} className='m-4'>
              <Preview id={post.id} title={post.title} date={post.date} category={post.category} image={post.image} />
            </div>
          )) : ''}
        </div>
      </main>

      <Footer />


    </div>
  )
}

export async function getStaticProps() {
  const posts = getLastPostsData()
  return {
    props: {
      posts
    }
  }
}