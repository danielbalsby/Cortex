# knae-3-septisk

**Akut varmt, rødt knæ med feber (scenarie C)** (rødt flag)

## Input

- side = hoejre
- debut = akut
- varighed = dage
- traume = nej
- feber = ja
- haevelse = moderat
- roedme = ja
- varme = ja
- bevaegelighed = let

Afkrydset (V/P): diff-bakteriel-artrit, hen-septisk

## Notat

```
S: Højresidige knæsmerter. Akut debut. Varighed få dage. Intet traume. Feber.
O: Moderat hævelse. Rødme. Varmeøgning. Let nedsat bevægelighed.
V: Bakteriel artrit mistænkes.
P: Henvist akut til CVI mhp. septisk artrit.
```

## Røde flag (10, alle vises altid)

- [MATCHER] Bakteriel artrit (flag-bakteriel-artrit, GODKENDT)
- [MATCHER] Bursit med stærke smerter, varme, rødme, kraftig hævelse og feber indi (flag-septisk-bursit, GODKENDT)
- [ikke vurderet] Akut knæskade (flag-fraktur, GODKENDT)
- [ikke opfyldt af registreret] Aflåst knæ (flag-aflaast-knae, GODKENDT)
- [ikke opfyldt af registreret] Akut ligamentskade eller stor ledansamling (flag-akut-ligamentskade, GODKENDT)
- [ikke vurderet] Strækkeapparat (flag-straekkeapparat, GODKENDT)
- [(ingen betingelse)] Akut patellaluksation (flag-patellaluksation, GODKENDT)
- [(ingen betingelse)] Store og akutte knæskader (flag-stor-akut-skade, GODKENDT)
- [(ingen betingelse)] Akut indsættende hævelse og evt. rødme i øvre læg kan være en bristet  (flag-laeg-haevelse, GODKENDT)
- [ikke vurderet] Barn med knæsmerter – diagnostiske faldgruber (flag-boern, GODKENDT)

## Differentialdiagnoser (14, statisk liste)

- Gonartrose (diff-artrose)
- Meniskskade / meniskdegeneration (diff-menisk)
- Forreste korsbåndsskade (diff-acl)
- Skade på mediale kollaterale ligament (diff-mcl)
- Patellofemoralt smertesyndrom (diff-patellofemoralt)
- Patellaluksation (akut eller recidiverende) (diff-patellaluksation)
- Tendinopati / overbelastning (diff-tendinopati)
- Knæbursit (præpatellar / infrapatellar) (diff-bursit)
- Bakers cyste (diff-baker)
- [V] Bakteriel artrit (diff-bakteriel-artrit)
- Artrit (krystalartrit, reaktiv, reumatisk) (diff-artrit)
- Henført smerte fra hofte eller ryg (diff-henfoert)
- Osteochondritis dissecans (diff-ocd)
- Osgood-Schlatter / Sinding-Larsen (diff-apofysit)

## Henvisning (12, statisk liste)

- [P] Akut indlæggelse (ortopædkirurgi via CVI) · akut (hen-septisk)
- CVI, akut · akut (hen-akut-traume)
- Akut røntgen af knæ · akut (hen-akut-roentgen)
- CVI, subakut (snarest, < 1 uge) · subakut (hen-aflaast)
- CVI, elektiv · elektiv (hen-lettere-traume)
- CVI eller praktiserende ortopædkirurg, elektiv · elektiv (hen-non-traumatisk)
- Ortopædkirurgisk afdeling (knæartrose) · elektiv (hen-artrose)
- Ortopædkirurgisk vurdering (menisk) · elektiv (hen-menisk)
- Ortopædkirurgisk vurdering (kronisk instabilitet) · elektiv (hen-ligament-kronisk)
- Ortopædkirurgisk vurdering · elektiv (hen-patellaluksation-recidiv)
- Ortopædkirurgi · subakut (hen-bursit)
- Reumatologisk hotline / reumatolog · subakut (hen-reumatolog)
