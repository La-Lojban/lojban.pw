#!/usr/bin/env python3
"""
Compare CLL markdown (examples + tables) to friendly-cll mapped chapters.
Flags CLL content units whose Lojban signatures are not found in friendly.

Heuristic: not perfect (friendly rewrites wording), but surfaces missing *example patterns*.
"""

from __future__ import annotations

import re
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CLL = ROOT / "data/pages/en/books/cll"
FRIENDLY = ROOT / "data/pages/en/books/friendly-cll"

# CLL chapter -> friendly chapter (same numbering map as gap-report)
MAP = {str(i): str(i) for i in range(1, 22)}
# Renumberings / merges (friendly reorders topics — override when chapter numbers differ)
# From gap-report: most chapters align 1:1 by *topic* not number. We use explicit mapping:
CHAPTER_MAP = {
    "1": "1",
    "2": "2",
    "3": "19",   # phonology
    "4": "14",   # morphology
    "5": "15",   # selbri
    "6": "3",    # sumti
    "7": "5",    # pronouns
    "8": "11",   # relatives
    "9": "10",   # modals
    "10": "9",   # tense (primary)
    "11": "12",  # abstractions
    "12": "14",  # lujvo -> merged to 14
    "13": "7",   # attitudes
    "14": "8",   # connectives (primary)
    "15": "13",  # negation
    "16": "21",  # logic -> formal (primary); also 13
    "17": "18",  # letterals part of 18
    "18": "18",  # mekso
    "19": "17",  # text
    "20": "20",
    "21": "21",
}

# Chapters split across multiple friendly files — secondary lookup for matching
SECONDARY = {
    "10": ["16"],  # tense extras
    "14": ["16"],  # connective extras
    "16": ["13"],  # logic in negation
}


def normalize_lojban(s: str) -> str:
    s = s.lower().strip()
    s = re.sub(r"\s+", " ", s)
    # remove common markup
    s = re.sub(r"\*\*", "", s)
    return s


def extract_blockquote_lojban_lines(text: str) -> list[str]:
    """Bold segments inside > blockquotes as candidate Lojban examples."""
    out: list[str] = []
    lines = text.splitlines()
    i = 0
    while i < len(lines):
        if not lines[i].startswith(">"):
            i += 1
            continue
        buf: list[str] = []
        while i < len(lines) and lines[i].startswith(">"):
            buf.append(lines[i][1:].strip())
            i += 1
        block = " ".join(buf)
        for m in re.finditer(r"\*\*([^*]+)\*\*", block):
            seg = m.group(1).strip()
            if re.search(r"[a-z.']", seg, re.I) and len(seg) > 4:
                out.append(normalize_lojban(seg))
    return out


def split_paragraphs(text: str) -> list[str]:
    """Split on blank lines; keep non-empty chunks."""
    parts = re.split(r"\n\s*\n", text)
    return [p.strip() for p in parts if p.strip()]


def paragraph_has_example_or_table(p: str) -> bool:
    if ">" in p and re.search(r"\*\*[^*]+\*\*", p):
        return True
    if "<table" in p.lower():
        return True
    if re.search(r"^\|.+\|", p, re.M):
        return True
    return False


def extract_table_cmavo_first_col(p: str) -> list[str]:
    """Rough: first **cmavo** in each table row."""
    found = []
    for m in re.finditer(r"<td>\s*\*\*([^*]+)\*\*", p):
        found.append(m.group(1).strip())
    # markdown tables
    for line in p.splitlines():
        m = re.match(r"^\|\s*\*\*([^*]+)\*\*", line)
        if m:
            found.append(m.group(1).strip())
    return found


def token_set(s: str) -> set[str]:
    toks = re.findall(r"[a-z][a-z'.]+|[.][a-z][a-z'.]*", s.lower())
    # drop tiny
    return {t for t in toks if len(t) > 2 and t not in {"cu", "le", "lo"}}


