#!/usr/bin/env python3
"""
Convert CLL DocBook chapter XML (archive/cll/chapters/*.xml) to Markdown
aligned with learn-lojban typography (see docs/content-conventions.md).

Cross-references use stable numbered labels and paths:
- Examples: label Example N.M, fragment ex-N-M, plus legacy xml:id spans
- Sections: label Sec. N.M, fragment sec-N-M, plus legacy xml:id
- Chapters: label Ch. N, fragment ch-N
- EBNF varlist rows (ch.21): label N.M, fragment bnf-N-M
"""

from __future__ import annotations

import html
import re
import sys
import xml.etree.ElementTree as ET
from dataclasses import dataclass, field
from pathlib import Path

# Entities used in the archive that stdlib ElementTree does not define.
ENTITY_REPLACEMENTS = (
    ("&ndash;", "\u2013"),
    ("&mdash;", "\u2014"),
    ("&hellip;", "\u2026"),
    ("&InvisibleTimes;", ""),
    ("&#x2135;", "\u2135"),
)

XML_ID = "{http://www.w3.org/XML/1998/namespace}id"
XLINK_HREF = "{http://www.w3.org/1999/xlink}href"
SKIP_TAGS = frozenset({"indexterm", "anchor"})


def preprocess_xml(raw: str) -> str:
    for a, b in ENTITY_REPLACEMENTS:
        raw = raw.replace(a, b)
    return raw


def strip_ns(tag: str) -> str:
    if "}" in tag:
        return tag.rsplit("}", 1)[-1]
    return tag


def xlink_href(el: ET.Element) -> str | None:
    return el.get(XLINK_HREF) or el.get("href")


def format_external_link_md(href: str, inner: str) -> str:
    label = inner if inner else href
    esc = label.replace("]", "\\]")
    return f"[{esc}]({href})"


def postprocess_contact_para(body: str) -> str:
    """Restore line breaks typical of the CLL copyright contact block."""
    if "For information, contact:" not in body:
        return body
    body = re.sub(
        r"(For information, contact:)\s+(The Logical Language Group,)",
        r"\1<br/>\2",
        body,
        count=1,
    )
    body = re.sub(r"(USA\.)\s+Telephone:", r"\1<br/>Telephone:", body, count=1)
    body = re.sub(
        r"(\d{3}-\d{3}-\d{4})\.\s+Email address:",
        r"\1.<br/>Email address:",
        body,
        count=1,
    )
    body = re.sub(r"\)\.\s+Web Address:", ").<br/>Web Address:", body, count=1)
    return body


_SUBSCRIPT_DIGITS = str.maketrans("0123456789", "₀₁₂₃₄₅₆₇₈₉")


def subscript_x_placeholders(s: str) -> str:
    """Turn x1, x2, … into x₁, x₂ (Unicode subscripts) for place-structure notation."""

    def repl(m: re.Match[str]) -> str:
        return m.group(1) + m.group(2).translate(_SUBSCRIPT_DIGITS)

    return re.sub(r"\b([xX])(\d+)\b", repl, s)


def get_xml_id(el: ET.Element) -> str | None:
    return el.get(XML_ID) or el.get("xml:id")


@dataclass
class RefTarget:
    kind: str  # chapter | section | example | varlistentry
    chapter: int
    seq: int
    fragment: str
    legacy_xml_ids: list[str] = field(default_factory=list)

    def id_spans(self) -> str:
        seen: set[str] = set()
        parts: list[str] = []
        for i in (self.fragment, *self.legacy_xml_ids):
            if i and i not in seen:
                seen.add(i)
                parts.append(f'<span id="{html.escape(i)}"></span>')
        return "".join(parts)


