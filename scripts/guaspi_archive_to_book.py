#!/usr/bin/env python3
"""
Convert archive/guaspi HTML mirror to data/pages/en/books/guaspi/*.md

Output conventions follow other site books (e.g. learn-lojban): raw HTML tables
where needed, fenced code for <pre>, no orphan blockquote markers, normalized
horizontal rules, tidy spacing.

Re-run after updating the wget mirror. Requires: pandoc
"""
from __future__ import annotations

import html as html_stdlib
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ARCHIVE = ROOT / "archive" / "guaspi"
OUT_DIR = ROOT / "data" / "pages" / "en" / "books" / "guaspi"
PARENT = ROOT / "data" / "pages" / "en" / "books" / "guaspi.md"

# Main HTML → chapter number (matches N.md)
CHAPTER_HTML: list[tuple[str, str]] = [
    ("index.html", "0"),
    ("acmpaper.html", "1"),
    ("guarefmn.html", "2"),
    ("grammar.html", "3"),
    ("cases.html", "4"),
    ("pronouns.html", "5"),
    ("semantic.html", "6"),
    ("vocab1.html", "7"),
    ("vocab2.html", "8"),
    ("conclusn.html", "9"),
    ("dictintr.html", "10"),
    ("xankua.html", "11"),
]

LINK_TO_CHAPTER: dict[str, str] = {h: n for h, n in CHAPTER_HTML}
LINK_TO_CHAPTER["old.html"] = "12"

# Files at site root (not separate book chapters)
STATIC_FILE_URL: dict[str, str] = {
    "xankuacgi.txt": "https://www.jfcarter.net/~jimc/guaspi/xankuacgi.txt",
    "xankua.dat": "https://www.jfcarter.net/~jimc/guaspi/xankua.dat",
}

BASE = "/en/books/guaspi"

XANKUA_CHAPTER = """# *Gua\\spi* Vocabulary Lookup {#guaspi-vocabulary-lookup}

The original site used an HTML form backed by a CGI script. That lookup only works on the live server.

- **Live form:** [jfcarter.net \\~jimc/guaspi/xankua.html](https://www.jfcarter.net/~jimc/guaspi/xankua.html)
- **CGI endpoint:** `https://www.jfcarter.net/~jimc/guaspi/xankua.cgi`
- **Machine-readable dictionary:** [xankua.dat](https://www.jfcarter.net/~jimc/guaspi/xankua.dat)
- **CGI source (Perl):** [xankuacgi.txt](https://www.jfcarter.net/~jimc/guaspi/xankuacgi.txt)

Search hints from the original page: you may give several words (comma or space separated), or a thesaurus category such as ``1.2.3``, or a partial category like ``1.2`` to list subcategories (no words).
"""

# Placeholder must survive pandoc unchanged (paragraph text).
_TABLE_PH_PREFIX = "GUASPIHTMLTABLE"
_PRE_PH_PREFIX = "GUASPIPREBLOCK"


def unwrap_blockquote_tables(html: str) -> str:
    """
    <blockquote><table>…</table></blockquote> makes pandoc emit stray '>' lines
    before restored HTML tables. Drop the wrapper when the blockquote only
    contains the table (matches learn-lojban: examples as plain tables).
    """
    return re.sub(
        r"(?is)<blockquote[^>]*>\s*(<table\b[^>]*>.*?</table>)\s*</blockquote>",
        r"\1",
        html,
    )


def ensure_tbody(table_html: str) -> str:
    """Prefer <tbody><tr>… like learn-lojban tables when structure is a simple grid."""
    t = table_html.strip()
    if re.search(r"(?is)<tbody\b", t):
        return t
    if not re.search(r"(?is)<table[^>]*>\s*<tr", t):
        return t
    t = re.sub(r"(?is)(<table[^>]*>)(\s*<tr)", r"\1<tbody>\2", t, count=1)
    t = re.sub(r"(?is)</table>\s*$", "</tbody></table>", t)
    return t


def extract_pre_blocks(html: str) -> tuple[str, list[str]]:
    """ASCII figures use <pre>; convert to fenced code in markdown (monospace, spacing preserved)."""

    blocks: list[str] = []

    def repl(m: re.Match) -> str:
        blocks.append(m.group(1))
        i = len(blocks) - 1
        return f"<p>{_PRE_PH_PREFIX}{i:04d}</p>"

    out = re.sub(r"(?is)<pre\b[^>]*>(.*?)</pre>", repl, html)
    return out, blocks


