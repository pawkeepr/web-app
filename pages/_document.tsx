import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="pt-br">
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