class ConvertCtx:
    def __init__(
        self,
        ref_by_id: dict[str, RefTarget],
        elem_to_target: dict[int, RefTarget],
        lang: str,
        book: str,
        chapter_num: int,
    ) -> None:
        self.ref_by_id = ref_by_id
        self.elem_to_target = elem_to_target
        self.lang = lang
        self.book = book
        self.chapter_num = chapter_num

    def page_href(self, chapter: int, fragment: str) -> str:
        base = f"/{self.lang}/books/{self.book}/{chapter}/"
        return f"{base}#{fragment}" if fragment else base

    def default_label(self, t: RefTarget) -> str:
        if t.kind == "example":
            return f"Example {t.chapter}.{t.seq}"
        if t.kind == "section":
            return f"Sec. {t.chapter}.{t.seq}"
        if t.kind == "chapter":
            return f"Ch. {t.chapter}"
        if t.kind == "varlistentry":
            return f"{t.chapter}.{t.seq}"
        return t.fragment

    def format_link(self, linkend: str, inner_text: str | None) -> str:
        t = self.ref_by_id.get(linkend)
        if t is None:
            return f"_{linkend}_"
        url = self.page_href(t.chapter, t.fragment)
        label = inner_text.strip() if inner_text else self.default_label(t)
        if not label:
            label = self.default_label(t)
        if t.kind == "example":
            label = self.normalize_example_link_label(label, t)
        esc_label = label.replace("]", "\\]")
        return f"[{esc_label}]({url})"

    @staticmethod
    def normalize_example_link_label(label: str, t: RefTarget) -> str:
        s = label.strip()
        if s.lower().startswith("example "):
            return s
        m = re.fullmatch(r"(\d+)\.(\d+)", s)
        if m and int(m.group(1)) == t.chapter and int(m.group(2)) == t.seq:
            return f"Example {t.chapter}.{t.seq}"
        return label


def build_indices(
    chapter_roots: list[tuple[int, ET.Element]],
) -> tuple[dict[str, RefTarget], dict[int, RefTarget]]:
    ref_by_id: dict[str, RefTarget] = {}
    elem_to_target: dict[int, RefTarget] = {}

    for chapter_num, root in chapter_roots:
        assert strip_ns(root.tag) == "chapter"
        state: dict = {"section": 0, "example": 0, "vle": 0, "chapter_el": root}

        def walk(el: ET.Element) -> None:
            tag = strip_ns(el.tag)
            oid = get_xml_id(el)

            if tag == "chapter":
                frag = f"ch-{chapter_num}"
                leg = [oid] if oid else []
                tgt = RefTarget("chapter", chapter_num, chapter_num, frag, leg)
                elem_to_target[id(el)] = tgt
                if oid:
                    ref_by_id[oid] = tgt
                state["chapter_el"] = el
                for c in el:
                    walk(c)
                return

            if tag == "section":
                state["section"] += 1
                seq = state["section"]
                frag = f"sec-{chapter_num}-{seq}"
                leg = [oid] if oid else []
                tgt = RefTarget("section", chapter_num, seq, frag, leg)
                elem_to_target[id(el)] = tgt
                if oid:
                    ref_by_id[oid] = tgt
                for c in el:
                    walk(c)
                return

            if tag == "example":
                state["example"] += 1
                seq = state["example"]
                frag = f"ex-{chapter_num}-{seq}"
                leg = [oid] if oid else []
                tgt = RefTarget("example", chapter_num, seq, frag, leg)
                elem_to_target[id(el)] = tgt
                if oid:
                    ref_by_id[oid] = tgt
                for c in el:
                    walk(c)
                return

            if tag == "varlistentry":
                state["vle"] += 1
                seq = state["vle"]
                frag = f"bnf-{chapter_num}-{seq}"
                anchor_ids: list[str] = []
                for sub in el.iter():
                    if strip_ns(sub.tag) == "anchor":
                        aid = get_xml_id(sub)
                        if aid:
                            anchor_ids.append(aid)
                seen_a: set[str] = set()
                ordered_legacy: list[str] = []
                for aid in anchor_ids:
                    if aid not in seen_a:
                        seen_a.add(aid)
                        ordered_legacy.append(aid)
                if oid and oid not in seen_a:
                    ordered_legacy.insert(0, oid)
                tgt = RefTarget("varlistentry", chapter_num, seq, frag, ordered_legacy)
                elem_to_target[id(el)] = tgt
                for aid in ordered_legacy:
                    ref_by_id[aid] = tgt
                for c in el:
                    walk(c)
                return

            if tag == "mediaobject" and oid and "-picture" in oid:
                ch_el = state["chapter_el"]
                ch_tgt = elem_to_target[id(ch_el)]
                if oid not in ch_tgt.legacy_xml_ids:
                    ch_tgt.legacy_xml_ids.append(oid)
                ref_by_id[oid] = ch_tgt

            for c in el:
                walk(c)

        walk(root)

    return ref_by_id, elem_to_target


