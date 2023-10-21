
import '~/globals.scss';
import '~/tailwind.css';

import Provider from "~/store";

import type { AppProps } from 'next/app';

import { AuthProvider } from "~/contexts/auth-context";
import LayoutProvider from "~/contexts/layout-context";

import { ToastContainer } from 'react-toastify';
import '~/aws';
import ErrorBoundary from '~/contexts/error-boundary';
import fakebackend from '~/helpers/AuthType/fakeBackend';


import VLibras from '@djpfs/react-vlibras';

const isProd = process.env.NODE_ENV === 'production';

isProd && fakebackend();

function App({ Component, pageProps }: AppProps) {


    return (
        <ErrorBoundary>
            <VLibras forceOnload={true} />
            <Provider>
                <AuthProvider>
                    <LayoutProvider>
                        <Component {...pageProps} />
                        <ToastContainer />
                    </LayoutProvider>
                </AuthProvider>
            </Provider>
        </ErrorBoundary>
    )
}

export default App;