def example_matched(lojban: str, haystack: str) -> bool:
    """True if haystack contains enough of this example verbatim or token-overlap."""
    n = normalize_lojban(lojban)
    if len(n) < 8:
        return True
    hay = normalize_lojban(haystack)
    # Verbatim substring (best signal)
    if n in hay or n[: min(40, len(n))] in hay:
        return True
    # Token overlap: if >60% of tokens appear as substrings
    ts = token_set(n)
    if len(ts) < 3:
        return n[:30] in hay
    hit = sum(1 for t in ts if t in hay)
    return hit / len(ts) >= 0.55


def load_chapter_text(friendly_nums: list[str]) -> str:
    texts = []
    for num in friendly_nums:
        p = FRIENDLY / f"{num}.md"
        if p.exists():
            texts.append(p.read_text(encoding="utf-8"))
    return "\n\n".join(texts)


def audit_cll_chapter(cll_num: str) -> list[dict]:
    path = CLL / f"{cll_num}.md"
    if not path.exists():
        return []
    text = path.read_text(encoding="utf-8")
    friendly_primary = CHAPTER_MAP.get(cll_num, cll_num)
    friendly_nums = [friendly_primary] + SECONDARY.get(cll_num, [])
    haystack = load_chapter_text(friendly_nums)

    gaps: list[dict] = []

    # 1) Every blockquote Lojban line
    for lb in extract_blockquote_lojban_lines(text):
        if not example_matched(lb, haystack):
            gaps.append(
                {
                    "kind": "blockquote_lojban",
                    "cll_chapter": cll_num,
                    "friendly_chapters": friendly_nums,
                    "snippet": lb[:120],
                }
            )

    # 2) Paragraphs with examples/tables — paragraph-level (prose + example together)
    # Strip HTML spans for splitting
    text_clean = re.sub(r"<span[^>]*></span>", "", text)
    text_clean = re.sub(r"<span[^>]*>", "", text_clean)
    paras = split_paragraphs(text_clean)
    current_section = ""
    for p in paras:
        if p.startswith("###"):
            current_section = p.split("\n")[0][:120]
            continue
        if not paragraph_has_example_or_table(p):
            continue
        # Try matching whole paragraph fingerprint: first example **...**
        ms = list(re.finditer(r"\*\*([^*]{8,120})\*\*", p))
        if not ms:
            continue
        sig = normalize_lojban(ms[0].group(1))
        if len(sig) > 10 and not example_matched(sig, haystack):
            gaps.append(
                {
                    "kind": "paragraph_unit",
                    "cll_chapter": cll_num,
                    "friendly_chapters": friendly_nums,
                    "section": current_section,
                    "snippet": sig[:120],
                }
            )

    return gaps


def is_valid_snippet(snippet: str) -> bool:
    if not snippet or len(snippet) < 10:
        return False
    if "</td>" in snippet.lower() or "<td" in snippet.lower():
        return False
    if "`" in snippet and "koha" in snippet.lower():
        return False
    return True


def main():
    all_gaps: list[dict] = []
    for n in [str(i) for i in range(1, 22)]:
        all_gaps.extend(audit_cll_chapter(n))

    # Deduplicate by (chapter, snippet[:50])
    seen = set()
    unique = []
    for g in all_gaps:
        if not is_valid_snippet(g["snippet"]):
            continue
        key = (g["cll_chapter"], g["snippet"][:60])
        if key in seen:
            continue
        seen.add(key)
        unique.append(g)

    out_json = ROOT / "scripts/cll-friendly-example-gaps.json"
    out_json.write_text(json.dumps(unique, indent=2), encoding="utf-8")
    print(f"Wrote {len(unique)} gap records to {out_json}")

    # Summary by chapter
    from collections import Counter

    c = Counter(g["cll_chapter"] for g in unique)
    print("Gaps by CLL chapter (heuristic):")
    for k in sorted(c.keys(), key=int):
        print(f"  {k}: {c[k]}")


if __name__ == "__main__":
    main()
