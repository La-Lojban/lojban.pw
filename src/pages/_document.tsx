import Document, { Html, Head, Main, NextScript } from "next/document";

import { CMS_NAME } from "../config/config";
export default class MyDocument extends Document {
  static async getInitialProps(context: any) {
    const initialProps = await Document.getInitialProps(context);
    return { ...initialProps };
  }
  render() {
    return (
      <Html lang={this.props.dangerousAsPath.split("/")[1] ?? "en"}>
        <Head>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css"
            integrity="sha384-Xi8rHCmBmhbuyyhbI88391ZKP2dmfnOl4rT9ZfRI7mLTdk1wblIUnrIq35nqwEvC"
            crossOrigin="anonymous"
          />
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
