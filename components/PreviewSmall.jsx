import Image from 'next/image'
import Link from 'next/link'

export default function PreviewSmall({ id, title, date, category, image }) {

    return (
        <article className="h-full">
            <Link
                href={`/post/${id}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-yellow-800/10 transition duration-300 hover:shadow-xl hover:shadow-yellow-800/15 motion-safe:hover:-translate-y-1"
            >
                <div className="aspect-4/3 overflow-hidden">
                    <Image
                        alt={title}
                        src={`/images/${image}`}
                        height={256}
                        width={320}
                        sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 100vw"
                        className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
                    />
                </div>
                <h3 className="grow p-4 text-lg font-bold leading-snug">{title}</h3>
            </Link>
        </article>
    )
}
