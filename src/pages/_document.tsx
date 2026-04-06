/**
 * SFC-style layout (dependency order: styles → markup → script):
 *   STYLES — Tailwind fragments
 *   MARKUP — presentational pieces
 *   SCRIPT — data + composition
 */
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  type DocumentContext,
} from "next/document";

// -----------------------------------------------------------------------------
// STYLES
// -----------------------------------------------------------------------------
// (Katex CDN + manifest links in Head; body uses className)

// -----------------------------------------------------------------------------
// MARKUP
// -----------------------------------------------------------------------------
type DocProps = {
  lang: string;
};

// -----------------------------------------------------------------------------
// SCRIPT
// -----------------------------------------------------------------------------
export default class MyDocument extends Document<DocProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const path = ctx.asPath ?? ctx.pathname ?? "";
    const seg = path.split("/").filter(Boolean)[0];
    const lang =
      seg && /^[a-z]{2}(-[a-z0-9]+)?$/i.test(seg) ? seg : "en";
    return { ...initialProps, lang };
  }

  render() {
    const lang = this.props.lang ?? "en";
    return (
      <Html lang={lang}>
        <Head>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css"
            integrity="sha384-Xi8rHCmBmhbuyyhbI88391ZKP2dmfnOl4rT9ZfRI7mLTdk1wblIUnrIq35nqwEvC"
            crossOrigin="anonymous"
          />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#000000" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
        </Head>
        <body className="bg-gray-100 print:bg-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
