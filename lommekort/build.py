#!/usr/bin/env python3
"""Cortex Lommekort – bygger én statisk side (dist/index.html) ud fra konsultationskortene i Obsidian.

Brug:
    python3 build.py                      # standardsti til Obsidian-vaulten
    python3 build.py --src <mappe> --out dist/index.html

Kun Python-standardbibliotek. Ingen netværk, ingen data gemmes.
"""
import argparse
import html
import json
import re
from datetime import date
from pathlib import Path

DEFAULT_SRC = Path.home() / "Obsidian/Knowledge/01 Almen Praksis/Konsultationskort"
HERE = Path(__file__).resolve().parent
SKIP = {"Konsultationskort – Oversigt og format.md", "Konsultationskort – Brugslog.md"}

# ---------------------------------------------------------------- markdown -> html (bevidst minimal)

def inline(text: str) -> str:
    t = html.escape(text, quote=False)
    t = re.sub(r"\[\[([^\]|]+)\|([^\]]+)\]\]", r'<span class="wl">\2</span>', t)
    t = re.sub(r"\[\[([^\]]+)\]\]", r'<span class="wl">\1</span>', t)
    t = re.sub(r"\[([^\]]+)\]\((https?://[^)]+)\)", r'<a href="\2" target="_blank" rel="noopener">\1</a>', t)
    t = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", t)
    t = re.sub(r"`([^`]+)`", r"<code>\1</code>", t)
    t = re.sub(r"\[(Kilde|Kort|Generel viden|Antagelse|Tjek live)([^\]]*)\]",
               lambda m: f'<span class="tag tag-{m.group(1).split()[0].lower()}">[{m.group(1)}{m.group(2)}]</span>', t)
    t = re.sub(r"Tjek live:", r'<span class="tag tag-tjek">Tjek live:</span>', t)
    return t


def md_to_html(md: str) -> str:
    out, lines, i = [], md.split("\n"), 0
    while i < len(lines):
        line = lines[i]
        if not line.strip():
            i += 1
            continue
        if line.startswith("|"):
            rows = []
            while i < len(lines) and lines[i].startswith("|"):
                cells = [c.strip() for c in lines[i].strip().strip("|").split("|")]
                if not all(re.fullmatch(r":?-+:?", c) for c in cells):
                    rows.append(cells)
                i += 1
            if rows:
                head = "".join(f"<th>{inline(c)}</th>" for c in rows[0])
                body = "".join("<tr>" + "".join(f"<td>{inline(c)}</td>" for c in r) + "</tr>" for r in rows[1:])
                out.append(f"<table><thead><tr>{head}</tr></thead><tbody>{body}</tbody></table>")
            continue
        if line.startswith(">"):
            block = []
            while i < len(lines) and lines[i].startswith(">"):
                block.append(lines[i][1:].lstrip())
                i += 1
            m = re.match(r"\[!(\w+)\]\s*(.*)", block[0])
            if m:
                kind, title = m.group(1).lower(), m.group(2)
                body = " ".join(inline(b) for b in block[1:])
                out.append(f'<div class="callout callout-{kind}"><div class="callout-title">{inline(title)}</div><div>{body}</div></div>')
            else:
                out.append("<blockquote>" + " ".join(inline(b) for b in block) + "</blockquote>")
            continue
        if re.match(r"\s*(- |\d+\. )", line):
            items = []
            while i < len(lines) and re.match(r"\s*(- |\d+\. )", lines[i]):
                indent = len(lines[i]) - len(lines[i].lstrip())
                items.append((indent, re.sub(r"^\s*(- |\d+\. )", "", lines[i])))
                i += 1
            out.append(render_list(items))
            continue
        if line.startswith("### "):
            out.append(f"<h4>{inline(line[4:])}</h4>")
        else:
            out.append(f"<p>{inline(line)}</p>")
        i += 1
    return "\n".join(out)


def render_list(items):
    """items: [(indent, text)] -> indlejret <ul>."""
    out, depth = [], -1
    for indent, text in items:
        level = indent // 2
        if level > depth:
            out.append("<ul>" * (level - depth))
        else:
            out.append("</li>")
            if level < depth:
                out.append("</ul></li>" * (depth - level))
        out.append(f"<li>{inline(text)}")
        depth = level
    out.append("</li>" + "</ul></li>" * depth + "</ul>")
    return "".join(out)


# ---------------------------------------------------------------- kort-parsing

def parse_frontmatter(text):
    m = re.match(r"---\n(.*?)\n---\n", text, re.S)
    meta = {}
    if m:
        for ln in m.group(1).splitlines():
            if ":" in ln:
                k, v = ln.split(":", 1)
                meta[k.strip()] = v.strip()
        text = text[m.end():]
    return meta, text


def split_sections(body):
    title = re.search(r"^# (.+)$", body, re.M).group(1).strip()
    parts = re.split(r"^## ", body, flags=re.M)
    intro, sections = parts[0], []
    for p in parts[1:]:
        head, _, content = p.partition("\n")
        sections.append({"heading": head.strip(), "md": content.strip()})
    footer = ""
    if sections and "\n---\n" in sections[-1]["md"]:
        sections[-1]["md"], footer = sections[-1]["md"].split("\n---\n", 1)
    return title, intro, sections, footer.strip()