class MdEmitter:
    def __init__(self) -> None:
        self.out: list[str] = []

    def add(self, line: str = "") -> None:
        self.out.append(line)

    def add_blank(self) -> None:
        if self.out and self.out[-1] != "":
            self.out.append("")


def plain_text(el: ET.Element | None) -> str:
    if el is None:
        return ""
    parts: list[str] = []
    if el.text:
        parts.append(el.text)
    for ch in el:
        t = strip_ns(ch.tag)
        if t in SKIP_TAGS:
            if ch.tail:
                parts.append(ch.tail)
            continue
        parts.append(plain_text(ch))
        if ch.tail:
            parts.append(ch.tail)
    return subscript_x_placeholders("".join(parts))


def flatten_math(el: ET.Element) -> str:
    tag = strip_ns(el.tag)
    if tag == "mo":
        txt = (el.text or "").strip()
        if txt in ("+", "-", "=", "(", ")"):
            return f" {txt} "
        return txt
    if tag in ("mn", "mi"):
        return el.text or ""
    if tag == "mspace":
        return " "
    if tag == "msub":
        kids = list(el)
        if len(kids) >= 2:
            return flatten_math(kids[0]) + "_" + flatten_math(kids[1])
    if tag == "msup":
        kids = list(el)
        if len(kids) >= 2:
            return flatten_math(kids[0]) + "^(" + flatten_math(kids[1]) + ")"
    if tag == "mfrac":
        kids = list(el)
        if len(kids) >= 2:
            return flatten_math(kids[0]) + "/" + flatten_math(kids[1])
    if tag == "mrow":
        return "".join(flatten_math(c) for c in el)
    if tag in ("mmlmath", "mmlinlinemath", "math", "dbinlinemath"):
        return "".join(flatten_math(c) for c in el)
    if tag == "subscript":
        inner = "".join(flatten_math(c) for c in el) or plain_text(el)
        return "_" + inner
    if tag == "comment":
        return ""
    return "".join(flatten_math(c) for c in el) if list(el) else (el.text or "")


def literallayout_to_html(el: ET.Element, ctx: ConvertCtx) -> str:
    """Preserve line breaks from DocBook literallayout."""

    out: list[str] = []

    def append_text(s: str | None) -> None:
        if not s:
            return
        lines = [
            html.escape(subscript_x_placeholders(re.sub(r"[ \t]+", " ", ln)))
            for ln in s.split("\n")
        ]
        out.append("<br/>".join(lines))

    append_text(el.text)
    for ch in el:
        st = strip_ns(ch.tag)
        if st in SKIP_TAGS:
            append_text(ch.tail)
            continue
        out.append(inline_rich(ch, ctx))
        append_text(ch.tail)
    return "".join(out)


