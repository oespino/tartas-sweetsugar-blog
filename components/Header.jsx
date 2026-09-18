import { useRouter } from 'next/router';
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react';

export default function Header() {
    const router = useRouter()
    const [menuVisible, setMenuVisible] = useState(false)

    const headerNavs = [
        {
            title: "HOME",
            location: '/'
        },
        {
            title: "RECETARIO",
            location: '/recetario'
        },
        {
            title: "SOBRE MÍ",
            location: '/sobre-mi'
        }
    ]

    return (
        <nav className="relative w-full bg-yellow-800 py-8 shadow-lg shadow-yellow-900/20 text-yellow-50">
            <div className="relative mx-auto flex w-full max-w-screen-lg flex-wrap items-center justify-between px-6 lg:px-0">
                <div className="flex items-center">
                    <button
                        className="mr-6 cursor-pointer py-3 leading-none lg:hidden"
                        type="button"
                        aria-label={menuVisible ? 'Cerrar menú' : 'Abrir menú'}
                        aria-expanded={menuVisible}
                        aria-controls="main-menu"
                        onClick={() => setMenuVisible(!menuVisible)}
                    >
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            className="w-6"
                            role="img"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                        >
                            <path d={menuVisible ? 'M6 6l12 12M18 6L6 18' : 'M3 6h18M3 12h18M3 18h18'} />
                        </svg>
                    </button>
                </div>
                <div className="grow lg:pl-40">
                    <ul
                        id="main-menu"
                        className={`absolute inset-x-0 top-full z-20 mt-8 border-t border-yellow-100/15 bg-yellow-800 py-2 shadow-xl shadow-yellow-900/30 lg:static lg:z-auto lg:mt-0 lg:flex lg:flex-row lg:gap-2 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none ${menuVisible ? 'block' : 'hidden'}`}
                    >
                        {headerNavs.map(hn => {
                            const active = router.pathname === hn.location
                            return (
                                <li key={hn.location}>
                                    <Link
                                        href={hn.location}
                                        aria-current={active ? 'page' : undefined}
                                        onClick={() => setMenuVisible(false)}
                                        className={`block border-l-4 px-6 py-3.5 tracking-widest transition-colors lg:mx-4 lg:border-b-2 lg:border-l-0 lg:px-0 lg:py-2 lg:text-sm ${active
                                            ? 'border-yellow-100 bg-yellow-100/10 font-bold text-white lg:bg-transparent'
                                            : 'border-transparent hover:border-yellow-100/60 hover:bg-yellow-100/10 hover:text-white lg:hover:bg-transparent'}`}
                                    >
                                        {hn.title}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className='absolute top-0 right-10 z-30 lg:-top-2 lg:left-10 lg:right-auto'>
                    <Link href="/">
                        <Image alt="Tartas Sweet Sugar" src="/logo.png" height={120} width={100} className="drop-shadow-md" />
                    </Link>
                </div>
            </div>
        </nav>
    )
}