def restore_pre_blocks(md: str, blocks: list[str]) -> str:
    for i, raw in enumerate(blocks):
        body = html_stdlib.unescape(raw).replace("\r\n", "\n").strip("\n")
        fenced = f"\n\n```text\n{body}\n```\n\n"
        md = md.replace(f"{_PRE_PH_PREFIX}{i:04d}", fenced)
    return md


def extract_tables(html: str) -> tuple[str, list[str]]:
    """Legacy Guaspi HTML tables are too broken for pandoc; extract and paste back as raw HTML."""

    tables: list[str] = []

    def repl(m: re.Match) -> str:
        tables.append(m.group(0))
        i = len(tables) - 1
        return f"<p>{_TABLE_PH_PREFIX}{i:04d}</p>"

    out = re.sub(r"(?is)<table\b[^>]*>.*?</table>", repl, html)
    return out, tables


def _html_escape_text_only(text: str) -> str:
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def _strip_table_markup_cruft(s: str) -> str:
    """Remove stray row/cell tags leaked into cell text from broken legacy HTML."""
    s = re.sub(r"(?is)<\s*tr\s*/?\s*>", "", s)
    s = re.sub(r"(?is)</\s*tr\s*>", "", s)
    s = re.sub(r"(?is)<\s*td\b[^>]*>", "", s)
    s = re.sub(r"(?is)</\s*td\s*>", "", s)
    s = re.sub(r"(?is)<\s*tbody\s*/?\s*>", "", s)
    s = re.sub(r"(?is)</\s*tbody\s*>", "", s)
    return s


def _normalize_u_tags(s: str) -> str:
    s = re.sub(r"(?is)<\s*U\s*>", "<u>", s)
    s = re.sub(r"(?is)</\s*U\s*>", "</u>", s)
    return s


def _collapse_adjacent_u(s: str) -> str:
    """Merge <u><u>a</u></u> → <u>a</u>."""
    for _ in range(8):
        s2 = re.sub(r"(?is)<\s*u\s*>\s*<\s*u\s*>", "<u>", s)
        s2 = re.sub(r"(?is)</\s*u\s*>\s*</\s*u\s*>", "</u>", s2)
        if s2 == s:
            return s2
        s = s2
    return s


def _latex_double_quotes_to_u(s: str) -> str:
    r"""TeX ``...'' → <u>...</u> (for emphasis in example cells)."""
    return re.sub(r"``([\s\S]*?)''", r"<u>\1</u>", s)


def _unwrap_em_tags_to_u(s: str) -> str:
    """<em>...</em> → <u>...</u>; handle ``...'' inside em first."""
    s = re.sub(
        r"(?is)<\s*em\s*>``([\s\S]*?)''</\s*em\s*>",
        r"<u>\1</u>",
        s,
    )
    s = re.sub(
        r"(?is)<\s*em\s*>([\s\S]*?)</\s*em\s*>",
        lambda m: "<u>" + m.group(1).strip() + "</u>",
        s,
    )
    return s


# Inner HTML we keep in example cells (subscripts and underline emphasis).
_SUB_OR_U = re.compile(
    r"(?is)(<\s*sub\b[^>]*>.*?</\s*sub\s*>|<\s*u\b[^>]*>.*?</\s*u\s*>)"
)


def _escape_html_preserving_sub_u(s: str) -> str:
    out: list[str] = []
    pos = 0
    for m in _SUB_OR_U.finditer(s):
        out.append(_html_escape_text_only(s[pos : m.start()]))
        out.append(m.group(0))
        pos = m.end()
    out.append(_html_escape_text_only(s[pos:]))
    return "".join(out)


def _guaspi_cell_to_html(cell: str) -> str:
    """Bold gua\\spi line; keep <sub>…</sub> and <u>…</u> as HTML."""
    s = html_stdlib.unescape(cell.strip())
    s = _strip_table_markup_cruft(s)
    s = _normalize_u_tags(s)
    s = re.sub(r"(?is)<\s*i\s*>", "", s)
    s = re.sub(r"(?is)</\s*i\s*>", "", s)
    s = " ".join(s.split())
    s = _latex_double_quotes_to_u(s)
    s = _collapse_adjacent_u(s)
    inner = _escape_html_preserving_sub_u(s)
    return "<b>" + inner + "</b>"


