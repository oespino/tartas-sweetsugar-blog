import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {

    const footerNavs = [
        {
            title: "HOME",
            location: '/'
        },
        {
            title: "CONTACTAR",
            location: '/contactar'
        }
    ]

    return (
        <footer className="bg-yellow-800 lg:h-20 py-4 text-white">
            <div className='max-w-screen-lg mx-auto'>
                <div className='lg:flex lg:flex-row mx-auto'>
                    {footerNavs.map(hn => (
                        <div className="p-4" key={hn.location}>
                            <Link href={hn.location}>{hn.title}</Link>
                        </div>
                    ))}
                    <div className='p-4 ml-auto'>¡SÍGUEME!</div>
                    <div className='px-4 flex justify-center'>
                        <a className='px-4' href="https://www.instagram.com/tartas_sweetsugar/">
                            <Image src="/instagram_logo.svg" className='fill-white' height={48} width={48} />
                        </a>
                        <a className='px-4' href="https://www.facebook.com/tartassweetsugar/">
                            <Image src="/facebook_logo.svg" className='fill-white' height={48} width={48} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}