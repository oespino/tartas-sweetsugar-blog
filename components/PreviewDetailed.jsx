import Image from "next/image"
import Link from 'next/link'

export default function PreviewDetailed({ id, title, date, category, image, contentHtml }) {

    return (
        <article className='relative max-h-128 overflow-hidden'>
            <Link href={`/post/${id}`} className="group block">
                <h3 className="pb-6 text-3xl font-bold leading-tight sm:text-4xl">{title}</h3>
                <div className="overflow-hidden rounded-2xl shadow-md shadow-yellow-800/20">
                    <Image
                        alt={title}
                        src={`/images/${image}`}
                        height={150}
                        width={700}
                        className='max-h-60 transition-transform duration-500 motion-safe:group-hover:scale-105'
                        sizes="(min-width: 768px) 768px, 100vw"
                        style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "auto"
                        }}></Image>
                </div>
            </Link>
            <div className="py-4" dangerouslySetInnerHTML={{ __html: contentHtml }} />
            <div className='absolute bottom-0 left-0 flex h-24 w-full items-end justify-end bg-linear-to-t from-yellow-100 from-30%'>
                <Link className='font-bold underline decoration-2 underline-offset-4 hover:opacity-80 focus:opacity-80' href={`/post/${id}`}>
                    Leer más →
                </Link>
            </div>
        </article >
    );

}
