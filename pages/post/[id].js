import Head from 'next/head'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Detail from '../../components/Detail'
import PreviewSmall from '../../components/PreviewSmall'
import { getAllPostIds, getPostData, getRecipeData, getRelatedPosts } from '../../lib/posts'

export default function PostDetail({ post, recipe, related }) {

    const pageTitle = `${post.title} | Tartas Sweet Sugar`
    const pageURL = `https://www.sweet-sugar.es/post/${post.id}`
    const imageURL = `https://www.sweet-sugar.es/images/${post.image}`

    // schema.org structured data: Recipe (rich results in Google) for posts that have ingredients and
    // steps, BlogPosting for the rest (diary-style posts).
    const toSteps = steps => steps.map(text => ({ '@type': 'HowToStep', text }))
    const common = {
        '@context': 'https://schema.org',
        description: post.description,
        image: [imageURL],
        datePublished: post.date,
        inLanguage: 'es',
        url: pageURL,
        author: { '@type': 'Person', name: 'María', url: 'https://www.sweet-sugar.es/sobre-mi' }
    }
    const jsonLd = recipe
        ? {
            ...common,
            '@type': 'Recipe',
            name: post.title,
            ...(recipe.yield && { recipeYield: recipe.yield }),
            recipeIngredient: recipe.ingredients,
            recipeInstructions: recipe.steps.flatMap(group => group.name
                ? [{ '@type': 'HowToSection', name: group.name, itemListElement: toSteps(group.steps) }]
                : toSteps(group.steps))
        }
        : {
            ...common,
            '@type': 'BlogPosting',
            headline: post.title,
            mainEntityOfPage: pageURL,
            publisher: { '@type': 'Organization', name: 'Tartas Sweet Sugar', url: 'https://www.sweet-sugar.es' }
        }

    return (
        <div className='flex flex-col min-h-screen'>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={post.description} />
                <link rel="canonical" href={pageURL}></link>
                <meta property="og:title" content={pageTitle}></meta>
                <meta property="og:description" content={post.description}></meta>
                <meta property="og:image" content={imageURL}></meta>
                <meta property="og:type" content="website"></meta>
                <meta name="twitter:card" content="summary_large_image"></meta>
                <meta property="twitter:title" content={pageTitle}></meta>
                <meta property="twitter:description" content={post.description}></meta>
                <meta property="twitter:image" content={imageURL}></meta>
                <script
                    key="jsonld"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
                />
                <link rel="icon" href="/favicon.png" />
            </Head>

            <Header />

            <main className="grow px-4">
                <div className="mx-auto my-12 w-full max-w-3xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-yellow-800/10 sm:my-16 sm:p-10">
                    <Detail id={post.id} title={post.title} date={post.date} image={post.image} contentHtml={post.contentHtml} />
                </div>

                {related.length > 0 && (
                    <section className="mx-auto mb-16 w-full max-w-screen-lg">
                        <h2 className="text-center text-3xl font-bold">Más recetas que te pueden gustar</h2>
                        <div className="mx-auto mt-3 mb-10 h-1 w-16 rounded-full bg-yellow-800/30"></div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {related.map(relatedPost => (
                                <PreviewSmall key={relatedPost.id} id={relatedPost.id} title={relatedPost.title} image={relatedPost.image} />
                            ))}
                        </div>
                    </section>
                )}
            </main>

            <Footer />

        </div>
    )
}

export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
        paths,
        // En desarrollo, el servidor cachea la lista de rutas y devuelve 404 la primera vez que se
        // abre una receta creada con el servidor ya arrancado. En producción todas las rutas se
        // generan en el build, así que se mantiene fallback: false.
        fallback: process.env.NODE_ENV === 'development' ? 'blocking' : false
    }
}

export async function getStaticProps({ params }) {
    let post
    try {
        post = await getPostData(params.id)
    } catch (error) {
        if (error.code === 'ENOENT') return { notFound: true }
        throw error
    }
    return {
        props: {
            post,
            recipe: getRecipeData(params.id),
            related: getRelatedPosts(params.id)
        }
    }
}