def _english_cell_to_html(cell: str) -> str:
    """Italic English; <u> for emphasis; strip leaked table tags; fix TeX ``…''."""
    s = html_stdlib.unescape(cell.strip())
    s = _strip_table_markup_cruft(s)
    s = _normalize_u_tags(s)
    s = re.sub(r"(?is)<\s*i\s*>", "", s)
    s = re.sub(r"(?is)</\s*i\s*>", "", s)
    s = " ".join(s.split())
    s = re.sub(r"(?is)<\s*u\s*>", "<u>", s)
    s = re.sub(r"(?is)</\s*u\s*>", "</u>", s)
    s = _unwrap_em_tags_to_u(s)
    s = _latex_double_quotes_to_u(s)
    s = _collapse_adjacent_u(s)
    parts = re.split(r"(?is)(<u>.*?</u>)", s)
    buf: list[str] = []
    for j, p in enumerate(parts):
        if j % 2 == 1:
            buf.append(p)
        else:
            buf.append(_html_escape_text_only(p))
    inner = "".join(buf)
    return f"<i>{inner}</i>"


def _parse_two_col_data_rows(table_html: str) -> list[tuple[str, str]] | None:
    """
    Legacy HTML often omits </td></tr>; match each <td>… up to next <td or </table>.
    """
    cells: list[str] = []
    for m in re.finditer(
        r"(?is)<td[^>]*>([\s\S]*?)(?=<td\b|</table>)",
        table_html,
    ):
        inner = m.group(1).strip()
        inner = re.sub(r"(?is)</td>\s*$", "", inner)
        cells.append(inner)
    if not cells or len(cells) % 2 != 0:
        return None
    rows: list[tuple[str, str]] = []
    for i in range(0, len(cells), 2):
        rows.append((cells[i], cells[i + 1]))
    return rows


def _is_guaspi_example_token(inner: str) -> bool:
    s = inner.strip()
    if not s:
        return False
    if " " in s and not re.search(r"[!^|/:]", s):
        return False
    if s[0] in "^!|/:@=%":
        return True
    if re.match(r"^[!^|/:]", s):
        return True
    if len(s) <= 12 and re.match(r"^[a-z!^|/:.\-`*0-9]+$", s, re.I):
        if any(c in s for c in "^!|/:"):
            return True
    if re.match(r"^[`!^|/:][a-z]", s):
        return True
    return False


def _is_translation_example_table(html: str) -> bool:
    """Two-column gua\\spi | English examples → blockquotes (learn-lojban style)."""
    if re.search(r"(?is)colspan\s*=", html):
        return False
    if re.search(r"(?is)<th\b", html):
        return False
    if re.search(
        r"(?is)(; Morphology|Cseq\s*=|Discourse|grameme|Tone categories\.|; Grammar\.|; Tone categories)",
        html,
    ):
        return False
    rows = _parse_two_col_data_rows(html)
    if not rows:
        return False
    return True


def _table_to_example_blockquote(table_html: str) -> str:
    rows = _parse_two_col_data_rows(table_html)
    if not rows:
        return "\n\n" + ensure_tbody(table_html.strip()) + "\n\n"
    blocks: list[str] = []
    for gua, eng in rows:
        blocks.append(
            "> " + _guaspi_cell_to_html(gua) + "\n> " + _english_cell_to_html(eng)
        )
    return "\n\n".join(blocks) + "\n\n"


def restore_tables(md: str, tables: list[str]) -> str:
    for i, t in enumerate(tables):
        raw = t.strip()
        if _is_translation_example_table(raw):
            fragment = _table_to_example_blockquote(raw)
        else:
            fragment = "\n\n" + ensure_tbody(raw) + "\n\n"
        md = md.replace(f"{_TABLE_PH_PREFIX}{i:04d}", fragment)
    return md


def pandoc_html_string_to_md(html: str) -> str:
    html = unwrap_blockquote_tables(html)
    html, pres = extract_pre_blocks(html)
    html, tables = extract_tables(html)
    r = subprocess.run(
        [
            "pandoc",
            "-f",
            "html",
            "-t",
            "gfm",
            "--wrap=none",
        ],
        input=html,
        capture_output=True,
        text=True,
        check=True,
    )
    md = restore_tables(r.stdout, tables)
    return restore_pre_blocks(md, pres)


def pandoc_html(path: Path) -> str:
    raw = path.read_text(encoding="utf-8", errors="replace")
    return pandoc_html_string_to_md(raw)


