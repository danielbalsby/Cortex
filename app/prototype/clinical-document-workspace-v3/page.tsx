import type { Metadata } from "next";

import { ClinicalDocumentWorkspaceV3 } from "@/components/prototype/clinical-document-workspace-v3/ClinicalDocumentWorkspaceV3";

export const metadata: Metadata = {
  title: "Clinical Document Workspace — Learning Prototype v3 · Cortex",
  description:
    "Isoleret learning-prototype: roligt, lineært, hurtigt klinisk flow fra tom start til kopieret PSOAP-notat."
};

export default function ClinicalDocumentWorkspaceV3Page() {
  return <ClinicalDocumentWorkspaceV3 />;
}
