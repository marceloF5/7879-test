import Providers from '../components/Providers'
import '../styles/globals.css'

export default function RootLayout({ children }: {
    children: React.ReactNode,
}) {
    return (
        <html lang="en" className="bg-white">
            <body>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
}

