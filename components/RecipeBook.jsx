export default function RecipeBook({ posts }) {

    const entries = Object.keys(posts).sort((a, b) => {
        if (a < b) return -1
        return 1
    })

    return (
        <main className="bg-yellow-100 text-yellow-800 bottom-28 top-28 flex-grow flex justify-center">
            <div className="bg-white lg:w-full max-w-screen-lg mx-4 px-6 lg:px-12 py-8 my-16">
                <div className="text-4xl py-2 font-bold">
                    <h1>Recetario</h1>
                    <div>
                        {entries && entries.length ? entries.map(letter => (
                            <div key={letter} className='m-4 '>
                                <h2 className="text-2xl">{letter}</h2>
                                <ul className="list-disc list-inside">
                                    {posts[letter] && posts[letter].length ? posts[letter].map(post => (
                                        <li key={post.id} className="text-sm"><a href={`/post/${post.id}`}>{post.title}</a></li>
                                    )) : ''}
                                </ul>
                            </div>
                        )) : ''}
                    </div>
                </div>
            </div>
        </main>
    )
}