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
            location: 'mailto:tartassweetsugar@gmail.com'
        }
    ]

    return (
        <footer className="bg-yellow-800 py-6 text-yellow-50">
            <div className='mx-auto flex max-w-screen-lg flex-col items-center gap-4 px-6 lg:flex-row lg:justify-between'>
                <ul className='flex gap-8 text-sm tracking-widest'>
                    {footerNavs.map(hn => (
                        <li key={hn.location}>
                            <Link className='transition-colors hover:text-white hover:underline underline-offset-4' href={hn.location}>{hn.title}</Link>
                        </li>
                    ))}
                </ul>
                <div className='flex items-center gap-6'>
                    <span className='text-sm tracking-widest'>¡SÍGUEME!</span>
                    <Link className='opacity-90 transition hover:opacity-100 motion-safe:hover:scale-110' href="https://www.instagram.com/tartas_sweetsugar/">
                        <Image alt='Instagram' src="/instagram_logo.svg" height={36} width={36} />
                    </Link>
                    <Link className='opacity-90 transition hover:opacity-100 motion-safe:hover:scale-110' href="https://www.facebook.com/tartassweetsugar/">
                        <Image alt='Facebook' src="/facebook_logo.svg" height={36} width={36} />
                    </Link>
                </div>
            </div>
        </footer>
    )
}
