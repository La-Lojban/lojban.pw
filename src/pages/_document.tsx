import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.5.1/socket.io.js"></script>
        </Head>
        <body className="bg-gray-100">
          <Main />
          <NextScript />
          <script src="/assets/js/chat.js"></script>
          {/* <script src="/assets/indices/stork.js"></script> */}

          {/* <script>
      stork.register(
        'federalist',
        '/assets/indices/federalist.st'
      )
    </script> */}
          {/* <script>
      
    </script> */}
        </body>
      </Html>
    );
  }
}