def inline_rich(el: ET.Element, ctx: ConvertCtx) -> str:
    parts: list[str] = []
    if el.text:
        parts.append(normalize_ws(el.text))

    for child in el:
        t = strip_ns(child.tag)
        if t in SKIP_TAGS:
            if child.tail:
                parts.append(normalize_ws(child.tail))
            continue

        if t == "quote":
            parts.append("_" + plain_text(child).strip() + "_")
        elif t == "emphasis":
            parts.append("_" + plain_text(child).strip() + "_")
        elif t == "citetitle":
            parts.append("_" + plain_text(child).strip() + "_")
        elif t in ("valsi", "jbo", "jbophrase", "cmevla"):
            parts.append("**" + plain_text(child).strip() + "**")
        elif t == "letteral":
            parts.append("**" + plain_text(child).strip() + "**")
        elif t == "xref":
            end = child.get("linkend", "")
            parts.append(ctx.format_link(end, None))
        elif t == "link":
            end = child.get("linkend", "")
            inner = plain_text(child).strip()
            xh = xlink_href(child)
            if xh:
                parts.append(format_external_link_md(xh, inner))
            else:
                parts.append(ctx.format_link(end, inner if inner else None))
        elif t == "phrase":
            role = child.get("role", "")
            inner = plain_text(child).strip()
            if role == "IPA":
                parts.append(f"`{inner}`")
            else:
                parts.append(inner)
        elif t == "foreignphrase":
            parts.append("_" + plain_text(child).strip() + "_")
        elif t == "glossterm":
            parts.append("_" + plain_text(child).strip() + "_")
        elif t in ("mmlmath", "mmlinlinemath"):
            parts.append("_" + flatten_math(child).strip() + "_")
        elif t == "inlinemath":
            parts.append("_" + "".join(inline_rich(c, ctx) for c in child).strip() + "_")
        elif t == "footnote":
            parts.append(" _(" + plain_text(child).strip() + ")_")
        elif t == "superscript":
            inner = html.escape(plain_text(child).strip())
            parts.append(f"<sup>{inner}</sup>")
        elif t == "subscript":
            inner = html.escape(plain_text(child).strip())
            parts.append(f"<sub>{inner}</sub>")
        elif t == "abbrev":
            parts.append(plain_text(child).strip())
        elif t == "sbr":
            parts.append("<br/>")
        elif t == "address":
            bits: list[str] = []
            for sub in child:
                st = strip_ns(sub.tag)
                if st in SKIP_TAGS:
                    continue
                bit = (
                    inline_rich(sub, ctx)
                    if list(sub) or sub.text
                    else (sub.text or "")
                ).strip()
                if bit:
                    bits.append(bit)
            parts.append("<br/>".join(bits) if bits else plain_text(child).strip())
        elif t == "literallayout":
            parts.append(literallayout_to_html(child, ctx))
        elif t == "para":
            parts.append(inline_rich(child, ctx))
        elif t == "member":
            parts.append(plain_text(child).strip())
        elif t == "simplelist":
            members = [plain_text(m).strip() for m in child.findall(".//member")]
            st = child.get("type", "")
            sep = " · " if st == "horiz" else " " if st == "inline" else "\n"
            parts.append(sep.join(members) if members else plain_text(child))
        else:
            parts.append(inline_rich(child, ctx) if list(child) else plain_text(child))

        if child.tail:
            parts.append(normalize_ws(child.tail))

    return subscript_x_placeholders("".join(parts).strip())


def normalize_ws(s: str) -> str:
    return re.sub(r"[ \t\r\n]+", " ", s)


# Markdown inside raw HTML <td> is not re-parsed by remark; convert common constructs here.
# Label may contain `]` only when written as `\]` (see format_link).
_MD_LINK_IN_CELL = re.compile(r"\[((?:\\.|[^[\]])*)\]\(([^)]+)\)")


def _md_cell_italic_to_html(text: str) -> str:
    out: list[str] = []
    pos = 0
    for m in re.finditer(r"_((?:\\_|[^_])+?)_", text):
        out.append(html.escape(text[pos : m.start()]))
        inner = m.group(1).replace("\\_", "_")
        out.append(f"<em>{html.escape(inner)}</em>")
        pos = m.end()
    out.append(html.escape(text[pos:]))
    return "".join(out)


def _md_cell_bold_and_italic_to_html(text: str) -> str:
    out: list[str] = []
    pos = 0
    for m in re.finditer(r"\*\*(.+?)\*\*", text, flags=re.DOTALL):
        out.append(_md_cell_italic_to_html(text[pos : m.start()]))
        out.append(f"<strong>{html.escape(m.group(1))}</strong>")
        pos = m.end()
    out.append(_md_cell_italic_to_html(text[pos:]))
    return "".join(out)


def _md_cell_segment_to_html(seg: str) -> str:
    seg = seg.strip()
    if not seg:
        return ""
    parts: list[str] = []
    pos = 0
    for m in _MD_LINK_IN_CELL.finditer(seg):
        if m.start() > pos:
            parts.append(_md_cell_bold_and_italic_to_html(seg[pos : m.start()]))
        label = m.group(1).replace("\\]", "]")
        url = m.group(2).strip()
        parts.append(
            f'<a href="{html.escape(url, quote=True)}">{_md_cell_bold_and_italic_to_html(label)}</a>'
        )
        pos = m.end()
    if pos < len(seg):
        parts.append(_md_cell_bold_and_italic_to_html(seg[pos:]))
    return "".join(parts)


