/**
 * SFC-style layout (dependency order: styles → markup → script):
 *   STYLES — Tailwind fragments
 *   MARKUP — presentational pieces
 *   SCRIPT — data + composition
 */

// -----------------------------------------------------------------------------
// STYLES
// -----------------------------------------------------------------------------
const tw = {
  root: "text-center",
  img: "w-12 h-12 rounded-full mr-4",
  name: "italic break-all",
} as const;

// -----------------------------------------------------------------------------
// MARKUP
// -----------------------------------------------------------------------------
function AvatarPicture({ src, alt }: { src: string; alt: string }) {
  return <img src={src} className={tw.img} alt={alt} />;
}

// -----------------------------------------------------------------------------
// SCRIPT
// -----------------------------------------------------------------------------
type Props = {
  name: string;
  picture: string;
  /** Matches post title link stroke on preview cards (see post-preview). */
  nameClassName?: string;
};

function Avatar({ name, picture, nameClassName }: Props) {
  return (
    <div className={tw.root}>
      {picture ? <AvatarPicture src={picture} alt={name} /> : null}
      <div className={nameClassName ? `${tw.name} ${nameClassName}` : tw.name}>
        {name}
      </div>
    </div>
  );
}

export default Avatar;
