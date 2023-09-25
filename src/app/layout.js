import { Providers } from '@/lib/queryClient'
import './globals.css'
import { Rubik } from 'next/font/google'
import { Provider } from '@/context/LocationContext'

const rubik = Rubik({ subsets: ['latin'] })

export const metadata = {
  title: 'Ip Address Tracker',
  description: 'A simple ip address tracker built with Next.js and Tailwind CSS',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <Providers>
          <Provider>
            {children}
          </Provider>
        </Providers>
      </body>
    </html>
  )
}