def md_table_cell_inner_to_html(inner_md: str) -> str:
    """Convert newlines and minimal markdown in a table cell to HTML."""
    s = re.sub(r"\r?\n+", "<br/>", subscript_x_placeholders(inner_md.strip()))
    chunks = re.split(r"<br\s*/>", s, flags=re.IGNORECASE)
    return "<br/>".join(_md_cell_segment_to_html(c) for c in chunks)


def title_text(title_el: ET.Element | None) -> str:
    if title_el is None:
        return ""
    return normalize_ws(plain_text(title_el)).strip()


def interlinear_itemized_row_text(row: ET.Element, ctx: ConvertCtx) -> str:
    """Space-join ordered sumti / elidable / selbri (etc.) from itemized interlinear rows."""
    parts: list[str] = []
    for ch in row:
        st = strip_ns(ch.tag)
        if st in SKIP_TAGS:
            continue
        piece = inline_rich(ch, ctx) if list(ch) or ch.text else (ch.text or "")
        piece = piece.strip()
        if piece:
            parts.append(piece)
    return " ".join(parts)


def emit_interlinear_gloss_itemized(igi: ET.Element, em: MdEmitter, ctx: ConvertCtx) -> None:
    for ch in igi:
        st = strip_ns(ch.tag)
        if st in SKIP_TAGS:
            continue
        if st == "jbo":
            line = interlinear_itemized_row_text(ch, ctx)
            if line:
                em.add(f"> **{line}**")
        elif st == "gloss":
            g = interlinear_itemized_row_text(ch, ctx)
            if g:
                em.add(f"> _{g}_")
        elif st == "natlang":
            n = inline_rich(ch, ctx) if list(ch) or ch.text else (ch.text or "")
            if n.strip():
                em.add(f"> _{n.strip()}_")
        elif st == "comment":
            c = plain_text(ch).strip()
            if c:
                em.add(f"> _{c}_")


def emit_interlinear(example: ET.Element, em: MdEmitter, ctx: ConvertCtx) -> None:
    tgt = ctx.elem_to_target.get(id(example))
    if tgt:
        em.add(tgt.id_spans())

    ig = example.find("interlinear-gloss")
    if ig is not None:
        jbo = ig.find("jbo")
        gloss = ig.find("gloss")
        nat = ig.find("natlang")
        if jbo is not None and (jbo.text or list(jbo)):
            line = inline_rich(jbo, ctx) if list(jbo) else (jbo.text or "").strip()
            if line:
                em.add(f"> **{line}**")
        if gloss is not None:
            g = inline_rich(gloss, ctx) if list(gloss) else (gloss.text or "").strip()
            if g:
                em.add(f"> _{g}_")
        if nat is not None:
            n = inline_rich(nat, ctx) if list(nat) else (nat.text or "").strip()
            if n:
                em.add(f"> _{n}_")
        em.add_blank()
        return
    igi = example.find("interlinear-gloss-itemized")
    if igi is not None:
        emit_interlinear_gloss_itemized(igi, em, ctx)
        em.add_blank()
        return
    mm = example.find("mmlmath")
    if mm is not None:
        expr = flatten_math(mm).strip()
        em.add(f"> _{expr}_")
        em.add_blank()
        return
    paras = example.findall("para")
    if paras:
        for p in paras:
            body = inline_rich(p, ctx) if list(p) or p.text else (p.text or "")
            if body.strip():
                em.add(f"> _{body.strip()}_")
        em.add_blank()


def emit_table(table_el: ET.Element, em: MdEmitter, ctx: ConvertCtx) -> None:
    rows: list[list[str]] = []

    def cell_html(td: ET.Element) -> str:
        inner_md = block_flow(td, ctx, section_depth=99, list_depth=0, in_table_cell=True)
        converted = md_table_cell_inner_to_html(inner_md)
        return converted if converted.strip() else html.escape(plain_text(td).strip())

    for tr in table_el.iter():
        if strip_ns(tr.tag) != "tr":
            continue
        cells = []
        for td in tr:
            if strip_ns(td.tag) not in ("td", "th"):
                continue
            cells.append(cell_html(td))
        if cells:
            rows.append(cells)
    if not rows:
        return
    ncol = max(len(r) for r in rows)
    em.add("<table>")
    em.add("<tbody>")
    for r in rows:
        while len(r) < ncol:
            r.append("")
        em.add("<tr>")
        for c in r:
            em.add(f"<td>{c}</td>")
        em.add("</tr>")
    em.add("</tbody>")
    em.add("</table>")
    em.add_blank()


