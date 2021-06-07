import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head/>
        <body className="bg-gray-100">
          <Main />
          <NextScript />
          {/* <script src="/assets/indices/stork.js"></script> */}
    
    {/* <script>
      stork.register(
        'federalist',
        '/assets/indices/federalist.st'
      )
    </script> */}
        </body>
      </Html>
    )
  }
}