def clean_md(md: str) -> str:
    # Pandoc sometimes emits invalid heading attributes
    md = re.sub(r'(\{#[^}]+)\s+align="center"(\})', r"\1\2", md)
    md = re.sub(r' align="center"', "", md)
    # Pandoc fenced divs for centered lines — unwrap to plain paragraph
    md = re.sub(
        r'^::: \{align="center"\}\s*\n((?:.*\n)*?):::\s*$',
        r"\1",
        md,
        flags=re.MULTILINE,
    )
    # Collapse excessive horizontal rules
    md = re.sub(r"\n-{3,}\n-{3,}\n", "\n\n---\n\n", md)
    # Pandoc attribute on links (not supported everywhere)
    md = re.sub(r"\)\{type=[^}]+\}", ")", md)
    # Figure/Table captions: blockquote + span or legacy {#id} link syntax
    md = re.sub(
        r'^> <span id="[^"]+">((?:Figure|Table) \d+) \\\[([^\]]+)\\\]\.</span>\s*',
        r"> **\1 [\2].** ",
        md,
        flags=re.MULTILINE,
    )
    md = re.sub(
        r"^> \[((?:Figure|Table) \d+) \\\[([^\]]+)\\\]\.\]\{#([^}]+)\}\s*",
        r"> **\1 [\2].** ",
        md,
        flags=re.MULTILINE,
    )
    # Blockquote + plain "Figure N [id]." (no span), as in grammar.html
    md = re.sub(
        r"^> (Figure \d+) \\\[([^\]]+)\\\]\.\s+",
        r"> **\1 [\2].** ",
        md,
        flags=re.MULTILINE,
    )
    md = re.sub(
        r"^> (Table \d+) \\\[([^\]]+)\\\]\.\s+",
        r"> **\1 [\2].** ",
        md,
        flags=re.MULTILINE,
    )
    md = unblockquote_table_figure_captions(md)
    # Empty anchor spans left by HTML
    md = re.sub(r'\s*<span id="[^"]*"></span>', "", md)
    # Mirrored pages: HTML <table> rows with Next / Previous / Contents (pandoc leaves raw HTML)
    md = strip_html_nav_tables(md)
    # Same links as one line (plain or markdown); strip before LaTeX fixes
    md = strip_one_line_nav_remnants(md)
    md = fix_latex_style_quotes(md)
    md = polish_markdown_spacing(md)
    md = triple_hyphen_to_em_dash(md)
    # Orphan section markers after `---` → `—` (same intent as polish_markdown_spacing)
    md = re.sub(r"^\s*—\s*\n+", "", md)
    md = re.sub(r"\n+—\s*$", "\n", md)
    return md.strip() + "\n"


def _is_html_nav_table(block: str) -> bool:
    low = block.lower()
    if "<table" not in low:
        return False
    return (
        re.search(r">next\s*</a>", low) is not None
        and re.search(r">previous\s*</a>", low) is not None
        and re.search(r">contents\s*</a>", low) is not None
    )


def strip_html_nav_tables(md: str) -> str:
    """Remove site header/footer <table> blocks that only link Next, Previous, Contents."""
    parts: list[str] = []
    pos = 0
    for m in re.finditer(r"(?is)<table[^>]*>.*?</table>", md):
        parts.append(md[pos : m.start()])
        if _is_html_nav_table(m.group(0)):
            parts.append("")
        else:
            parts.append(m.group(0))
        pos = m.end()
    parts.append(md[pos:])
    return "".join(parts)


def strip_one_line_nav_remnants(md: str) -> str:
    r"""Drop single-line nav lines: `Previous: … · Contents: … · Next: …` or **Previous:** […](…) · …"""
    md = re.sub(
        r"(?m)^(?:\*\*Previous:\*\* \[[^\]]*\]\([^)]*\) · )?"
        r"\*\*Contents:\*\* \[[^\]]*\]\([^)]*\)"
        r"(?: · \*\*Next:\*\* \[[^\]]*\]\([^)]*\))?\s*\n",
        "",
        md,
    )
    md = re.sub(
        r"(?m)^(?:Previous: [^·\n]+ · )?Contents: [^·\n]+(?: · Next: [^\n]+)?\s*\n",
        "",
        md,
    )
    return md