def emit_cmavo_list(node: ET.Element, em: MdEmitter) -> None:
    entries = node.findall(".//cmavo-entry")
    if not entries:
        return
    rows = []
    for e in entries:
        cm = e.find("cmavo")
        sel = e.find("selmaho")
        desc = e.find("description")
        rows.append(
            [
                f"**{(cm.text or '').strip()}**" if cm is not None else "",
                f"`{(sel.text or '').strip()}`" if sel is not None else "",
                html.escape(subscript_x_placeholders((desc.text or "").strip()))
                if desc is not None
                else "",
            ]
        )
    em.add("<table>")
    em.add("<tbody>")
    for r in rows:
        em.add("<tr>")
        for c in r:
            em.add(f"<td>{c}</td>")
        em.add("</tr>")
    em.add("</tbody>")
    em.add("</table>")
    em.add_blank()


def emit_list(node: ET.Element, em: MdEmitter, ctx: ConvertCtx, ordered: bool, depth: int) -> None:
    for i, item in enumerate(node.findall("listitem"), start=1):
        para = item.find("para")
        prefix = f"{i}. " if ordered else "- "
        indent = "  " * depth
        if para is not None:
            line = inline_rich(para, ctx) if list(para) or para.text else (para.text or "")
            em.add(f"{indent}{prefix}{line.strip()}")
        else:
            inner = block_flow(item, ctx, section_depth=99, list_depth=depth + 1)
            for j, ln in enumerate(inner.split("\n")):
                pfx = prefix if j == 0 else "  " * depth + ("  " if ordered else "- ")
                em.add(f"{pfx}{ln}" if j == 0 else f"{indent}  {ln}")
    em.add_blank()


def block_flow(
    parent: ET.Element,
    ctx: ConvertCtx,
    section_depth: int,
    list_depth: int = 0,
    in_table_cell: bool = False,
) -> str:
    em = MdEmitter()
    for child in parent:
        t = strip_ns(child.tag)
        if t in SKIP_TAGS:
            continue
        if t == "title" and strip_ns(parent.tag) == "section":
            continue
        if t == "xref":
            em.add(ctx.format_link(child.get("linkend", ""), None))
        elif t == "link":
            inner = plain_text(child).strip()
            xh = xlink_href(child)
            if xh:
                em.add(format_external_link_md(xh, inner))
            else:
                em.add(ctx.format_link(child.get("linkend", ""), inner if inner else None))
        elif t == "para":
            body = inline_rich(child, ctx) if list(child) or child.text else (child.text or "")
            if body.strip():
                em.add(postprocess_contact_para(body.strip()))
                em.add_blank()
        elif t == "bridgehead":
            txt = plain_text(child).strip()
            if txt:
                em.add(f"{'#' * min(section_depth + 1, 6)} {txt}")
                em.add_blank()
        elif t == "interlinear-gloss":
            ig_lines: list[str] = []
            jbo = child.find("jbo")
            gloss = child.find("gloss")
            nat = child.find("natlang")
            if jbo is not None and (jbo.text or list(jbo)):
                line = inline_rich(jbo, ctx) if list(jbo) else (jbo.text or "").strip()
                if line:
                    ig_lines.append(f"**{line}**")
            if gloss is not None:
                g = inline_rich(gloss, ctx) if list(gloss) else (gloss.text or "").strip()
                if g:
                    ig_lines.append(f"_{g}_")
            if nat is not None:
                n = inline_rich(nat, ctx) if list(nat) else (nat.text or "").strip()
                if n:
                    ig_lines.append(f"_{n}_")
            if ig_lines:
                em.add("\n".join(ig_lines))
                em.add_blank()
        elif t == "example":
            emit_interlinear(child, em, ctx)
        elif t in ("informaltable", "table"):
            emit_table(child, em, ctx)
        elif t == "itemizedlist":
            emit_list(child, em, ctx, ordered=False, depth=list_depth)
        elif t == "orderedlist":
            emit_list(child, em, ctx, ordered=True, depth=list_depth)
        elif t == "programlisting":
            raw = "".join(child.itertext())
            em.add("```")
            em.add(raw.rstrip("\n"))
            em.add("```")
            em.add_blank()
        elif t == "variablelist":
            for vle in child.findall("varlistentry"):
                tgt = ctx.elem_to_target.get(id(vle))
                if tgt:
                    em.add(tgt.id_spans())
                term = vle.find("term")
                term_s = inline_rich(term, ctx) if term is not None else ""
                if term_s.strip():
                    em.add(f"**{term_s.strip()}**")
                    em.add("")
                for li in vle.findall("listitem"):
                    em.add(block_flow(li, ctx, section_depth=section_depth, list_depth=list_depth).strip())
                    em.add_blank()
        elif t == "cmavo-list":
            emit_cmavo_list(child, em)
        elif t == "mediaobject":
            im = child.find(".//imagedata")
            ref = im.get("fileref", "") if im is not None else ""
            if ref:
                em.add(f"<!-- figure: {html.escape(ref)} -->")
                em.add_blank()
        elif t == "simplelist" and strip_ns(parent.tag) == "para":
            pass
        elif t == "section":
            if not in_table_cell:
                emit_section(child, em, ctx, section_depth)
        else:
            if list(child) or (child.text and child.text.strip()):
                inner = block_flow(child, ctx, section_depth, list_depth, in_table_cell)
                if inner.strip():
                    em.add(inner.strip())
                    em.add_blank()
            elif child.text and child.text.strip():
                em.add(child.text.strip())
                em.add_blank()
    return "\n".join(em.out).rstrip()


