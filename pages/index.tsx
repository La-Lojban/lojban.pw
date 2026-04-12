/**
 * Root `/` for static export: HTTP redirects from next.config are not applied to `out/`.
 * Immediate navigation via meta refresh avoids client-side router JS on this route.
 */
import Head from "next/head";

export default function RootIndex() {
  return (
    <>
      <Head>
        <meta httpEquiv="refresh" content="0;url=/en/welcome/" />
      </Head>
      <p className="sr-only">
        <a href="/en/welcome/">Continue to the site</a>
      </p>
    </>
  );
}