def unblockquote_table_figure_captions(md: str) -> str:
    """Table/Figure captions are not quotations; drop '>' so they render as normal paragraphs."""
    parts = re.split(r"(```[\s\S]*?```)", md)
    out: list[str] = []
    for i, p in enumerate(parts):
        if i % 2 == 1:
            out.append(p)
            continue
        lines = p.splitlines(keepends=True)
        res: list[str] = []
        j = 0
        while j < len(lines):
            line = lines[j]
            if re.match(r"^> \*\*(Table|Figure) \d+", line):
                while j < len(lines) and lines[j].strip() != "":
                    ln = lines[j]
                    if ln.startswith("> "):
                        res.append(ln[2:])
                    elif ln.startswith(">") and not ln.startswith("> "):
                        res.append(ln[1:])
                    else:
                        res.append(ln)
                    j += 1
                continue
            res.append(line)
            j += 1
        out.append("".join(res))
    return "".join(out)


def fix_latex_style_quotes(md: str) -> str:
    r"""Convert ``...'' and `...' remnants to bold/italic; skip fenced code."""
    parts = re.split(r"(```[\s\S]*?```)", md)
    out: list[str] = []
    for i, p in enumerate(parts):
        if i % 2 == 1:
            out.append(p)
        else:
            out.append(_fix_latex_in_plain_text(p))
    return "".join(out)


def _fix_latex_in_plain_text(t: str) -> str:
    # Pandoc often emits ``...'' as \`\`...'' (two ASCII quotes), not \'\'.
    # *\`\`qo''* (italic wrapper) → **qo**
    t = re.sub(
        r"\*\\`\\`(.+?)''\*",
        lambda m: f"**{m.group(1).strip()}**",
        t,
    )

    def double_quotes(m: re.Match) -> str:
        inner = m.group(1).strip()
        if _is_guaspi_example_token(inner):
            return f"**{inner}**"
        return f"_“{inner}”_"

    # Standalone \`\`word'' (closes with two ' chars)
    t = re.sub(r"\\`\\`(.+?)''", double_quotes, t)
    # Alternate TeX-style closing \'\''
    t = re.sub(r"\\`\\`([^\\]+?)\\'\\'", double_quotes, t)
    # Pipe tone \`\|' (pandoc: backtick, backslash-pipe, quote — not two backticks)
    t = re.sub(r"\\`\\\|'", r"**|**", t)
    # Backslash in backticks: \`\\' (TeX close) or \`\\ (space/end) → **\**
    t = re.sub(r"\\`\\\\'", r"**\\**", t)
    t = re.sub(r"\\`\\\\", r"**\\**", t)
    # Single-backtick tone marks: \`-' \`=' → bold (not letter glosses)
    t = re.sub(r"\\`([!^|/:=-])'", r"**\1**", t)
    # Letter glosses \`sh' \`ee'
    t = re.sub(r"\\`([a-z]{1,6})'", r"_‘\1’_", t, flags=re.I)
    # Table note: asterisk marker \`\*' → * (not escaped HTML)
    t = re.sub(r"\\`\\\*'", "*", t)
    return t


def triple_hyphen_to_em_dash(md: str) -> str:
    """Turn `---` into em dash — in prose/headings; standalone `---` lines (HR) → blank spacing."""
    parts = re.split(r"(```[\s\S]*?```)", md)
    out: list[str] = []
    for i, p in enumerate(parts):
        if i % 2 == 1:
            out.append(p)
        else:
            # Markdown horizontal rule: line containing only --- (not ----)
            p = re.sub(r"(?m)^\s*---\s*\n", "\n\n", p)
            # Remaining exactly-three-hyphen sequences (not part of ----)
            p = re.sub(r"(?<![-])---(?![-])", "—", p)
            out.append(p)
    return "".join(out)


def polish_markdown_spacing(md: str) -> str:
    """learn-lojban-style spacing: no orphan '>' before HTML/code; short rules; trim blanks."""

    # Pandoc artifacts: blockquote marker with no text before raw HTML or fenced code
    for _ in range(5):
        md = re.sub(r"^> *\n+(?=<)", "", md, flags=re.MULTILINE)
        md = re.sub(r"^> *\n+(?=```)", "", md, flags=re.MULTILINE)
    # Lines that are only '>' or '> ' (empty blockquote)
    md = re.sub(r"^> *$\n", "", md, flags=re.MULTILINE)
    # Long <hr> from HTML → single --- (like other books)
    md = re.sub(r"\n-{20,}\s*\n", "\n\n---\n\n", md)
    # Collapse 4+ consecutive newlines outside fenced blocks
    parts = re.split(r"(```[\s\S]*?```)", md)
    out: list[str] = []
    for i, p in enumerate(parts):
        if i % 2 == 1:
            out.append(p)
        else:
            p = re.sub(r"\n{4,}", "\n\n\n", p)
            out.append(p)
    md = "".join(out)
    # Orphan rules left when site nav <table> / nav lines were removed
    md = re.sub(r"^\s*---\s*\n+", "", md)
    md = re.sub(r"\n+---\s*$", "\n", md)
    return md


