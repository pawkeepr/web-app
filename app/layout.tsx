import 'react-responsive-modal/styles.css'
import '~/globals.scss'
import '~/tailwind.css'

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="pt-BR">
            <body>{children}</body>
        </html>
    )
}
