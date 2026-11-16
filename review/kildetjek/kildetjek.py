"""Kildetjek af Cortex' kliniske indhold mod kildeteksterne på sundhed.dk.

Brug (fra repo-roden; kræver netværk og rolldown fra node_modules):
  node_modules/.bin/rolldown review/kildetjek/dump.ts --format esm --platform node -o /tmp/dump.mjs
  node /tmp/dump.mjs /tmp/indhold.json
  python3 review/kildetjek/kildetjek.py /tmp/indhold.json /tmp/kilder > review/kildetjek/resultat.json

Tjekker pr. punkt:
  - tal med efterfølgende ord (fx "10 dage", "1 g", "55 år") findes som sammenhængende tekst i en citeret kilde
  - telefonnumre (8 cifre) findes i en citeret kilde
  - frasedækning: andel af punktets 3-ords-fraser, der står ordret i én citeret kilde
  - kildens "Opdateret"-dato mod årstallet i data
Et maskinelt tjek er ikke en klinisk verifikation.
"""
import html, json, os, re, subprocess, sys

ind, mappe = sys.argv[1], sys.argv[2]
os.makedirs(mappe, exist_ok=True)
d = json.load(open(ind))

def hent(kid, url):
    f = f"{mappe}/{kid}.txt"
    if not os.path.exists(f):
        raw = subprocess.run(["curl", "-sS", "--max-time", "20", url], capture_output=True, text=True).stdout
        raw = re.sub(r"<script.*?</script>|<style.*?</style>", "", raw, flags=re.S)
        open(f, "w").write(re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", raw))))
    return open(f).read()

def norm(s):
    s = s.lower().replace("–", "-").replace("−", "-").replace(" ", " ")
    s = re.sub(r"(\d),(\d)", r"\1.\2", s)
    return " ".join(re.findall(r"[\w.%-]+", s))

kilder = {k["id"]: k for x in d.values() for k in x["kilder"]}
tekst = {kid: hent(kid, k["url"]) for kid, k in kilder.items()}
ntekst = {kid: norm(t) for kid, t in tekst.items()}
dato = {kid: (re.search(r"Opdateret:?\s*(\d{2}\.\d{2}\.\d{4})", t) or [None, None])[1] for kid, t in tekst.items()}

def tal_med_ord(s):
    return set(re.findall(r"\b\d+(?:[.,]\d+)?(?:[–-]\d+(?:[.,]\d+)?)?\s+(?:[a-zæøå%]+)", s.lower()))

def fraser(s, n=3):
    w = norm(s).split()
    return {" ".join(w[i:i + n]) for i in range(len(w) - n + 1)}

ud = []
for r, x in d.items():
    for typ, lst in [("Rødt flag", "roedeFlag"), ("Diff.diagnose", "differentialdiagnoser"), ("Behandling", "behandling"), ("Henvisning", "henvisning")]:
        for p in x[lst]:
            dele = {"tekst": p.get("tekst") or " ".join(filter(None, [p.get("navn"), *p.get("kendetegn", []), p.get("til"), p.get("kriterier")]))}
            if p.get("handling"): dele["handling"] = p["handling"]
            ks = [k for k in p["kilder"] if k in ntekst]
            row = dict(region=r, typ=typ, id=p["id"], status=p["status"], kilder=p["kilder"])
            alt = " ".join(dele.values())
            row["tal_ikke_fundet"] = sorted(t for t in tal_med_ord(alt) if not any(norm(t) in ntekst[k] for k in ks))
            row["tlf_ikke_fundet"] = [t for t in re.findall(r"\b\d{2} ?\d{2} ?\d{2} ?\d{2}\b", alt) if not any(t.replace(" ", "") in ntekst[k].replace(" ", "") for k in ks)]
            for navn, s in dele.items():
                f = fraser(s)
                row[f"frase_{navn}"] = round(max((sum(x in ntekst[k] for x in f) / len(f) for k in ks), default=0), 2) if f else None
            row["kildedatoer"] = {k: dato.get(k) for k in p["kilder"]}
            row["aar_afviger"] = [k for k in p["kilder"] if dato.get(k) and int(dato[k][-4:]) != kilder[k]["aar"]]
            ud.append(row)
json.dump(ud, sys.stdout, ensure_ascii=False, indent=1)
