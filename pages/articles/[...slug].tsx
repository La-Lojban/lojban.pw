/**
 * SFC-style layout (dependency order: styles → markup → script):
 *   STYLES — Tailwind fragments
 *   MARKUP — presentational pieces
 *   SCRIPT — data + composition
 */
import { useEffect } from "react";
import { useRouter } from "next/router";

// -----------------------------------------------------------------------------
// STYLES
// -----------------------------------------------------------------------------
// (none)

// -----------------------------------------------------------------------------
// MARKUP
// -----------------------------------------------------------------------------
// (none)

// -----------------------------------------------------------------------------
// SCRIPT
// -----------------------------------------------------------------------------
function ArticlesLangPrefixRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/en" + router.asPath);
  }, [router]);

  return null;
}

export default ArticlesLangPrefixRedirect;
