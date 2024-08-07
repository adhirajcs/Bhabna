import '@styles/globals.css'

import Nav from '@components/Nav'
import Provider from '@components/Provider'

export const metadata = {
    title: 'Bhabna',
    description: 'Discover and share Ideas',
    }

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
        <head>
        <link rel="icon" type="image/svg+xml" href="/assets/images/bhabna_logo.png" />
        </head>
        <body>
            <div className="main">
                <div className="gradient" />
            </div>

            <main className="app">
                <Nav />
                {children}
            </main>
        </body>

    </html>
  )
}

export default RootLayout