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
// (none — redirect-only page)

// -----------------------------------------------------------------------------
// SCRIPT
// -----------------------------------------------------------------------------
function RootIndexRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/en/welcome");
  }, [router]);

  return null;
}

export default RootIndexRedirect;
