
import Provider from "~/store";

import type { AppProps } from 'next/app';

import { AuthProvider } from "~/contexts/auth-context";
import LayoutProvider from "~/contexts/layout-context";

import 'bootstrap/dist/css/bootstrap.min.css';
import '~/globals.scss';

export default function App({ Component, pageProps }: AppProps) {


  return (
    <Provider>
      <AuthProvider>
        <LayoutProvider>

          <Component {...pageProps} />

        </LayoutProvider>
      </AuthProvider>
    </Provider>
  )
}