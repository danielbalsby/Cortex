import { EncounterEngine } from "@/components/encounter/EncounterEngine";
import { kneePainPathway } from "@/clinical/pathways/knee-pain";

export default function Home() {
  return (
    <main className="coreShell">
      <header className="coreTopbar">
        <div className="brand"><div className="brandMark">C</div><div><strong>Cortex Encounter</strong><span>Document once · Use everywhere · v0.2</span></div></div>
        <div className="coreStatus">Offline · Lokal testversion</div>
      </header>
      <EncounterEngine pathway={kneePainPathway} />
    </main>
  );
}
