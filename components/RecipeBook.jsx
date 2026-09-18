import Link from "next/link"

export default function RecipeBook({ posts }) {

    const entries = Object.keys(posts).sort((a, b) => {
        if (a < b) return -1
        return 1
    })

    return (
        <main className="flex grow items-start justify-center px-4">
            <div className="my-12 w-full max-w-screen-lg rounded-2xl bg-white p-6 shadow-sm ring-1 ring-yellow-800/10 sm:my-16 sm:p-10 lg:px-12">
                <h1 className="text-4xl font-bold">Recetario</h1>
                <div className="mt-3 mb-8 h-1 w-16 rounded-full bg-yellow-800/30"></div>
                <div className="gap-x-12 sm:columns-2 lg:columns-3">
                    {entries && entries.length ? entries.map(letter => (
                        <section key={letter} className='mb-8 break-inside-avoid'>
                            <h2 className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-yellow-800 text-xl font-bold text-yellow-100">{letter}</h2>
                            <ul className="space-y-2 border-l-2 border-yellow-800/20 pl-4">
                                {posts[letter] && posts[letter].length ? posts[letter].map(post => (
                                    <li key={post.id} className="leading-snug">
                                        <Link className="font-semibold underline-offset-4 transition-colors hover:underline" href={`/post/${post.id}`}>{post.title}</Link>
                                    </li>
                                )) : ''}
                            </ul>
                        </section>
                    )) : ''}
                </div>
            </div>
        </main>
    )
}
