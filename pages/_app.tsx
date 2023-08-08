import 'bootstrap/dist/css/bootstrap.min.css'; // Está ordem importa, pois o bootstrap sobrescreve o tailwind

import '~/globals.scss';
import '~/tailwind.css';

import Provider from "~/store";

import type { AppProps } from 'next/app';

import { AuthProvider } from "~/contexts/auth-context";
import LayoutProvider from "~/contexts/layout-context";
// import fakeBackend from '~/helpers/AuthType/fakeBackend';

import { ToastContainer } from 'react-toastify';

import '~/aws';
import fakebackend from '~/helpers/AuthType/fakeBackend';

process.env.NODE_ENV !== 'production' && fakebackend();

function App({ Component, pageProps }: AppProps) {


    return (
        <Provider>
            <AuthProvider>
                <LayoutProvider>
                    <Component {...pageProps} />
                    <ToastContainer />
                </LayoutProvider>
            </AuthProvider>
        </Provider>
    )
}

export default App;