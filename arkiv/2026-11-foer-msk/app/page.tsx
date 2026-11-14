"use client";

import { EncounterEngine } from "@/components/encounter/EncounterEngine";
import { kneePainPathway } from "@/clinical/pathways/knee-pain";
import { cortexOutputGeneratorRegistry } from "@/clinical/output-generator-registry";

export default function Home() {
  return (
    <main className="coreShell">
      <header className="coreTopbar">
        <div className="brand"><div className="brandMark">C</div><div><strong>Cortex Encounter</strong><span>Document once · Use everywhere · v0.2</span></div></div>
        <div className="coreStatus">Offline · Lokal testversion</div>
      </header>
      <EncounterEngine
        pathway={kneePainPathway}
        outputGeneratorRegistry={cortexOutputGeneratorRegistry}
      />
    </main>
  );
}