def resolve_relative_url(inner: str) -> str | None:
    """Map mirrored relative URLs to site paths; return None if unchanged."""
    if inner.startswith("http") or inner.startswith("mailto:"):
        return None
    if inner.startswith("#"):
        return None
    base, frag = inner, ""
    if "#" in inner:
        base, frag = inner.split("#", 1)
        frag = "#" + frag
    fname = base.split("/")[-1]
    if fname in STATIC_FILE_URL:
        return STATIC_FILE_URL[fname] + frag
    if fname in LINK_TO_CHAPTER:
        return f"{BASE}/{LINK_TO_CHAPTER[fname]}{frag}"
    if "old/" in inner and fname.endswith(".html"):
        name = fname[:-5].lower().replace(".", "-")
        return f"{BASE}/12#{name}"
    return None


def rewrite_links(md: str) -> str:
    """Rewrite relative .html links to /en/books/guaspi/N; fix markdown () and raw HTML href=."""

    def sub_paren(m: re.Match) -> str:
        inner = m.group(1)
        new = resolve_relative_url(inner)
        if new is None:
            return m.group(0)
        return f"({new})"

    md = re.sub(r"\((?!https?://)([^)]+)\)", sub_paren, md)

    def sub_href(m: re.Match) -> str:
        quote = m.group(1)
        inner = m.group(2)
        new = resolve_relative_url(inner)
        if new is None:
            return m.group(0)
        return f"href={quote}{new}{quote}"

    md = re.sub(r"""href=(['"])([^'"]+)\1""", sub_href, md)
    return md


# Manual section order for prev/next (skips index 0 and appendix)
MANUAL_FLOW = [
    ("grammar.html", "Introduction and Grammar"),
    ("cases.html", "Cases and Relations"),
    ("pronouns.html", "Pronouns; Compound Words"),
    ("semantic.html", "Semantics of Arguments"),
    ("vocab1.html", "Vocabulary: Special Word Categories"),
    ("vocab2.html", "Mathematical Expressions; Sentence Forms"),
    ("conclusn.html", "BNF Grammar and Conclusion"),
]


def strip_pandoc_triple_nav(md: str) -> str:
    """Remove legacy Next/Previous/Contents lines and following horizontal rule (start or end)."""
    for _ in range(3):
        md = re.sub(
            r"^\[Next\]\([^)]+\)\s*\n+\[Previous\]\([^)]+\)\s*\n+\[Contents\]\([^)]+\)\s*\n+[-\s]+\s*\n*",
            "",
            md,
            count=1,
            flags=re.MULTILINE,
        )
        md = re.sub(
            r"^\[Previous\]\([^)]+\)\s*\n+\[Next\]\([^)]+\)\s*\n+\[Contents\]\([^)]+\)\s*\n+[-\s]+\s*\n*",
            "",
            md,
            count=1,
            flags=re.MULTILINE,
        )
        md = re.sub(
            r"\n+\[Next\]\([^)]+\)\s*\n+\[Previous\]\([^)]+\)\s*\n+\[Contents\]\([^)]+\)\s*\n+[-\s]+\s*\n*$",
            "",
            md,
            count=1,
        )
        md = re.sub(
            r"\n+\[Previous\]\([^)]+\)\s*\n+\[Next\]\([^)]+\)\s*\n+\[Contents\]\([^)]+\)\s*\n+[-\s]+\s*\n*$",
            "",
            md,
            count=1,
        )
        # Trailing nav often preceded by a long HTML \<hr\> line of dashes
        md = re.sub(
            r"\n-{10,}\s*\n+\[Next\]\([^)]+\)\s*\n+\[Previous\]\([^)]+\)\s*\n+\[Contents\]\([^)]+\)\s*\n*$",
            "",
            md,
            count=1,
        )
        md = re.sub(
            r"\n+\[Next\]\([^)]+\)\s*\n+\[Previous\]\([^)]+\)\s*\n+\[Contents\]\([^)]+\)\s*\n*$",
            "",
            md,
            count=1,
        )
    return md


