/**
 * Standard PDF file glyph (white page, folded corner, red bar with white “PDF”).
 * Kept in sync with pdf-document-icon.svg for visual verification.
 */
export function PdfDocumentIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 32"
      aria-hidden
    >
      <g transform="translate(.056 -1.728)">
        <g
          stroke="#d1d5db"
          strokeLinejoin="round"
          strokeWidth={0.991}
          style={{ strokeWidth: 1.10143 }}
        >
          <path
            fill="#e5e7eb"
            d="m13 2 5 5h-5z"
            transform="matrix(1 0 0 .8243 0 4.217)"
          />
          <g style={{ strokeWidth: 1.10143 }}>
            <path
              fill="#fff"
              d="M6 2h7l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"
              transform="matrix(1 0 0 .8243 0 4.217)"
            />
            <path d="M13 2v5h5" transform="matrix(1 0 0 .8243 0 4.217)" />
          </g>
        </g>
        <path
          stroke="#e5e7eb"
          strokeLinecap="round"
          d="M7 12h8m-8 3h8m-8 3h6"
        />
        <rect
          width={18.24}
          height={10}
          x={2.824}
          y={20}
          fill="#e4002b"
          rx={2}
          ry={2}
          style={{ strokeWidth: 1 }}
        />
        <text
          x={11.765}
          y={27.552}
          fill="#fff"
          fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
          fontSize={7}
          fontWeight={700}
          letterSpacing={0.15}
          textAnchor="middle"
        >
          PDF
        </text>
      </g>
    </svg>
  );
}
