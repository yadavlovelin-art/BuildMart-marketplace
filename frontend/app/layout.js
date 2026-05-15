import './globals.css'
import Providers from '../components/Providers'

export const metadata = {
  title: 'BuildMart - Construction Materials Supplier',
  description:
    'BuildMart supplies premium bricks, cement, sand, concrete, rodi, and construction materials across NCR and Haryana.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