def inject_manual_nav(md: str, filename: str) -> str:
    """Strip legacy pandoc nav only; book uses @include — no per-chapter nav lines."""
    if filename not in [x[0] for x in MANUAL_FLOW]:
        return md
    md = strip_pandoc_triple_nav(md)
    return md.rstrip() + "\n"


def old_dir_table(old_dir: Path) -> str:
    lines = [
        "### Directory listing",
        "",
        "| File | Size |",
        "| --- | --- |",
    ]
    for f in sorted(old_dir.iterdir(), key=lambda p: p.name.lower()):
        if f.name == "latindic.zip":
            lines.append(
                f"| [latindic.zip](https://www.jfcarter.net/~jimc/guaspi/old/latindic.zip) "
                f"| {f.stat().st_size // 1024} KiB (binary) |"
            )
        else:
            lines.append(f"| `{f.name}` | {f.stat().st_size} bytes |")
    return "\n".join(lines) + "\n"


def old_html_to_md(path: Path) -> str:
    """Mirror files are often plain text served as .html; avoid pandoc noise for those."""
    raw = path.read_text(encoding="utf-8", errors="replace")
    if "<html" not in raw.lower():
        body = html_stdlib.unescape(raw).rstrip()
        return f"```text\n{body}\n```\n"
    return clean_md(pandoc_html(path))


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    for html_name, num in CHAPTER_HTML:
        if html_name == "xankua.html":
            md = XANKUA_CHAPTER
        else:
            md = pandoc_html(ARCHIVE / html_name)
            md = clean_md(md)
            md = rewrite_links(md)
        if html_name in [x[0] for x in MANUAL_FLOW]:
            md = inject_manual_nav(md, html_name)
        else:
            # Remove orphan nav headers if pandoc left them (e.g. acmpaper)
            md = re.sub(
                r"^\[(?:Next|Previous|Contents)\]\([^)]+\)\s*(?:\n\n|$)",
                "",
                md,
                flags=re.MULTILINE,
            )
            md = re.sub(r"^---\s*\n\n", "", md, count=2, flags=re.MULTILINE)
        (OUT_DIR / f"{num}.md").write_text(md, encoding="utf-8")

    # Chapter 12: appendix
    old_dir = ARCHIVE / "old"
    parts: list[str] = []
    parts.append(
        "## TeX documents and miscellaneous\n\n"
        "The following material was mirrored from the original `old/` directory "
        f"([browse on the host](https://www.jfcarter.net/~jimc/guaspi/old/)).\n\n"
    )
    parts.append(old_dir_table(old_dir))
    parts.append("\n---\n\n## File contents (converted)\n")

    order = sorted(old_dir.iterdir(), key=lambda p: p.name.lower())
    for f in order:
        if f.name == "latindic.zip":
            continue
        if f.suffix.lower() == ".html":
            parts.append(f"\n\n### {f.stem}\n\n")
            parts.append(old_html_to_md(f))
        elif f.suffix.lower() in {".txt", ".sty"}:
            parts.append(f"\n\n### {f.name}\n\n")
            text = f.read_text(encoding="utf-8", errors="replace")
            parts.append("```text\n" + text.rstrip() + "\n```\n")

    chap12 = clean_md(rewrite_links("\n".join(parts)))
    # Fix internal old/*.html links that pointed to separate files
    chap12 = re.sub(
        r"\]\(old/([^)]+\.html)(#[^)]*)?\)",
        lambda m: f"]({BASE}/12#{m.group(1).replace('.html','').lower().replace('.', '-')})",
        chap12,
    )
    (OUT_DIR / "12.md").write_text(chap12, encoding="utf-8")

    includes = "\n\n".join(f'@include "guaspi/{i}.md"' for i in range(13))
    PARENT.write_text(
        '---\nicon: 📖\ntitle: "Gua\\\\spi"\n'
        "description: James F. Carter — artificial language reference (mirrored web edition)\n"
        "---\n\n"
        + includes
        + "\n",
        encoding="utf-8",
    )
    print(f"Wrote {PARENT} and {OUT_DIR}/*.md")


if __name__ == "__main__":
    main()
