# Clinical Document Workspace — Learning Prototype v3

Isoleret learning-prototype-spor. **Ikke** production Cortex.

## Route

`/prototype/clinical-document-workspace-v3`

## Mål

Roligt, lineært og hurtigt klinisk flow — tom start til kopieret PSOAP-notat på ≤90 sekunder
(helst 75). Kliniker registrerer facts; Cortex organiserer og projekterer. Ingen skjulte
defaults, ingen automatisk diagnose eller behandlingsbeslutning.

## Hvad er nyt i v3?

1. Intet top-level PSOAP-stepbjælke — kun et diskret "Aktivt: …"-indikator i selve arbejdsfladen.
2. Problem-først søgefelt med problemprofiler (styrer kun visning/flow, aldrig kliniske facts).
3. Anamnese → **Subjektivt**, alle korte grupper lineært, auto-advance til næste relevante felt.
4. Ingen valg for "ikke vurderet"/"ikke undersøgt" — uvalgt er ikke dokumenteret og bliver aldrig en fact.
5. Korte valg (≤3–4 muligheder) vises direkte og kan klikkes af igen (toggle-off).
6. Én negativ-bundle ("Ingen aflåsning, instabilitet, hvile- eller nattesmerter") + én rolig
   red-flags-gruppe (Feber / Almen påvirkning / Rødt-varmt-hævet knæ / Ingen red flags) med
   indbygget eksklusivitet.
7. Traume-detaljer vises kun ved Traume=Ja, visuelt underordnet og kompakt.
8. Objektivt uden underfaner: ROM som ét direkte klik ("Normal ROM 0–140°"), ekstension/fleksion
   kun ved "Afvigende ROM". Palpationsømhed samler tidligere palpationsfelter, inkl. "Ingen fokal ømhed".
9. Plan opdelt i Plan / Smertebehandling (Paracetamol p.n. / Kortvarig NSAID) / Opfølgning (én
   fast frase) / Safety-net.
10. Ét PSOAP-notat (P:/S:/O:/A:/P: på separate linjer) fra samme state i Quick og Standard. Kun
    én reviewbar/redigerbar flade — ingen dubleret editor. "Kopiér PSOAP"-knap kopierer med linjeskift.
11. Vurdering forbliver 100% klinikerejet — fri tekst + manuelle arbejdshypoteser. En statisk,
    tydeligt afgrænset "Klinisk opmærksomhed (prototype)"-boks er en ikke-besluttende placeholder;
    den reagerer ikke på facts og indeholder ingen kliniske regler.
12. Facts / afledte grupperinger (negativ-bundle, red flags) / klinikerens vurdering forbliver
    tydeligt adskilte i state og UI.

## Hvad er genbrugt?

- Mønstret fra `clinical-document-workspace` (baseline prototype): fill-only-untouched grouped
  confirmation, positive-override, toggle-to-clear single-choice chips.
- PSOAP-linjekonventionen (`P:`/`S:`/`O:`/`A:`/`P:`) fra produktionens `engine/output-engine.ts`
  / knæ-pathway — genskabt selvstændigt, **ikke** importeret fra `engine/`.

## Hvad er ikke ændret?

- Production Encounter Engine (`/`), Workflow Engine, `clinical/pathways/knee-pain.ts`,
  `clinical/types/index.ts`, governance-dokumenter, persistence.
- Baseline `/prototype/clinical-document-workspace` og v2 `/prototype/clinical-document-workspace-v2`.

## Kendte begrænsninger

- Ingen klinisk validering af indhold, ordlyd eller fuldstændighed.
- ROM/ekstension/fleksion er forenklede tre-værdis felter, ikke gradtal.
- Auto-advance dækker de klart afsluttede enkeltvalgs-grupper (Side, Debut, Traume, Funktion,
  Hævelse, Gang, ROM, ekstension/fleksion, Palpationsømhed); multi-select grupper har ingen
  "afsluttet"-signal og auto-advancer derfor ikke selv.
- Ingen persistence — state nulstilles ved reload.
