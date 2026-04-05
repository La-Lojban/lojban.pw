/**
 * SFC-style layout (dependency order: styles → markup → script):
 *   STYLES — Tailwind fragments
 *   MARKUP — presentational pieces
 *   SCRIPT — data + composition
 */
import { type ReactNode } from "react";

// -----------------------------------------------------------------------------
// STYLES
// -----------------------------------------------------------------------------
const tw = {
  title:
    "text-6xl md:text-6xl lg:text-6xl font-bold tracking-tighter leading-tight md:leading-none text-center md:text-left",
} as const;

// -----------------------------------------------------------------------------
// MARKUP
// -----------------------------------------------------------------------------
function TitleHeading({ children }: { children?: ReactNode }) {
  return <h1 className={tw.title}>{children}</h1>;
}

// -----------------------------------------------------------------------------
// SCRIPT
// -----------------------------------------------------------------------------
type Props = {
  children?: ReactNode;
};

function PostTitle({ children }: Props) {
  return <TitleHeading>{children}</TitleHeading>;
}

export default PostTitle;
