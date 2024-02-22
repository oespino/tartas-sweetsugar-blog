import Image from 'next/image'

export default function PreviewDetailed({ id, title, date, category, image, contentHtml }) {

    return (
        <article className='relative max-h-128 overflow-y-hidden mx-2'>
            <div className='flex justify-between'>
                <a href={`/post/${id}`}>
                    <h3 className="text-4xl font-bold pb-8">{title}</h3>
                </a>
            </div>
            <a href={`/post/${id}`}>
                <Image src={`/images/${image}`} height={150} width={700} layout="responsive" objectFit="cover"></Image>
            </a>
            <div className="py-4" dangerouslySetInnerHTML={{ __html: contentHtml }} />
            <div className='absolute flex w-full items-end justify-end left-0 bottom-0 m-0 h-20 bg-gradient-to-t from-yellow-100'>
                <div className='h-min'>
                    <a className='font-bold hover:opacity-80 focus:opacity-80' href={`/post/${id}`}>
                        Leer más...
                    </a>
                </div>
            </div>
        </article >
    )

}