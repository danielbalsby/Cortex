import type { Metadata } from "next";

import { DocumentFirstWorkspaceExperiment } from "@/components/prototype/clinical-document-workspace-document-first/DocumentFirstWorkspaceExperiment";

export const metadata: Metadata = {
  title: "Document-first Clinical Workspace Experiment · Cortex",
  description:
    "Isoleret UX-eksperiment for en dokument-first klinisk arbejdsflade med syntetiske data."
};

export default function DocumentFirstWorkspaceExperimentPage() {
  return <DocumentFirstWorkspaceExperiment />;
}
