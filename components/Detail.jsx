import Image from 'next/image'
import Link from 'next/link'

export default function Detail({ id, title, date, category, image, contentHtml }) {

    function handleClick() {
        if (navigator.share) {
            navigator.share({
                title: `Tartas Sweet Sugar - ${title}`,
                url: window.location.href
            })
        }
    }

    return (
        <div>
            <div className='flex justify-between'>
                <h3 className="text-4xl font-bold pb-8">{title}</h3>
                <div className="text-right fill-cyan-700">
                    <Link href="#"><Image src={`/share_icon.svg`} height={50} width={50} alt='Share icon' onClick={() => handleClick()}></Image></Link>
                </div>
            </div>
            <Image
                src={`/images/${image}`}
                height={535}
                width={700}
                sizes="100vw"
                alt="Main image" 
                style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "auto"
                }}></Image>
            <div className="py-4" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>
    )
}