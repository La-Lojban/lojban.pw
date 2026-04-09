/**
 * After Chromium prints a book PDF, stamp footer page numbers so counting starts
 * on the first page *after* the cover (Chromium's footer always numbers from 1 on the cover).
 */
const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");

/** mm → PDF points (1 pt = 1/72 in; 25.4 mm = 1 in). */
function mm(n) {
  return (n * 72) / 25.4;
}

/**
 * Book index URLs look like /{lang}/books/{bookId} (one segment after books → cover page).
 * Chapter URLs would be /{lang}/books/{bookId}/{n} → no generated cover in that PDF.
 */
function coverPageCountForBookUrl(url) {
  try {
    const pathname = new URL(url).pathname.replace(/\/$/, "");
    const i = pathname.indexOf("/books/");
    if (i === -1) return 0;
    const rest = pathname.slice(i + "/books/".length);
    if (!rest) return 0;
    return rest.includes("/") ? 0 : 1;
  } catch {
    return 1;
  }
}

/**
 * @param {Buffer} pdfBuffer
 * @param {{ coverPageCount?: number }} [options] — default 1 (first page is cover, unnumbered)
 * @returns {Promise<Buffer>}
 */
async function stampBookPageNumbers(pdfBuffer, options = {}) {
  const coverPageCount = options.coverPageCount ?? 1;
  if (coverPageCount < 0) {
    throw new Error("coverPageCount must be >= 0");
  }

  const pdfDoc = await PDFDocument.load(pdfBuffer, { ignoreEncryption: true });
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pages = pdfDoc.getPages();
  const fontSize = 9;
  const padX = 11;
  const padY = 5;

  for (let i = coverPageCount; i < pages.length; i++) {
    const page = pages[i];
    const { width } = page.getSize();
    const label = String(i - coverPageCount + 1);
    const textWidth = font.widthOfTextAtSize(label, fontSize);
    const pillW = textWidth + padX * 2;
    const pillH = fontSize + padY * 2;
    const marginRight = mm(10);
    const marginBottom = mm(4.5);
    const x = width - marginRight - pillW;
    const y = marginBottom;

    page.drawRectangle({
      x,
      y,
      width: pillW,
      height: pillH,
      color: rgb(1, 1, 1),
      opacity: 0.96,
      borderColor: rgb(0.71, 0.78, 0.86),
      borderWidth: 1,
    });

    page.drawText(label, {
      x: x + padX,
      y: y + padY,
      size: fontSize,
      font,
      color: rgb(0.22, 0.27, 0.33),
    });
  }

  return Buffer.from(await pdfDoc.save());
}

module.exports = {
  stampBookPageNumbers,
  coverPageCountForBookUrl,
};