def emit_section(section: ET.Element, em: MdEmitter, ctx: ConvertCtx, depth: int) -> None:
    tgt = ctx.elem_to_target.get(id(section))
    if tgt:
        em.add(tgt.id_spans())
    tit = title_text(section.find("title"))
    if tit:
        em.add(f"{'#' * depth} {tit}")
        em.add_blank()
    body = block_flow(section, ctx, section_depth=depth + 1)
    if body:
        em.add(body)
        em.add_blank()


def convert_chapter(root: ET.Element, chapter_num: int, ctx: ConvertCtx) -> str:
    assert strip_ns(root.tag) == "chapter"
    em = MdEmitter()
    ch_title = title_text(root.find("title"))
    em.add(f"## Chapter {chapter_num}. {ch_title}")
    em.add_blank()

    ch_tgt = ctx.elem_to_target.get(id(root))
    if ch_tgt:
        em.add(ch_tgt.id_spans())

    for child in root:
        t = strip_ns(child.tag)
        if t == "title":
            continue
        if t == "mediaobject":
            im = child.find(".//imagedata")
            ref = im.get("fileref", "") if im is not None else ""
            if ref:
                em.add(f"<!-- figure: {html.escape(ref)} -->")
                em.add_blank()
            continue
        if t == "section":
            emit_section(child, em, ctx, depth=3)
        elif t in SKIP_TAGS:
            continue
        else:
            frag = block_flow(child, ctx, section_depth=3)
            if frag.strip():
                em.add(frag.strip())
                em.add_blank()
    return "\n".join(em.out).rstrip() + "\n"


def main() -> int:
    repo = Path(__file__).resolve().parents[1]
    src_dir = repo / "archive" / "cll" / "chapters"
    out_dir = repo / "data" / "pages" / "en" / "books" / "cll"
    out_dir.mkdir(parents=True, exist_ok=True)

    files = sorted(src_dir.glob("*.xml"), key=lambda p: p.name)
    if not files:
        print(f"No XML under {src_dir}", file=sys.stderr)
        return 1

    lang = "en"
    book = "cll"

    chapter_roots: list[tuple[int, ET.Element]] = []
    for p in files:
        m = re.match(r"^(\d+)\.xml$", p.name)
        if not m:
            continue
        n = int(m.group(1))
        raw = preprocess_xml(p.read_text(encoding="utf-8", errors="replace"))
        root = ET.fromstring(raw)
        chapter_roots.append((n, root))

    ref_by_id, elem_to_target = build_indices(chapter_roots)

    for n, root in chapter_roots:
        ctx = ConvertCtx(ref_by_id, elem_to_target, lang, book, n)
        md = convert_chapter(root, n, ctx)
        out_path = out_dir / f"{n}.md"
        out_path.write_text(md, encoding="utf-8")
        print(f"Wrote {out_path.relative_to(repo)} ({len(md)} bytes)")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
