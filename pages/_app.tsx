import 'react-responsive-modal/styles.css'
import '~/globals.scss'
import '~/tailwind.css'

import Provider from '~/store'

import type { AppProps } from 'next/app'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { appWithTranslation } from 'next-i18next'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '~/Components/organism/drawer/react-modern-drawer.css'
import '~/aws'
import { AuthProvider } from '~/contexts/auth-context'
import ErrorBoundary from '~/contexts/error-boundary'
import pg from '../package.json'
import '../styles/react-datepicker.css'
function App({ Component, pageProps }: AppProps) {
    return (
        <ErrorBoundary>
            <SpeedInsights />
            <Analytics />
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <Provider>
                <AuthProvider>
                    <ToastContainer
                        limit={1}
                        theme="colored"
                        className="!w-full p-4 bg-dark bg-opacity-50 !h-screen flex flex-1 items-center justify-center absolute top-0"
                    />
                    <Component {...pageProps} />
                </AuthProvider>
                <div className="fixed z-50 text-base text-center text-gray-500 bottom-1 right-1">
                    <p>{`v${pg.version} - `}</p>
                </div>
            </Provider>
        </ErrorBoundary>
    )
}

export default appWithTranslation(App)
