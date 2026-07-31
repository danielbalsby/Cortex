import type { Metadata } from "next";

import { ClinicalDocumentWorkspaceV2 } from "@/components/prototype/clinical-document-workspace-v2/ClinicalDocumentWorkspaceV2";

export const metadata: Metadata = {
  title: "Clinical Document Workspace UX Experiment v2 · Cortex",
  description:
    "Isoleret UX-eksperiment: narrative-first klinisk dokument, aktivt Cortex-overblik og Quick keyboard-flow."
};

export default function ClinicalDocumentWorkspaceV2Page() {
  return <ClinicalDocumentWorkspaceV2 />;
}
