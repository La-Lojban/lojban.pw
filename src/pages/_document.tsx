import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  static async getInitialProps(context: any) {
    const initialProps = await Document.getInitialProps(context);
    return { ...initialProps };
  }
  render() {
    return (
      <Html lang={this.props.dangerousAsPath.split("/")[1] ?? "en"}>
        <Head>
          {/* Preload critical fonts */}
          <link
            rel="preload"
            href="/assets/fonts/LinLibertine_R.otf"
            as="font"
            type="font/otf"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/assets/fonts/LinLibertine_RB.otf"
            as="font"
            type="font/otf"
            crossOrigin="anonymous"
          />
          {/* DNS prefetch for external resources */}
          <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
          <link rel="dns-prefetch" href="https://jbotcan.org" />
          {/* Preconnect to critical third-party resources */}
          <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css"
            integrity="sha384-Xi8rHCmBmhbuyyhbI88391ZKP2dmfnOl4rT9ZfRI7mLTdk1wblIUnrIq35nqwEvC"
            crossOrigin="anonymous"
          />
          <link rel="manifest" href="/manifest.json" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
          <meta name="theme-color" content="#000000" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="format-detection" content="telephone=no" />
          {/* <Script src="/assets/js/redirector.js" strategy="beforeInteractive" /> */}
        </Head>
        <body className="bg-gray-100 print:bg-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