PH = re.compile(r"(?<!\[)\[(?!\[)([^\[\]]*)\](?!\])")
SKIP_UNTOUCHED = re.compile(r"(sikkerhedsnet|opfølgning|kontrol om)", re.I)


def parse_journal(md):
    """Journalskabelon -> linjer med felter. Hvert felt har label, hint, suffix, options."""
    lines = []
    for raw in md.splitlines():
        m = re.match(r"\*\*(.+?):\*\*\s*(.*)", raw.strip())
        if not m:
            continue
        key, tpl = m.group(1), m.group(2)
        fields, pos = [], 0
        tokens = list(PH.finditer(tpl))
        for idx, ph in enumerate(tokens):
            before = tpl[pos:ph.start()]
            if fields and fields[-1]["suffix"] and before.startswith(fields[-1]["suffix"]):
                before = before[len(fields[-1]["suffix"]):]
            # label = teksten mellem forrige felt og dette, uden indledende tegnsætning
            seg = re.sub(r"^[\s.,;/]+", "", before).strip()
            nxt_start = tokens[idx + 1].start() if idx + 1 < len(tokens) else len(tpl)
            after = tpl[ph.end():nxt_start]
            # suffix = kort enhed lige efter feltet, fx " dage", " °C", " mm", " point"
            sm = re.match(r"^ ((?:dage|døgn|uger|timer|tid|°C|mm|point|kg)(?:/\w+)?)(?=[.,\s]|$)", after)
            suffix = " " + sm.group(1) if sm else ""
            if seg.lower() in {"i", "siden", "med", "ved", "af", "til", "max", "om"} and fields:
                seg = f"{fields[-1]['label']} {seg}"
            hint = ph.group(1).strip()
            opts = []
            if hint and "/" in hint and hint.strip() != "/" and len(hint) < 60:
                base = re.split(r"\s[–-]\s", hint)[0]
                opts = [o.strip() for o in base.split("/") if o.strip() and ":" not in o]
            label = seg.rstrip(":").strip() or hint
            is_free = key.lower().startswith("ikke undersøgt")
            fields.append({
                "label": label,
                "hint": hint,
                "suffix": suffix,
                "options": opts if len(opts) >= 2 else [],
                "wide": is_free or key in ("A", "P") or "indhold" in hint,
                "safety": "indhold" in hint and "sikkerhedsnet" in label.lower(),
                "noUntouched": bool(SKIP_UNTOUCHED.search(label)) or is_free or key in ("A", "P"),
            })
            pos = ph.end()
        lines.append({"key": key, "fields": fields})
    return lines


def extract_safety_net(sections):
    for s in sections:
        if s["heading"].startswith("5"):
            q = [ln[1:].strip() for ln in s["md"].splitlines() if ln.startswith(">")]
            return " ".join(q).strip().strip('"“”')
    return ""


def load_cards(src: Path):
    cards = []
    for f in sorted(src.glob("Konsultationskort – *.md")):
        if f.name in SKIP:
            continue
        meta, body = parse_frontmatter(f.read_text(encoding="utf-8"))
        title, intro, sections, footer = split_sections(body)
        journal_sec = next((s for s in sections if s["heading"].startswith("6")), None)
        view_secs = [s for s in sections if not s["heading"].startswith("6")]
        short = title.replace("Konsultationskort – ", "")
        cards.append({
            "id": meta.get("id", f.stem),
            "title": short,
            "status": meta.get("status", "DRAFT"),
            "checked": meta.get("kontrolleret", "–"),
            "intro": md_to_html(intro.split("\n", 1)[1] if intro.startswith("#") else intro),
            "sections": [{"heading": s["heading"], "html": md_to_html(s["md"])} for s in view_secs],
            "footer": md_to_html(footer),
            "journal": parse_journal(journal_sec["md"]) if journal_sec else [],
            "safetyNet": extract_safety_net(sections),
            "search": (short + " " + " ".join(s["md"] for s in sections[:2])).lower(),
        })
    return cards


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--src", type=Path, default=DEFAULT_SRC)
    ap.add_argument("--out", type=Path, default=HERE / "dist/index.html")
    a = ap.parse_args()
    cards = load_cards(a.src)
    if not cards:
        raise SystemExit(f"Ingen kort fundet i {a.src}")
    tpl = (HERE / "template.html").read_text(encoding="utf-8")
    data = json.dumps(cards, ensure_ascii=False).replace("</", "<\\/")
    page = tpl.replace("/*__DATA__*/[]", data).replace("__BUILD__", date.today().isoformat())
    a.out.parent.mkdir(parents=True, exist_ok=True)
    a.out.write_text(page, encoding="utf-8")
    n_fields = sum(len(l["fields"]) for c in cards for l in c["journal"])
    print(f"Bygget {a.out} – {len(cards)} kort, {n_fields} journalfelter")


if __name__ == "__main__":
    main()
