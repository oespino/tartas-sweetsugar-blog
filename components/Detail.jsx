import Image from 'next/image'

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
            <div className='flex items-start justify-between gap-4 pb-6'>
                <h1 className="text-3xl font-bold leading-tight sm:text-4xl">{title}</h1>
                <button
                    type="button"
                    aria-label="Compartir"
                    className="shrink-0 cursor-pointer rounded-full p-1 transition-opacity hover:opacity-70"
                    onClick={handleClick}
                >
                    <Image src={`/share_icon.svg`} height={40} width={40} alt='' />
                </button>
            </div>
            <Image
                src={`/images/${image}`}
                height={535}
                width={700}
                sizes="(min-width: 768px) 688px, 100vw"
                alt={title}
                preload
                className="rounded-xl"
                style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "auto"
                }}></Image>
            <div className="py-4" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>
    )
}
