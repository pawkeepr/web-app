import '~/globals.scss';
import '~/tailwind.css';

import Provider from '~/store';

import type { AppProps } from 'next/app';

import { AuthProvider } from '~/contexts/auth-context';
import LayoutProvider from '~/contexts/layout-context';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '~/aws';

import ErrorBoundary from '~/contexts/error-boundary';

import VLibras from '@djpfs/react-vlibras';

function App({ Component, pageProps }: AppProps) {
    return (
        <ErrorBoundary>
            <VLibras forceOnload={true} />
            <Provider>
                <AuthProvider>
                    <LayoutProvider>
                        <ToastContainer
                            theme="colored"
                            className="!w-full p-4 bg-dark bg-opacity-50 !h-screen  flex flex-1 items-center justify-center absolute top-0"
                        />
                        <Component {...pageProps} />
                    </LayoutProvider>
                </AuthProvider>
            </Provider>
        </ErrorBoundary>
    );
}

export default App;
