# Cortex Lommekort

Én statisk side: find et konsultationskort, udfyld journalen med tastaturet, kopiér notatet ind i journalsystemet.

- **Ingen server, ingen login, ingen AI.** Intet gemmes – felterne lever kun i fanen og ryddes ved kortskift / "Ny patient".
- **Tomt = ikke vurderet.** Urørte felter kommer aldrig med som normalt – de kommer slet ikke med, men vises som tjekliste før kopiering.
- **Kilden er Obsidian.** Kortene redigeres kun i `~/Obsidian/Knowledge/01 Almen Praksis/Konsultationskort/`. Siden genbygges fra dem.

## Brug
1. Åbn `dist/index.html` i en browser (dobbeltklik).
2. `/` søg → `↵` åbn → `Tab` gennem felterne → `Ctrl+↵` kopiér notat → indsæt i journalen.
3. Røde flag: klik/mellemrum skifter tom → nej → JA (`n`/`j` på tastaturet).
4. `.` i et tomt felt = "u.a." · `Alt+I` indsætter sikkerhedsnet (journaltekst) i P · `Ctrl+⇧+↵` kopierer patientteksten · `Alt+N` ny patient.
5. Kun udfyldte felter og afklarede røde flag kommer med i notatet. Resten vises som tjekliste over kopiknappen.

## Genbyg efter ændringer i kortene
```bash
cd ~/dev/Cortex/lommekort
python3 build.py            # læser Obsidian-mappen, skriver dist/index.html
```
Kun Python 3 (standardbibliotek) kræves.

## Kortformat (det build.py læser)
- Frontmatter: `id`, `status`, `kontrolleret`
- Afsnit `## 0.`–`## 5.` vises som kort; `## 5.` skal indeholde sikkerhedsnettet som `> "citat"`
- `## 5.` kan have en `**Journal:** …`-linje (dokumentationsversion af sikkerhedsnettet).
- Frontmatter `links: Label|url; Label|url` giver klikbare kilder; `afventer:` viser et godkendelsesbanner.
- `## 6. Journal`: `**Røde flag:** a; b; c` giver tjekliste. Linjer `**S:** … [ ] …`. Hvert `[ ]` bliver et felt; `[a/b]` giver forslag; teksten før feltet bliver etiket.

## Status
Version 1 (2026-10-02). Hostet privat som claude.ai-artifact ("Lommekort") – opdateres ved at publicere `dist/artifact.html` igen fra samme Cowork-samtale eller med artifactets URL. `dist/index.html` virker også direkte fra disk.
