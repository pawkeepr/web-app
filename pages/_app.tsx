
import Provider from "~/store";

import type { AppProps } from 'next/app';

import 'bootstrap/dist/css/bootstrap.css';
import '~/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  )
}
