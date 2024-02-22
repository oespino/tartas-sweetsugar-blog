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
        <nav className="navbar navbar-expand-lg shadow-md py-8 bg-yellow-800 relative flex items-center w-full justify-between">
            <div className="px-6 lg:px-0 w-full flex flex-wrap items-center justify-between max-w-screen-lg mx-auto relative">
                <div className="flex items-center">
                    <button
                        className="border-0 py-3 lg:hidden leading-none text-xl bg-transparent text-white-600 hover:text-gray-700 focus:text-gray-700 transition-shadow duration-150 ease-in-out mr-6"
                        type="button"
                        onClick={() => setMenuVisible(!menuVisible)}
                    >
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            className="w-5"
                            role="img"
                            viewBox="0 0 448 512"
                        >
                            <path
                                fill="white"
                                d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
                            ></path>
                        </svg>
                    </button>
                </div>
                <div className="grow lg:pl-40">
                    <ul className={`mr-auto lg:flex lg:flex-row ${menuVisible ? '' : 'hidden'}`}>
                        {headerNavs.map(hn => (
                            <li className={router.pathname === hn.location ? "font-bold nav-item" : "nav-item"} key={hn.location}>
                                <Link href={hn.location} className="block pr-2 lg:px-6 py-2 text-white hover:text-yellow-100 focus:text-yellow-100">{hn.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='absolute top-0 right-10 lg:-top-2 lg:left-10 lg:right-auto'>
                    <Link href="/">
                        <Image src="/logo.png" height={120} width={100} />
                    </Link>
                </div>
            </div>
        </nav>
    )
}