import { AppProps } from 'next/app'
import '../styles/index.css'
import NProgress from 'nprogress';
import Router from 'next/router';
import "../styles/nprogress.css";

import { closeXicon } from '../lib/buttons'
NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
});

if (process.env.NODE_ENV !== 'development') {
  Router.events.on('routeChangeStart', () => NProgress.start());
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
    closeXicon()
    window && window.dispatchEvent(new Event('popstate'));
  });
  Router.events.on('routeChangeError', () => NProgress.done());
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
