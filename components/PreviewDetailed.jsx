import Image from "next/image"
import Link from 'next/link'

export default function PreviewDetailed({ id, title, date, category, image, contentHtml }) {

    return (
        <article className='relative max-h-128 overflow-y-hidden mx-2'>
            <div className='flex justify-between'>
                <Link href={`/post/${id}`}>
                    <h3 className="text-4xl font-bold pb-8">{title}</h3>
                </Link>
            </div>
            <Link href={`/post/${id}`}>
                <Image
                    alt="Main image"
                    src={`/images/${image}`}
                    height={150}
                    width={700}
                    className='max-h-60'
                    sizes="100vw"
                    style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "auto"
                    }}></Image>
            </Link>
            <div className="py-4" dangerouslySetInnerHTML={{ __html: contentHtml }} />
            <div className='absolute flex w-full items-end justify-end left-0 bottom-0 m-0 h-20 bg-gradient-to-t from-yellow-100'>
                <div className='h-min'>
                    <Link className='font-bold hover:opacity-80 focus:opacity-80' href={`/post/${id}`}>
                        Leer más...
                    </Link>
                </div>
            </div>
        </article >
    );

}