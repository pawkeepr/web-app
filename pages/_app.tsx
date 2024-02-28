import '~/globals.scss'
import '~/tailwind.css'

import Provider from '~/store'

import type { AppProps } from 'next/app'

import { AuthProvider } from '~/contexts/auth-context'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '~/aws'

import { appWithTranslation } from 'next-i18next'
import ErrorBoundary from '~/contexts/error-boundary'

import VLibras from '@djpfs/react-vlibras'
import { useEffect } from 'react'
import { geolocation } from '~/utils/geolocation'

function App({ Component, pageProps }: AppProps) {
    useEffect(() => {
        geolocation()
    }, [])

    return (
        <ErrorBoundary>
            <VLibras forceOnload={true} />
            <Provider>
                <AuthProvider>
                    <ToastContainer
                        limit={1}
                        theme="colored"
                        className="!w-full p-4 bg-dark bg-opacity-50 !h-screen  flex flex-1 items-center justify-center absolute top-0"
                    />
                    <Component {...pageProps} />
                </AuthProvider>
            </Provider>
        </ErrorBoundary>
    )
}

export default appWithTranslation(App)
