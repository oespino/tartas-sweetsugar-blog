import { Analytics } from '@vercel/analytics/react';
import { Fraunces, Nunito } from 'next/font/google'
import '../styles.css'

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces' })
const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito' })

export default function MyApp({ Component, pageProps }) {
  return (
    <div className={`${fraunces.variable} ${nunito.variable} font-sans`}>
      <Component {...pageProps} />
      <Analytics />
    </div>
  )
}
