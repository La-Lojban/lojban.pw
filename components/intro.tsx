/**
 * SFC-style layout (dependency order: styles → markup → script):
 *   STYLES — Tailwind fragments
 *   MARKUP — presentational pieces
 *   SCRIPT — data + composition
 */
import { CMS_NAME } from "../config/config";

// -----------------------------------------------------------------------------
// STYLES
// -----------------------------------------------------------------------------
const tw = {
  section:
    "flex-col md:flex-row flex items-center md:justify-between mb-6",
  heading:
    "text-center text-6xl md:text-6xl font-bold tracking-tighter leading-tight md:pr-8 flex flex-wrap items-center",
  image: "h-32 mr-2",
} as const;

// -----------------------------------------------------------------------------
// MARKUP
// -----------------------------------------------------------------------------
function IntroHeading({
  title,
  image,
}: {
  title: string;
  image?: string;
}) {
  return (
    <h1 className={tw.heading}>
      {image ? <img src={image} className={tw.image} alt="" /> : null}
      <span>{title}</span>
    </h1>
  );
}

// -----------------------------------------------------------------------------
// SCRIPT
// -----------------------------------------------------------------------------
type Props = {
  title?: string;
  image?: string;
};

function Intro({ title = CMS_NAME, image }: Props) {
  return (
    <section className={tw.section}>
      <IntroHeading title={title} image={image} />
    </section>
  );
}

export default Intro;
