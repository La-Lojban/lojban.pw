/**
 * SFC-style layout (dependency order: styles → markup → script):
 *   STYLES — Tailwind fragments
 *   MARKUP — presentational pieces
 *   SCRIPT — data + composition
 */
import Avatar from "./avatar";
import { PdfDocumentIcon } from "./pdf-document-icon";
import DateFormatter from "./date-formatter";
import PostTitle from "./post-title";
import { TPost } from "../types/post";

// -----------------------------------------------------------------------------
// STYLES
// -----------------------------------------------------------------------------
const tw = {
  headerRow: "flex items-center",
  pdfLink:
    "mr-2 hover:from-lime-200 hover:to-lime-200 ease bg-gradient-to-br from-lime-50 to-white-900 h-10 inline-flex items-center py-1 px-3 border border-lime-500 hover:border-lime-600 rounded-l-md shadow-md print:hidden",
  pdfIcon: "w-6 h-8",
  avatarDesktop: "hidden md:block md:mb-12",
  metaBlock: "mx-auto",
  avatarMobile: "block md:hidden mb-6",
  dateWrap: "mb-6 text-lg",
} as const;

// -----------------------------------------------------------------------------
// MARKUP
// -----------------------------------------------------------------------------
function PdfDownloadLink({
  href,
}: {
  href: string;
}) {
  return (
    <a
      key="bangu-pdf"
      href={href}
      className={tw.pdfLink}
    >
      <PdfDocumentIcon className={tw.pdfIcon} />
    </a>
  );
}

function PostHeaderTopRow({
  showPdf,
  pdfHref,
  title,
}: {
  showPdf: boolean;
  pdfHref: string;
  title?: string;
}) {
  return (
    <div className={tw.headerRow}>
      {showPdf ? <PdfDownloadLink href={pdfHref} /> : null}
      {title ? <PostTitle>{title}</PostTitle> : null}
    </div>
  );
}

// -----------------------------------------------------------------------------
// SCRIPT
// -----------------------------------------------------------------------------
type Props = {
  post: TPost;
  siteSection?: string;
};

function PostHeader({ post, siteSection }: Props) {
  const { author, title, date } = post;
  const hasPdf = post && post.slug[1] === siteSection;
  const pdfHref = `/vreji/uencu/${post.slug[0]}/${post.slug[2]}.pdf`;

  return (
    <>
      <PostHeaderTopRow
        showPdf={!!hasPdf}
        pdfHref={pdfHref}
        title={title}
      />
      {author?.name ? (
        <div className={tw.avatarDesktop}>
          <Avatar
            name={author.name}
            picture={author.picture ?? ""}
          />
        </div>
      ) : null}
      {author || date ? (
        <div className={tw.metaBlock}>
          {author?.name ? (
            <div className={tw.avatarMobile}>
              <Avatar
                name={author.name}
                picture={author.picture ?? ""}
              />
            </div>
          ) : null}
          {date ? (
            <div className={tw.dateWrap}>
              <DateFormatter dateString={date} />
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
}

export default PostHeader;
