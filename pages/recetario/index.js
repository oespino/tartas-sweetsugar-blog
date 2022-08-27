import Head from 'next/head'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import RecipeBook from '../../components/RecipeBook'
import { getSortedPostsData } from '../../lib/posts'

export default function RecipePage({ posts }) {

    return (
        <div className='flex flex-col min-h-screen'>
            <Head>
                <title>Tartas Sweet Sugar - Recetario</title>
                <link rel="icon" href="/favicon.png" />
            </Head>

            <Header />
            <RecipeBook posts={posts} />
            <Footer />
        </div>
    )
}

export async function getStaticProps() {
    const posts = getSortedPostsData()
    const postObjectGroupByLetter = {}
    for (const post of posts) {
        const initialLetter = post.title[0].toUpperCase()
        if (!postObjectGroupByLetter[initialLetter]) postObjectGroupByLetter[initialLetter] = []
        postObjectGroupByLetter[initialLetter].push(post)
    }
    console.error({ postObjectGroupByLetter })
    return {
        props: {
            posts: postObjectGroupByLetter
        }
    }
}