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
import { htmlLangFromPath } from "../lib/seo";

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
    const lang = htmlLangFromPath(path);
    return { ...initialProps, lang };
  }

  render() {
    const lang = this.props.lang ?? "en";
    return (
      <Html lang={lang}>
        <Head>
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
