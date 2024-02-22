import Image from 'next/image'
import Link from 'next/link'

export default function PreviewSmall({ id, title, date, category, image }) {

    return (
        <article>
            <Link href={`/post/${id}`}>
                <div className="w-80 h-64">
                    <Image src={`/images/${image}`} height={256} width={320} style={{ objectFit: "cover" }} className="w-80 h-64"></Image>
                </div>
                <div className="w-80 p-4 font-bold bg-white">
                    <h3 className="text-l">{title}</h3>
                </div>
            </Link>
        </article>
    )
}