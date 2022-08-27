import Image from 'next/image'

export default function Detail({ id, title, date, category, image, contentHtml }) {

    return (
        <div>
            <h3 className="text-4xl font-bold pb-8">{title}</h3>
            <Image src={`/images/${image}`} height={300} width={900} layout="responsive" objectFit="cover"></Image>
            <div className="py-4" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>
    )
}