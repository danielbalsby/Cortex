# Cortex Lommekort

Én statisk side: find et konsultationskort, udfyld journalen med tastaturet, kopiér notatet ind i journalsystemet.

- **Ingen server, ingen login, ingen AI.** Intet gemmes – felterne lever kun i fanen og ryddes ved kortskift / "Ny patient".
- **Tomt = ikke vurderet.** Urørte felter kommer ud som `Ikke vurderet: …` – aldrig som normalt.
- **Kilden er Obsidian.** Kortene redigeres kun i `~/Obsidian/Knowledge/01 Almen Praksis/Konsultationskort/`. Siden genbygges fra dem.

## Brug
1. Åbn `dist/index.html` i en browser (dobbeltklik).
2. `/` søg → `↵` åbn → `Tab` gennem felterne → `Ctrl+↵` kopiér notat → indsæt i journalen.
3. `Alt+S` indsætter kortets sikkerhedsnet i P · `Ctrl+⇧+↵` kopierer sikkerhedsnettet alene · `Alt+N` ny patient.

## Genbyg efter ændringer i kortene
```bash
cd ~/dev/Cortex/lommekort
python3 build.py            # læser Obsidian-mappen, skriver dist/index.html
```
Kun Python 3 (standardbibliotek) kræves.

## Kortformat (det build.py læser)
- Frontmatter: `id`, `status`, `kontrolleret`
- Afsnit `## 0.`–`## 5.` vises som kort; `## 5.` skal indeholde sikkerhedsnettet som `> "citat"`
- `## 6. Journal`: linjer `**S:** … [ ] …`. Hvert `[ ]` bliver et felt; `[a/b]` giver forslag; teksten før feltet bliver etiket.

## Status
Version 1 (2026-10-02). Ikke hostet endnu – se `09_CORTEX-LOMMEKORT-PRODUCT-PROPOSAL` i Cortex-projektet.
